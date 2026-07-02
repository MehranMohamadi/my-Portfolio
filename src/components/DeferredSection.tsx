'use client';

import React from 'react';

type DeferredSectionProps = {
  id: string;
  minHeight: number;
  children: React.ReactNode;
};

export function DeferredSection({ id, minHeight, children }: DeferredSectionProps) {
  const [shouldRender, setShouldRender] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const element = ref.current;

    if (!element || shouldRender) {
      return;
    }

    const render = () => setShouldRender(true);

    if (!('IntersectionObserver' in window)) {
      render();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          render();
          observer.disconnect();
        }
      },
      {
        rootMargin: '700px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      ref={ref}
      id={id}
      style={{ minHeight: shouldRender ? undefined : minHeight }}
      aria-hidden={shouldRender ? undefined : true}
    >
      {shouldRender ? children : null}
    </div>
  );
}
