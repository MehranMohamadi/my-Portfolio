# Debounce و Throttle در جاوااسکریپت  
# Debounce vs Throttle in JavaScript

---

## مقدمه | Introduction

در اپلیکیشن‌های مدرن وب، مخصوصاً در پروژه‌های Vue و Nuxt، مدیریت صحیح eventها نقش مستقیمی در **Performance** و تجربه کاربری دارد.  
اسکرول، resize، input و mousemove می‌توانند در هر ثانیه ده‌ها یا حتی صدها بار اجرا شوند.

اگر این eventها مستقیماً به API call، عملیات سنگین یا re-render منتهی شوند، نتیجه چیزی جز افت عملکرد و مصرف غیرضروری منابع نیست.

اینجاست که دو تکنیک مهم وارد می‌شوند:

- **Debounce**
- **Throttle**

---

In modern web applications — especially in Vue and Nuxt projects — proper event management directly impacts **performance** and user experience.  

Events like scroll, resize, input, and mousemove can fire dozens or even hundreds of times per second.  

If these events trigger API calls, heavy computations, or re-renders directly, performance degradation is inevitable.  

This is where two essential techniques come into play:

- **Debounce**
- **Throttle**

---

# Debounce چیست؟ | What is Debounce?

## تعریف مفهومی | Concept

**Debounce تضمین می‌کند که یک تابع تنها زمانی اجرا شود که مدتی از آخرین بار فراخوانی گذشته باشد.**  

به بیان ساده:  
تا وقتی event در حال تکرار است، اجرا نکن. وقتی متوقف شد، یک‌بار اجرا کن.

---

**Debounce ensures that a function executes only after a certain period has passed since the last invocation.**  

Simply put:  
Don’t run while events keep firing. Execute once after they stop.

---

## پیاده‌سازی ساده | Basic Implementation

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

---

## مثال واقعی پروژه | Real Project Example (Search in Nuxt)

```js
const search = debounce(async (query) => {
  const { data } = await $fetch('/api/search', {
    query: { q: query }
  });
  results.value = data;
}, 400);
```

### چرا Debounce اینجا منطقی است؟ | Why Debounce Makes Sense Here?

- کاربر پشت سر هم تایپ می‌کند / Users type continuously  
- فقط نتیجه نهایی مهم است / Only the final value matters  
- API call هزینه دارد / API calls are costly  
- UX تمیزتر می‌شود / Cleaner UX  

---

# Throttle چیست؟ | What is Throttle?

## تعریف مفهومی | Concept

**Throttle تضمین می‌کند که یک تابع حداکثر هر X میلی‌ثانیه یک‌بار اجرا شود.**  

به بیان ساده:  
مهم نیست چند بار event رخ دهد؛ فقط هر n میلی‌ثانیه یک بار اجرا می‌شود.

---

**Throttle ensures a function runs at most once every X milliseconds.**  

Simply put:  
No matter how often the event fires, execution is rate-limited.

---

## پیاده‌سازی ساده | Basic Implementation

```js
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
```

---

## مثال واقعی پروژه | Real Project Example (Scroll Listener)

```js
const handleScroll = throttle(() => {
  isSticky.value = window.scrollY > 100;
}, 200);

window.addEventListener('scroll', handleScroll);
```

### چرا Throttle اینجا مناسب است؟ | Why Throttle is Appropriate Here?

- Scroll بسیار پرتکرار است / Scroll fires frequently  
- نیازی به بررسی هر pixel نیست / No need to process every pixel  
- کاهش فشار روی main thread / Reduces main thread pressure  

---

# مقایسه Debounce و Throttle | Debounce vs Throttle Comparison

| ویژگی / Feature         | Debounce                          | Throttle                        |
|-------------------------|-----------------------------------|--------------------------------|
| زمان اجرا / Timing       | بعد از توقف event / After stop   | در بازه‌های ثابت / Fixed intervals |
| مناسب برای / Best for   | Search, Autocomplete             | Scroll, Resize                 |
| تمرکز / Focus            | نتیجه نهایی / Final result       | محدود کردن نرخ اجرا / Rate limiting |

---

# تحلیل معماری | Architectural Perspective

Debounce مبتنی بر **Idle Detection** است.  
Throttle مبتنی بر **Rate Limiting** است.

- Debounce مناسب تعامل‌های intent-driven است / Debounce fits intent-driven interactions  
- Throttle مناسب eventهای continuous است / Throttle fits continuous events  

---

# Best Practices

### 1. استفاده از Lodash در پروژه‌های بزرگ | Use Lodash in Production

```js
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
```

### 2. Cleanup را فراموش نکنید (Vue/Nuxt) | Always Cleanup in Vue/Nuxt

```js
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
```

### 3. مراقب SSR در Nuxt باشید | Be Careful with SSR in Nuxt

Eventهای window فقط در **client** وجود دارند.

---

# اشتباهات رایج | Common Mistakes

- ❌ استفاده از Debounce برای Scroll → باعث lag می‌شود  
- ❌ استفاده از Throttle برای Search → نتایج ناقص و UX ضعیف  
- ❌ فراموش کردن cancel → باید در تغییر route cancel شود

```js
const debounced = debounce(fn, 300);
debounced.cancel();
```

---

# جمع‌بندی | Conclusion

Debounce و Throttle ابزارهایی برای کنترل فشار روی سیستم هستند، نه فقط utility ساده.

- Debounce → زمانی که نتیجه نهایی مهم است / When the final result matters  
- Throttle → زمانی که کنترل نرخ اجرا مهم است / When execution rate control matters  

استفاده درست از این دو تکنیک مستقیماً روی **Performance، Core Web Vitals و UX** اثر می‌گذارد.

---

# Call To Action

اگر به Performance، معماری Frontend و AI Integration علاقه‌مند هستید، سایر مقالات وبلاگ را مطالعه کنید و این مطلب را با تیم خود به اشتراک بگذارید.  

If you’re interested in frontend performance, architecture, and AI integration, explore other articles on the blog and share this post with your team.