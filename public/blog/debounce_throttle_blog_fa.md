
# Debounce و Throttle در جاوااسکریپت

---

## مقدمه

در اپلیکیشن‌های مدرن وب، مخصوصاً در پروژه‌های Vue و Nuxt، مدیریت صحیح eventها نقش مستقیمی در **Performance** و تجربه کاربری دارد.  
اسکرول، resize، input و mousemove می‌توانند در هر ثانیه ده‌ها یا حتی صدها بار اجرا شوند.

اگر این eventها مستقیماً به API call، عملیات سنگین یا re-render منتهی شوند، نتیجه چیزی جز افت عملکرد و مصرف غیرضروری منابع نیست.

اینجاست که دو تکنیک مهم وارد می‌شوند:

- **Debounce**
- **Throttle**

---

## Debounce چیست؟

### تعریف مفهومی

**Debounce تضمین می‌کند که یک تابع تنها زمانی اجرا شود که مدتی از آخرین بار فراخوانی گذشته باشد.**

به بیان ساده:  
تا وقتی event در حال تکرار است، اجرا نکن. وقتی متوقف شد، یک‌بار اجرا کن.

### پیاده‌سازی ساده

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };  
}
</code></pre>
</div>

### مثال واقعی پروژه (Search در Nuxt)

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
const search = debounce(async (query) => {
  const { data } = await $fetch('/api/search', {
    query: { q: query }
  });
  results.value = data;
}, 400);
</code></pre>
</div>

### چرا Debounce اینجا منطقی است؟

- کاربر پشت سر هم تایپ می‌کند  
- فقط نتیجه نهایی مهم است  
- API call هزینه دارد  
- UX تمیزتر می‌شود  

---

## Throttle چیست؟

### تعریف مفهومی

**Throttle تضمین می‌کند که یک تابع حداکثر هر X میلی‌ثانیه یک‌بار اجرا شود.**

به بیان ساده:  
مهم نیست چند بار event رخ دهد؛ فقط هر n میلی‌ثانیه یک بار اجرا می‌شود.

### پیاده‌سازی ساده

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
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
</code></pre>
</div>

### مثال واقعی پروژه (Scroll Listener)

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
const handleScroll = throttle(() => {
  isSticky.value = window.scrollY > 100;
}, 200);

window.addEventListener('scroll', handleScroll);
</code></pre>
</div>

### چرا Throttle اینجا مناسب است؟

- Scroll بسیار پرتکرار است  
- نیازی به بررسی هر pixel نیست  
- کاهش فشار روی main thread  

---

## مقایسه Debounce و Throttle

| ویژگی | Debounce | Throttle |
|--------|-----------|------------|
| زمان اجرا | بعد از توقف event | در بازه‌های ثابت |
| مناسب برای | Search، Autocomplete | Scroll، Resize |
| تمرکز | نتیجه نهایی | محدود کردن نرخ اجرا |

---

## تحلیل معماری

Debounce مبتنی بر **Idle Detection** است.  
Throttle مبتنی بر **Rate Limiting** است.

- Debounce مناسب تعامل‌های intent-driven است  
- Throttle مناسب eventهای continuous است  

---

## Best Practices

### 1. استفاده از Lodash در پروژه‌های بزرگ

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
</code></pre>
</div>

### 2. Cleanup را فراموش نکنید (Vue/Nuxt)

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</code></pre>
</div>

### 3. مراقب SSR در Nuxt باشید

Eventهای window فقط در **client** وجود دارند.

---

## اشتباهات رایج

- ❌ استفاده از Debounce برای Scroll → باعث lag می‌شود  
- ❌ استفاده از Throttle برای Search → نتایج ناقص و UX ضعیف  
- ❌ فراموش کردن cancel → باید در تغییر route cancel شود  

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
const debounced = debounce(fn, 300);
debounced.cancel();
</code></pre>
</div>

---

## جمع‌بندی

Debounce و Throttle ابزارهایی برای کنترل فشار روی سیستم هستند، نه فقط utility ساده.

- **Debounce** → زمانی که نتیجه نهایی مهم است  
- **Throttle** → زمانی که کنترل نرخ اجرا مهم است  

استفاده درست از این دو تکنیک مستقیماً روی **Performance، Core Web Vitals و UX** اثر می‌گذارد.
