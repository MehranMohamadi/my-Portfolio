# Event Loop در JavaScript: مغز زمان‌بندی اجرای کد

## مقدمه
جاوااسکریپت به‌صورت single-thread اجرا می‌شود؛ یعنی در لحظه فقط یک کار روی call stack اجرا می‌شود. با این حال، می‌تواند کارهای async زیادی را هم‌زمان مدیریت کند. راز این موضوع در `Event Loop` است.

---

## مدل ذهنی ساده Event Loop

برای فهم دقیق‌تر، این ۴ بخش را به خاطر بسپار:

1. `Call Stack`: محل اجرای کدهای synchronous
2. `Web APIs` (یا Node APIs): جایی که کارهای async مثل timer و network انجام می‌شوند
3. `Task Queue` (Macrotask Queue): صف callbackهایی مثل `setTimeout`
4. `Microtask Queue`: صف callbackهای `Promise.then`, `queueMicrotask`, `MutationObserver`

Event Loop همیشه بررسی می‌کند:

- اگر call stack خالی باشد، اول microtaskها را کامل اجرا می‌کند
- بعد یک macrotask از task queue برمی‌دارد
- این چرخه تکرار می‌شود

---

## ترتیب اجرای Promise و setTimeout

```js
console.log('A');

setTimeout(() => {
  console.log('B - timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('C - promise');
});

console.log('D');
```

خروجی:

```txt
A
D
C - promise
B - timeout
```

چرا؟ چون microtaskها (`Promise`) قبل از macrotaskها (`setTimeout`) اجرا می‌شوند.

---

## مثال واقعی: جلوگیری از بلاک شدن UI

```js
function heavyWork(items) {
  let i = 0;

  function chunk() {
    const end = Math.min(i + 1000, items.length);

    for (; i < end; i++) {
      // heavy sync operation
    }

    if (i < items.length) {
      setTimeout(chunk, 0);
    }
  }

  chunk();
}
```

اینجا کار سنگین را chunk می‌کنیم تا Event Loop فرصت render و پاسخ به تعامل کاربر را داشته باشد.

---

## Microtask starvation چیست؟

اگر به‌صورت بی‌رویه microtask بسازیم، macrotaskها و حتی render عقب می‌افتند.

```js
function loop() {
  queueMicrotask(loop);
}

loop();
```

این الگو می‌تواند عملاً UI را قفل کند، چون microtask queue هیچ‌وقت خالی نمی‌شود.

---

## Event Loop در مرورگر و Node.js

اصل مدل یکی است، اما جزئیات فازها در Node.js فرق دارد (timers, poll, check, ...).  
اگر fullstack هستی، دانستن تفاوت‌ها کمک می‌کند باگ‌های async را سریع‌تر پیدا کنی.

---

## بهترین شیوه‌ها

- برای deferred سبک، `queueMicrotask` یا `Promise.then` استفاده کن
- برای شکستن کار سنگین و دادن فرصت به UI، از `setTimeout` یا `requestIdleCallback` کمک بگیر
- از recursion بی‌پایان در microtaskها پرهیز کن
- profiling را با DevTools (Performance tab) انجام بده

---

## جمع‌بندی

`Event Loop` تعیین می‌کند کد async دقیقاً چه زمانی اجرا شود. اگر این مدل را خوب بفهمی:

- باگ‌های async را سریع‌تر دیباگ می‌کنی
- UI روان‌تر می‌سازی
- تصمیم بهتری بین microtask و macrotask می‌گیری

