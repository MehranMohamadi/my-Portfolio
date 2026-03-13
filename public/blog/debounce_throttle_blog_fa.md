# Debounce و Throttle در JavaScript

## مقدمه
در رابط‌های کاربری مدرن، رویدادهایی مثل `input`، `scroll` و `resize` می‌توانند در هر ثانیه ده‌ها بار اجرا شوند. اگر هر بار اجرای رویداد را مستقیم به API call یا محاسبات سنگین وصل کنیم، خیلی سریع با افت عملکرد، مصرف بی‌دلیل منابع و تجربه کاربری ضعیف مواجه می‌شویم.

دو تکنیک ساده اما خیلی مؤثر برای کنترل این وضعیت داریم:

- `Debounce`
- `Throttle`

---

## Debounce چیست؟

`Debounce` تضمین می‌کند تابع فقط وقتی اجرا شود که برای یک بازه زمانی مشخص، رویداد جدیدی رخ نداده باشد.

به زبان ساده: تا وقتی کاربر هنوز در حال تایپ است، اجرا نکن. وقتی متوقف شد، یک‌بار اجرا کن.

### پیاده‌سازی ساده

```js
function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### مثال واقعی: جست‌وجو

```js
const search = debounce(async (query) => {
  const { data } = await $fetch('/api/search', {
    query: { q: query },
  });

  results.value = data;
}, 400);
```

### چه زمانی Debounce انتخاب بهتری است؟

- وقتی نتیجه نهایی مهم‌تر از نتایج لحظه‌ای است
- وقتی هر اجرا هزینه‌بر است (مثل API call)
- وقتی می‌خواهیم UX نرم‌تر و تمیزتری داشته باشیم

---

## Throttle چیست؟

`Throttle` تضمین می‌کند یک تابع در بازه‌های زمانی ثابت، حداکثر یک‌بار اجرا شود.

به زبان ساده: مهم نیست رویداد چند بار تکرار شود، نرخ اجرا محدود می‌ماند.

### پیاده‌سازی ساده

```js
function throttle(fn, limit) {
  let inThrottle = false;

  return function (...args) {
    if (inThrottle) return;

    fn.apply(this, args);
    inThrottle = true;

    setTimeout(() => {
      inThrottle = false;
    }, limit);
  };
}
```

### مثال واقعی: اسکرول

```js
const handleScroll = throttle(() => {
  isSticky.value = window.scrollY > 100;
}, 200);

window.addEventListener('scroll', handleScroll);
```

### چه زمانی Throttle مناسب‌تر است؟

- وقتی رویداد به‌شدت پرتکرار و پیوسته است
- وقتی بررسی تک‌تک تغییرات ضروری نیست
- وقتی می‌خواهیم فشار روی `main thread` کم شود

---

## مقایسه سریع Debounce و Throttle

| معیار | Debounce | Throttle |
|---|---|---|
| زمان اجرا | بعد از توقف رویداد | در بازه‌های ثابت |
| مناسب برای | جست‌وجو، autocomplete | اسکرول، resize |
| هدف اصلی | دریافت نتیجه نهایی دقیق | کنترل نرخ اجرا |

---

## اشتباهات رایج

- استفاده از `debounce` برای اسکرول زنده (ممکن است حس lag بدهد)
- استفاده از `throttle` برای سرچ (نتایج ناقص یا دیر)
- فراموش کردن cleanup در unmount

```js
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
```

---

## نکات حرفه‌ای

1. در پروژه‌های بزرگ، از نسخه‌های battle-tested مثل `lodash/debounce` و `lodash/throttle` استفاده کن.
2. اگر رفتار دقیق‌تری می‌خواهی، گزینه‌های `leading` و `trailing` را مدیریت کن.
3. در Nuxt/Vue مراقب SSR باش؛ آبجکت `window` فقط در client موجود است.

---

## جمع‌بندی

`Debounce` و `Throttle` فقط utility نیستند؛ این‌ها ابزارهای مهمی برای مدیریت بار سیستم و بهبود تجربه کاربری هستند.

- `Debounce`: وقتی نتیجه نهایی مهم است
- `Throttle`: وقتی کنترل نرخ اجرا مهم است

استفاده درست از این دو تکنیک، مستقیماً روی **Performance**، **Core Web Vitals** و **UX** اثر می‌گذارد.
