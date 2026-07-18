# راهنمای کامل nextTick در Vue.js: اجرای کد بعد از به‌روزرسانی DOM

## مقدمه

در Vue با تغییر یک `ref` یا مقدار reactive، داده همان لحظه تغییر می‌کند؛ اما DOM لزوماً همان لحظه بازنویسی نمی‌شود. Vue تغییرات هم‌زمان را در یک صف قرار می‌دهد و آن‌ها را به‌صورت گروهی پردازش می‌کند تا از رندرهای تکراری و پرهزینه جلوگیری شود.

این رفتار معمولاً همان چیزی است که می‌خواهیم، اما یک نتیجه مهم دارد: کدی که بلافاصله بعد از تغییر state اجرا می‌شود ممکن است هنوز DOM قبلی را ببیند. اگر بخواهیم عنصری را اندازه بگیریم، روی input تازه ساخته‌شده فوکوس کنیم یا بعد از اضافه‌شدن یک پیام اسکرول را جابه‌جا کنیم، باید منتظر پایان به‌روزرسانی DOM بمانیم.

اینجاست که `nextTick` به کار می‌آید.

---

## nextTick دقیقاً چیست؟

`nextTick` تابعی از Vue است که اجرای ادامه کد را تا پایان چرخه فعلی به‌روزرسانی DOM عقب می‌اندازد. این تابع را می‌توان با `await` یا callback استفاده کرد:

```ts
import { nextTick } from 'vue';

await nextTick();

// DOM مربوط به تغییرات reactive قبلی به‌روز شده است.
```

نکته مهم این است که `nextTick` منتظر «یک زمان دلخواه» نمی‌ماند؛ منتظر می‌ماند تا Vue تغییرات pending را flush کند. بنابراین ابزار هماهنگ‌شدن با scheduler خود Vue است، نه یک delay عمومی.

---

## چرخه به‌روزرسانی Vue چگونه کار می‌کند؟

فرض کنید شمارنده‌ای را چند بار پشت سر هم تغییر دهیم:

```ts
count.value++;
count.value++;
count.value++;
```

مقدار `count.value` بلافاصله سه واحد بیشتر می‌شود، اما Vue معمولاً کامپوننت را سه بار جداگانه رندر نمی‌کند. این تغییرات در یک batch جمع می‌شوند و DOM یک بار به‌روزرسانی می‌شود.

ترتیب ساده‌شده رخدادها چنین است:

1. state تغییر می‌کند.
2. Vue به‌روزرسانی کامپوننت را در صف قرار می‌دهد.
3. اجرای synchronous فعلی تمام می‌شود.
4. Vue صف به‌روزرسانی‌ها را پردازش و DOM را patch می‌کند.
5. Promise مربوط به `nextTick` resolve می‌شود و کد بعد از `await` ادامه پیدا می‌کند.

```ts
count.value++;

console.log(count.value); // مقدار جدید state
console.log(counterEl.value?.textContent); // ممکن است متن قدیمی DOM باشد

await nextTick();

console.log(counterEl.value?.textContent); // متن جدید DOM
```

پس تفاوت اصلی بین state و DOM است: برای خواندن مقدار جدید reactive نیازی به `nextTick` نداریم؛ برای کار با خروجی رندرشده ممکن است به آن نیاز داشته باشیم.

---

## چه زمانی باید از nextTick استفاده کنیم؟

استفاده از `nextTick` زمانی منطقی است که عملیات بعدی مستقیماً به DOM جدید وابسته باشد، برای مثال:

- فوکوس روی input یا دکمه‌ای که با `v-if` تازه ساخته شده است
- خواندن `clientHeight`، `scrollHeight` یا `getBoundingClientRect()` بعد از تغییر محتوا
- اسکرول‌کردن به آیتمی که همین حالا به لیست اضافه شده است
- آغاز animation بر اساس اندازه یا موقعیت جدید یک عنصر
- کار با کتابخانه‌ای که باید DOM رندرشده را دریافت کند
- تست‌کردن خروجی کامپوننت بعد از تغییر داده reactive

اگر فقط به مقدار جدید state نیاز دارید، `nextTick` اضافه است؛ چون state قبل از به‌روزرسانی DOM تغییر کرده است.

---

## مثال ۱: فوکوس روی input تازه نمایش‌داده‌شده

در این مثال، input تنها زمانی در DOM وجود دارد که `showInput` برابر `true` باشد:

```vue
<script setup lang="ts">
import { nextTick, ref } from 'vue';

const showInput = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const openAndFocus = async () => {
  showInput.value = true;
  await nextTick();
  inputRef.value?.focus();
};
</script>

<template>
  <button type="button" @click="openAndFocus">ویرایش نام</button>
  <input v-if="showInput" ref="inputRef" aria-label="نام" />
</template>
```

بلافاصله بعد از `showInput.value = true`، Vue هنوز فرصت نکرده input را ایجاد کند و ممکن است `inputRef.value` برابر `null` باشد. بعد از `await nextTick()`، template patch شده و ref در دسترس است.

---

## مثال ۲: اسکرول به انتهای لیست پیام‌ها

وقتی پیام جدیدی اضافه می‌شود، ارتفاع لیست تنها بعد از رندر آیتم جدید تغییر می‌کند:

```vue
<script setup lang="ts">
import { nextTick, ref } from 'vue';

const messages = ref<string[]>([]);
const listRef = ref<HTMLElement | null>(null);

const addMessage = async (text: string) => {
  messages.value.push(text);
  await nextTick();

  listRef.value?.scrollTo({
    top: listRef.value.scrollHeight,
    behavior: 'smooth',
  });
};
</script>

<template>
  <ul ref="listRef" class="messages">
    <li v-for="message in messages" :key="message">
      {{ message }}
    </li>
  </ul>
</template>
```

اگر `scrollHeight` را قبل از `nextTick` بخوانیم، احتمال دارد ارتفاع مربوط به لیست قبلی را دریافت کنیم و اسکرول کمی بالاتر از آخرین پیام متوقف شود.

---

## مثال ۳: اندازه‌گیری ارتفاع بعد از بازشدن پنل

برای animation یک accordion ممکن است به ارتفاع واقعی محتوای تازه رندرشده نیاز داشته باشیم:

```ts
import { nextTick, ref } from 'vue';

const isOpen = ref(false);
const panelRef = ref<HTMLElement | null>(null);
const panelHeight = ref(0);

const openPanel = async () => {
  isOpen.value = true;
  await nextTick();

  panelHeight.value = panelRef.value?.scrollHeight ?? 0;
};
```

در این سناریو `nextTick` تضمین می‌کند عنصر وجود دارد و محتوای جدید در محاسبه ارتفاع لحاظ شده است. البته اگر فونت، تصویر یا داده async هنوز در حال بارگذاری باشد، یک tick کافی نیست؛ باید منتظر رخداد مربوط مثل `load` نیز بمانیم.

---

## مثال ۴: چند تغییر state و تنها یک بار انتظار

لازم نیست بعد از هر تغییر reactive یک `nextTick` بنویسیم. ابتدا همه تغییرات مرتبط را انجام می‌دهیم و سپس یک بار منتظر رندر می‌مانیم:

```ts
const saveAndShowResult = async () => {
  isSaving.value = false;
  isModalOpen.value = false;
  notification.value = 'تغییرات ذخیره شد';

  await nextTick();
  notificationRef.value?.focus();
};
```

Vue این تغییرات را batch می‌کند و Promise پس از اعمال DOM حاصل از همه آن‌ها resolve می‌شود.

---

## دو روش استفاده از nextTick

### روش Promise و async/await

این روش معمولاً خواناتر است و مدیریت خطا و ترتیب عملیات را ساده‌تر می‌کند:

```ts
const updateLayout = async () => {
  expanded.value = true;
  await nextTick();
  measureLayout();
};
```

### روش callback

`nextTick` یک callback نیز می‌پذیرد:

```ts
expanded.value = true;

nextTick(() => {
  measureLayout();
});
```

هر دو روش هدف یکسانی دارند. در کدهای جدید، `await nextTick()` معمولاً جریان اجرا را واضح‌تر نشان می‌دهد.

---

## تفاوت nextTick با setTimeout

ممکن است این کد ظاهراً مشکل را حل کند:

```ts
setTimeout(() => {
  inputRef.value?.focus();
}, 0);
```

اما `setTimeout(..., 0)` callback را وارد صف taskهای مرورگر می‌کند و ارتباط مستقیمی با چرخه رندر Vue ندارد. این روش معمولاً دیرتر از مقدار لازم اجرا می‌شود، هدف کد را پنهان می‌کند و در تست‌ها نیز کنترل‌پذیری کمتری دارد.

در مقابل، `nextTick` به scheduler Vue متصل است و مشخصاً می‌گوید: «بعد از اعمال به‌روزرسانی‌های pending در DOM ادامه بده.» اگر مسئله شما منتظرماندن برای Vue است، `nextTick` انتخاب دقیق‌تری است. اگر واقعاً به تأخیر زمانی نیاز دارید، از timer استفاده کنید؛ این دو جایگزین یکدیگر نیستند.

---

## تفاوت nextTick با watch و watchEffect

این ابزارها کاربردهای متفاوتی دارند:

| ابزار | کاربرد اصلی |
| --- | --- |
| `nextTick` | ادامه یک عملیات مشخص بعد از flush شدن DOM |
| `watch` | واکنش به تغییر یک یا چند منبع reactive |
| `watchEffect` | اجرای خودکار effect بر اساس dependencyهای مصرف‌شده |
| lifecycle hooks | اجرای منطق در مرحله‌ای از عمر کامپوننت |

برای مثال اگر هر بار با تغییر `items` باید DOM را اندازه بگیریم، یک watcher با زمان‌بندی `post` می‌تواند شفاف‌تر از فراخوانی مکرر `nextTick` باشد:

```ts
watch(
  items,
  () => {
    measureList();
  },
  { flush: 'post' },
);
```

گزینه `flush: 'post'` باعث می‌شود callback بعد از به‌روزرسانی DOM کامپوننت اجرا شود. در مقابل، وقتی داخل یک handler عملیات مرحله‌به‌مرحله‌ای داریم—تغییر state، انتظار برای DOM، سپس فوکوس—`nextTick` معمولاً خواناتر است.

---

## آیا nextTick یعنی مرورگر صفحه را paint کرده است؟

خیر. resolve شدن `nextTick` یعنی Vue patch مربوط به DOM را انجام داده است؛ اما لزوماً به این معنا نیست که مرورگر پیکسل‌های جدید را روی صفحه paint کرده است.

اگر عملیات شما باید بعد از paint انجام شود، برای مثال برای اجرای دقیق یک animation یا مقایسه وضعیت بصری بین دو frame، می‌توانید بعد از `nextTick` از `requestAnimationFrame` استفاده کنید:

```ts
await nextTick();

await new Promise<void>((resolve) => {
  requestAnimationFrame(() => resolve());
});

// مرورگر فرصت ورود به frame بعدی را داشته است.
```

این تفاوت برای بیشتر سناریوهای فوکوس و اندازه‌گیری DOM مهم نیست، اما در animationهای حساس می‌تواند تعیین‌کننده باشد.

---

## nextTick در SSR و Nuxt

در SSR به DOM مرورگر دسترسی نداریم. بنابراین کدی که از `document`، `window` یا template ref استفاده می‌کند باید فقط در سمت client اجرا شود؛ مثلاً داخل `onMounted` یا با guard مناسب:

```ts
onMounted(async () => {
  ready.value = true;
  await nextTick();
  elementRef.value?.focus();
});
```

خود `nextTick` جایگزین `onMounted` نیست. اگر کامپوننت هنوز mount نشده باشد، منتظرماندن برای یک tick الزاماً یک DOM قابل استفاده ایجاد نمی‌کند. ابتدا باید در مرحله درست lifecycle باشیم و سپس در صورت ایجاد یک به‌روزرسانی جدید از `nextTick` استفاده کنیم.

---

## استفاده در تست کامپوننت‌ها

در تست‌ها نیز تغییر reactive و DOM ممکن است هم‌زمان قابل مشاهده نباشند. در Vue Test Utils، بعضی متدها مانند `trigger` و `setValue` یک Promise برمی‌گردانند و می‌توان مستقیماً آن‌ها را `await` کرد:

```ts
const wrapper = mount(Counter);

await wrapper.get('button').trigger('click');

expect(wrapper.get('[data-test="count"]').text()).toBe('1');
```

اگر state را خارج از این helperها تغییر می‌دهید، می‌توانید منتظر `nextTick` بمانید:

```ts
count.value++;
await nextTick();

expect(wrapper.text()).toContain('1');
```

برای Promiseهای مستقل مثل پاسخ API، `nextTick` کافی نیست؛ در آن شرایط باید خود Promise یا helper مناسب برای flush کردن Promiseها را await کنید.

---

## اشتباهات رایج

### استفاده بعد از هر تغییر state

اگر هیچ خواندن یا نوشتن وابسته به DOM ندارید، `nextTick` لازم نیست. مقدار reactive بلافاصله تغییر می‌کند.

### استفاده برای پنهان‌کردن طراحی ناپایدار

اضافه‌کردن چند `nextTick` پشت سر هم معمولاً نشانه این است که وابستگی بین کامپوننت‌ها، lifecycle یا جریان داده به‌خوبی مدل نشده است. اول علت race condition را پیدا کنید.

### فرض اینکه داده async آماده شده است

`nextTick` تنها صف رندر Vue را flush می‌کند و منتظر fetch، timer، بارگذاری تصویر یا transition CSS نمی‌ماند.

### استفاده به‌جای رویداد کامپوننت

اگر parent باید بداند child چه زمانی کاری را تمام کرده است، یک event یا Promise صریح معمولاً بهتر از حدس‌زدن زمان با `nextTick` است.

### دستکاری مستقیم DOM بدون نیاز

قبل از استفاده از template ref و DOM API بررسی کنید آیا همان نتیجه با binding، computed value، directive یا CSS قابل دستیابی است. رویکرد declarative معمولاً ساده‌تر و قابل نگهداری‌تر است.

---

## چک‌لیست تصمیم‌گیری

قبل از نوشتن `await nextTick()` این سؤال‌ها را بپرسید:

1. آیا به state جدید نیاز دارم یا به DOM جدید؟
2. آیا عملیات من وابسته به وجود، اندازه، موقعیت، فوکوس یا اسکرول یک عنصر است؟
3. آیا این کار فقط پس از یک action مشخص انجام می‌شود یا باید بعد از هر تغییر داده تکرار شود؟
4. آیا `watch` با `flush: 'post'`، یک lifecycle hook یا event کامپوننت منظور را واضح‌تر بیان می‌کند؟
5. آیا منتظر Vue هستم یا در واقع باید منتظر API، تصویر، transition یا frame بعدی مرورگر بمانم؟

اگر پاسخ دو سؤال اول «DOM جدید» و «بله» باشد، `nextTick` احتمالاً ابزار مناسبی است.

---

## جمع‌بندی

`nextTick` یک ابزار کوچک اما مهم برای هماهنگی با چرخه رندر Vue است. با تغییر state، داده بلافاصله به‌روز می‌شود ولی Vue برای کارایی بهتر patch کردن DOM را batch می‌کند. `await nextTick()` به ما اجازه می‌دهد پس از پایان همین patch با DOM جدید کار کنیم.

قاعده ساده این است:

- برای خواندن state جدید، معمولاً به `nextTick` نیاز ندارید.
- برای فوکوس، اسکرول، اندازه‌گیری یا integration وابسته به DOM جدید، از `nextTick` استفاده کنید.
- برای واکنش دائمی به داده، `watch` یا `watchEffect` را بررسی کنید.
- برای API، تصویر، animation و paint مرورگر، منتظر سیگنال واقعی همان عملیات بمانید.

وقتی هدف دقیق آن را بدانیم، `nextTick` کد را قابل پیش‌بینی‌تر می‌کند؛ اما استفاده بیش از حد از آن می‌تواند نشانه‌ای از پیچیدگی غیرضروری در معماری کامپوننت باشد.
