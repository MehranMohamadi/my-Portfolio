'use client';

import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Bot, LoaderCircle, MessageCircle, RotateCcw, Send, Trash2, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

type MessageRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
};

const MAX_USER_MESSAGES = 10;
const MAX_STORED_MESSAGES = 20;
const COOLDOWN_MS = 2000;

function makeId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isStoredMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== 'object') return false;
  const message = value as Partial<ChatMessage>;
  return (
    typeof message.id === 'string' &&
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.length > 0 &&
    typeof message.timestamp === 'string' &&
    !Number.isNaN(Date.parse(message.timestamp))
  );
}

export function ChatWidget() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'fa' || locale === 'ar';
  const storageKey = `portfolio-chat:v1:${locale}`;
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [failedMessageId, setFailedMessageId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastSentAtRef = useRef(0);

  const welcomeMessage = useCallback(
    (): ChatMessage => ({
      id: makeId(),
      role: 'assistant',
      content: t('chatWelcome'),
      timestamp: new Date().toISOString(),
    }),
    [t]
  );

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      const parsed: unknown = stored ? JSON.parse(stored) : null;
      if (Array.isArray(parsed)) {
        const validMessages = parsed.filter(isStoredMessage).slice(-MAX_STORED_MESSAGES);
        setMessages(validMessages.length ? validMessages : [welcomeMessage()]);
      } else {
        setMessages([welcomeMessage()]);
      }
    } catch {
      setMessages([welcomeMessage()]);
    }
    setIsHydrated(true);
  }, [storageKey, welcomeMessage]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(messages.filter((message) => message.content).slice(-MAX_STORED_MESSAGES))
      );
    } catch {
      // The chat remains usable when storage is unavailable.
    }
  }, [isHydrated, messages, storageKey]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isOpen, isSending]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const timeFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }),
    [locale]
  );
  const userMessageCount = messages.filter((message) => message.role === 'user').length;
  const reachedLimit = userMessageCount >= MAX_USER_MESSAGES;
  const suggestions = [t('chatSuggestionSkills'), t('chatSuggestionProjects'), t('chatSuggestionContact')];

  const getErrorKey = (code?: string) => {
    if (code === 'not_configured') return 'chatErrorNotConfigured';
    if (code === 'rate_limited') return 'chatErrorRateLimited';
    if (code === 'request_blocked') return 'chatErrorBlocked';
    if (code === 'invalid_request') return 'chatErrorInvalid';
    return 'chatErrorUnavailable';
  };

  const requestReply = async (history: ChatMessage[], userMessageId: string) => {
    const assistantId = makeId();
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
    };

    setMessages([...history, assistantMessage].slice(-MAX_STORED_MESSAGES));
    setIsSending(true);
    setErrorKey(null);
    setFailedMessageId(null);
    lastSentAtRef.current = Date.now();
    const controller = new AbortController();
    abortRef.current = controller;
    let receivedText = false;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(getErrorKey(payload?.error));
      }

      if (!response.body) throw new Error('chatErrorUnavailable');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        if (!text) continue;
        receivedText = true;
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? { ...message, content: `${message.content}${text}` }
              : message
          )
        );
      }

      if (!receivedText) throw new Error('chatErrorUnavailable');
    } catch (error) {
      if (controller.signal.aborted) return;
      const nextErrorKey = error instanceof Error && error.message.startsWith('chatError')
        ? error.message
        : 'chatErrorUnavailable';
      setErrorKey(nextErrorKey);
      setFailedMessageId(userMessageId);
      if (!receivedText) {
        setMessages((current) => current.filter((message) => message.id !== assistantId));
      }
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setIsSending(false);
    }
  };

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isSending || reachedLimit) return;
    if (Date.now() - lastSentAtRef.current < COOLDOWN_MS) {
      setErrorKey('chatErrorCooldown');
      return;
    }

    const userMessage: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    const history = [...messages.filter((message) => message.content), userMessage].slice(-MAX_STORED_MESSAGES);
    setInput('');
    await requestReply(history, userMessage.id);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  };

  const retryLastMessage = () => {
    if (!failedMessageId || isSending) return;
    const failedIndex = messages.findIndex((message) => message.id === failedMessageId);
    if (failedIndex < 0) return;
    const history = messages.slice(0, failedIndex + 1).filter((message) => message.content);
    void requestReply(history, failedMessageId);
  };

  const clearConversation = () => {
    abortRef.current?.abort();
    setMessages([welcomeMessage()]);
    setInput('');
    setErrorKey(null);
    setFailedMessageId(null);
    setIsSending(false);
    lastSentAtRef.current = 0;
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  if (!isHydrated) return null;

  const positionClass = isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`fixed bottom-5 z-[60] ${positionClass}`}>
      {isOpen && (
        <section
          role="dialog"
          aria-modal="false"
          aria-label={t('chatTitle')}
          className="absolute bottom-[4.75rem] end-0 flex h-[min(520px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/95 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl dark:border-gray-700/70 dark:bg-gray-900/95 dark:shadow-black/40"
        >
          <header className="flex items-center gap-3 border-b border-gray-200/80 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-white dark:border-gray-700/80">
            <span className="relative flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/20">
              <Bot className="size-5" aria-hidden="true" />
              <span className="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-purple-600 bg-emerald-400" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-bold">{t('chatTitle')}</h2>
              <p className="text-xs text-blue-100">{t('chatStatus')}</p>
            </div>
            <button
              type="button"
              onClick={clearConversation}
              disabled={isSending}
              className="rounded-xl p-2 text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40"
              aria-label={t('chatClear')}
              title={t('chatClear')}
            >
              <Trash2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                launcherRef.current?.focus();
              }}
              className="rounded-xl p-2 text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={t('chatClose')}
            >
              <X className="size-5" />
            </button>
          </header>

          <div
            className="flex flex-1 flex-col gap-3 overflow-y-auto bg-gray-50/70 px-4 py-4 dark:bg-gray-950/40"
            aria-live="polite"
          >
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div key={message.id} className={`flex max-w-[86%] flex-col ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
                  <div
                    dir="auto"
                    className={isUser
                      ? 'rounded-2xl rounded-ee-md bg-gradient-to-br from-blue-600 to-purple-600 px-3.5 py-2.5 text-sm leading-6 text-white shadow-sm'
                      : 'rounded-2xl rounded-es-md border border-gray-200 bg-white px-3.5 py-2.5 text-sm leading-6 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'}
                  >
                    {message.content || (
                      <span className="flex items-center gap-1 py-1" aria-label={t('chatTyping')}>
                        <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-current" />
                      </span>
                    )}
                  </div>
                  <time className="mt-1 px-1 text-[10px] text-gray-500 dark:text-gray-400" dateTime={message.timestamp}>
                    {timeFormatter.format(new Date(message.timestamp))}
                  </time>
                </div>
              );
            })}

            {userMessageCount === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                    disabled={isSending}
                    className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs text-blue-700 transition hover:border-blue-400 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-200 dark:hover:border-blue-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {errorKey && (
              <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200">
                <p>{t(errorKey)}</p>
                {failedMessageId && (
                  <button
                    type="button"
                    onClick={retryLastMessage}
                    disabled={isSending}
                    className="mt-2 inline-flex items-center gap-1 font-semibold underline underline-offset-2 disabled:opacity-50"
                  >
                    <RotateCcw className="size-3" />
                    {t('chatRetry')}
                  </button>
                )}
              </div>
            )}

            {reachedLimit && (
              <p className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-100">
                {t('chatLimitReached')}
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-gray-50 p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, 500))}
                onKeyDown={handleInputKeyDown}
                disabled={isSending || reachedLimit}
                rows={1}
                maxLength={500}
                aria-label={t('chatInputLabel')}
                placeholder={reachedLimit ? t('chatLimitPlaceholder') : t('chatPlaceholder')}
                className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed dark:text-white dark:placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending || reachedLimit}
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-45 dark:ring-offset-gray-900"
                aria-label={t('chatSend')}
              >
                {isSending ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4 rtl:-scale-x-100" />}
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-gray-500 dark:text-gray-400">
              {t('chatDisclaimer')}
            </p>
          </form>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-600/30 transition hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
        aria-label={isOpen ? t('chatClose') : t('chatOpen')}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6 transition-transform group-hover:scale-110" />}
      </button>
    </div>
  );
}

