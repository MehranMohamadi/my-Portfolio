# Context و Scope در Vue: چرا `watch` باید داخل کانتکست Vue اجرا شود؟

## مقدمه
در Vue فقط این مهم نیست که کد از نظر TypeScript یا JavaScript درست باشد. بعضی APIها باید در **کانتکست اجرای Vue** صدا زده شوند؛ وگرنه یا اصلاً درست کار نمی‌کنند، یا lifecycle و cleanup آن‌ها از کنترل Vue خارج می‌شود.

یکی از رایج‌ترین مثال‌ها `watch` است.  
خیلی‌ها یک فایل `ts` جدا می‌سازند و سعی می‌کنند داخل آن مستقیم `watch()` بنویسند، اما مسئله اینجاست که `watch` فقط یک تابع عادی نیست؛ این API قرار است به سیستم reactive و lifecycle خود Vue وصل شود.

---

## اول فرق Scope و Context را در Vue روشن کنیم

در Vue این دو مفهوم نزدیک‌اند، اما یکی نیستند:

- `Scope` یعنی این تابع یا فایل به چه متغیرها و refهایی دسترسی دارد
- `Context` یعنی این کد در چه محیط اجرایی‌ای ران شده و آیا الان به instance/reactivity/lifecycle مربوط به Vue متصل هست یا نه

مثلاً اگر در `setup` باشی:

```ts
import { ref, watch } from 'vue';

export default {
  setup() {
    const count = ref(0);

    watch(count, (value) => {
      console.log(value);
    });

    return { count };
  },
};
```

اینجا هم `scope` درست است، چون به `count` دسترسی داریم؛ هم `context` درست است، چون کد داخل `setup` اجرا شده و Vue می‌تواند watcher را ثبت و در زمان مناسب cleanup کند.

---

## چرا `watch` را نباید هرجایی صدا بزنیم؟

این مثال را ببین:

```ts
// userWatcher.ts
import { watch } from 'vue';

watch(() => someValue.value, (value) => {
  console.log(value);
});
```

این کد از نظر syntax شاید مشکلی نداشته باشد، اما چند سؤال مهم ایجاد می‌کند:

- `someValue` از کجا آمده؟
- این watcher به کدام component instance وصل است؟
- چه زمانی باید stop شود؟
- اگر component unmount شد، cleanup این watcher را چه کسی انجام می‌دهد؟

اینجاست که می‌گوییم این کد خارج از **Vue context** اجرا شده است.

---

## منظور از "کانتکست Vue" دقیقاً چیست؟

وقتی می‌گوییم یک کد در context Vue اجرا شود، معمولاً منظور یکی از این حالت‌هاست:

1. داخل `setup()`
2. داخل `<script setup>`
3. داخل یک `composable` که خودش از `setup` صدا زده شده
4. داخل lifecycleها یا جریان reactiveای که به component فعلی متصل است

در این حالت Vue می‌فهمد این `watch` متعلق به کدام effect scope و کدام component است.

---

## مثال درست: ساختن تابع و اجرای آن در context Vue

اگر می‌خواهی watcher را در فایل `ts` نگه داری، بهترین راه این است که آن را داخل یک تابع یا composable تعریف کنی:

```ts
// useUserWatcher.ts
import { watch, type Ref } from 'vue';

export function useUserWatcher(userId: Ref<number | null>) {
  watch(userId, (value) => {
    console.log('user changed:', value);
  });
}
```

و بعد در component:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useUserWatcher } from './useUserWatcher';

const userId = ref<number | null>(1);

useUserWatcher(userId);
</script>
```

اینجا تابع داخل فایل `ts` تعریف شده، اما **اجرا** داخل context Vue انجام می‌شود، چون composable از داخل `<script setup>` صدا زده شده است.

---

## نکته‌ی مهم: تعریف بیرون، اجرا داخل

این تفاوت خیلی مهم است:

- تعریف کردن تابع در فایل `ts` مشکلی ندارد
- صدا زدن `watch` باید زمانی انجام شود که Vue یک context فعال داشته باشد

یعنی این خوب است:

```ts
export function usePriceWatcher(price: Ref<number>) {
  watch(price, (newPrice) => {
    console.log(newPrice);
  });
}
```

اما این الگو خوب نیست:

```ts
import { ref, watch } from 'vue';

const price = ref(0);

watch(price, (value) => {
  console.log(value);
});
```

چون watcher در سطح ماژول ساخته شده و دیگر به lifecycle یک component مشخص وصل نیست.

---

## اگر بخواهم از `watch` در یک utility ساده استفاده کنم چه؟

اگر فایل تو صرفاً یک utility عادی باشد، معمولاً جای `watch` آنجا نیست.  
در این حالت دو راه بهتر داری:

1. utility را pure نگه داری و فقط داده بگیرد و خروجی بدهد
2. اگر واقعاً منطق reactive لازم داری، utility را به composable تبدیل کنی

مثال بد:

```ts
// formatUser.ts
import { watch } from 'vue';
```

مثال خوب:

```ts
// useFormattedUser.ts
import { computed, type Ref } from 'vue';

export function useFormattedUser(name: Ref<string>) {
  const formattedName = computed(() => name.value.trim().toUpperCase());

  return { formattedName };
}
```

---

## `effectScope` چه کمکی می‌کند؟

گاهی در Vue می‌خواهی scopeهای reactive مستقل بسازی. برای این کار `effectScope` وجود دارد.  
اما حتی آن هم یک مفهوم مربوط به سیستم اجرای Vue است، نه یک utility عادی TypeScript.

پس اگر داری با `watch`, `watchEffect`, `computed`, lifecycle یا cleanup کار می‌کنی، احتمال زیاد باید منطق تو در composable یا `setup` باشد.

---

## از کجا بفهمم مشکلم از scope است یا context؟

- اگر ارور این است که متغیر یا ref پیدا نمی‌شود، مشکل بیشتر به `scope` ربط دارد
- اگر watcher اجرا می‌شود اما cleanup درست نیست یا به lifecycle وصل نیست، مشکل بیشتر `context` است
- اگر APIهای Composition را در فایل جدا نوشته‌ای و نمی‌دانی کجا باید صدا زده شوند، معمولاً باید آن را به composable تبدیل کنی

---

## بهترین شیوه‌ها

- `watch` و `watchEffect` را داخل `setup` یا composable صدا بزن
- فایل‌های `ts` عادی را با composable اشتباه نگیر
- اگر منطق reactive داری، نام تابع را با `use...` شروع کن تا نقش آن روشن باشد
- utilityهای pure را از منطق وابسته به Vue جدا نگه دار
- همیشه از خودت بپرس: "این کد فقط به داده نیاز دارد یا به lifecycle و reactivity خود Vue هم وابسته است؟"

---

## جمع‌بندی

در Vue، `scope` فقط بخشی از ماجراست.  
ممکن است به یک `ref` دسترسی داشته باشی، اما هنوز در context درست Vue نباشی.

برای همین اگر بخواهی از `watch` در یک فایل `ts` استفاده کنی، بهتر است آن را داخل یک تابع یا composable بنویسی و آن تابع را از داخل `setup` یا `<script setup>` صدا بزنی.  
به بیان ساده:

- نوشتن در فایل `ts` مجاز است
- اجرا باید در کانتکست Vue باشد

همین تفاوت کوچک، مرز بین یک utility ساده و یک composable واقعی است.
