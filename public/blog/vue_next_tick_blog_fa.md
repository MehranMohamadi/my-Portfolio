# nextTick در Vue.js: زمان‌بندی درست بعد از آپدیت DOM

## مقدمه
در Vue، تغییر state همیشه به‌صورت فوری روی DOM اعمال نمی‌شود. Vue برای بهینه‌سازی، تغییرات را batch می‌کند و در چرخه بعدی رندر اعمال می‌کند.  
برای همین گاهی کدی که بلافاصله بعد از تغییر state اجرا می‌شود، هنوز DOM جدید را نمی‌بیند.

اینجاست که `nextTick` وارد می‌شود.

---

## nextTick چیست؟

`nextTick` یک Promise یا callback را تا پایان آپدیت DOM فعلی به تأخیر می‌اندازد.

به زبان ساده:  
اول Vue DOM را آپدیت می‌کند، بعد کد داخل `nextTick` اجرا می‌شود.

```ts
import { nextTick } from 'vue';
```

---

## چرا به nextTick نیاز داریم؟

- وقتی بعد از تغییر داده، باید اندازه/موقعیت عنصر را بخوانیم
- وقتی می‌خواهیم روی یک input فوکوس کنیم که تازه render شده
- وقتی اسکرول یا animation را وابسته به DOM جدید مدیریت می‌کنیم

---

## مثال 1: فوکوس روی input تازه نمایش‌داده‌شده

```vue
<script setup lang="ts">
import { ref, nextTick } from 'vue';

const showInput = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const openAndFocus = async () => {
  showInput.value = true;
  await nextTick();
  inputRef.value?.focus();
};
</script>

<template>
  <button @click="openAndFocus">Open</button>
  <input v-if="showInput" ref="inputRef" />
</template>
```

بدون `await nextTick()` احتمال زیادی هست که `inputRef` هنوز `null` باشد.

---

## مثال 2: اسکرول به انتهای لیست بعد از اضافه‌شدن آیتم

```ts
import { ref, nextTick } from 'vue';

const messages = ref<string[]>([]);
const listRef = ref<HTMLElement | null>(null);

const addMessage = async (text: string) => {
  messages.value.push(text);
  await nextTick();

  if (listRef.value) {
    listRef.value.scrollTop = listRef.value.scrollHeight;
  }
};
```

---

## الگوهای رایج استفاده

1. `await nextTick()` داخل `setup` یا متدهای async
2. `nextTick(() => { ... })` وقتی callback style ترجیح می‌دهید

```ts
nextTick(() => {
  // DOM is updated here
});
```

---

## اشتباهات رایج

- استفاده بیش از حد از `nextTick` برای حل هر باگ UI  
- انتظار اجرای synchronous از تغییرات reactive  
- فراموش کردن اینکه بعضی مشکلات با `watch` یا `watchEffect` بهتر حل می‌شوند

---

## نکته معماری

`nextTick` یک ابزار low-level برای sync شدن با lifecycle رندر است، نه راه‌حل عمومی منطق بیزینس.  
اگر برای هر تغییر state به `nextTick` نیاز پیدا می‌کنید، معمولاً طراحی کامپوننت نیاز به بازبینی دارد.

---

## جمع‌بندی

`nextTick` زمانی مفید است که به **DOM آپدیت‌شده** نیاز دارید، نه صرفاً state جدید.

- وقتی با اندازه‌گیری DOM، فوکوس یا اسکرول سروکار دارید: `nextTick` عالی است
- وقتی منطق داده مهم است: اول به ساختار reactive و `watch` فکر کنید

