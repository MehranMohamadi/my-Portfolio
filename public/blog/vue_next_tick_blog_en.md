# Vue.js nextTick: Run Code After DOM Updates

## Introduction
In Vue, state changes are not always reflected in the DOM immediately. Vue batches updates and applies them in the next render cycle for better performance.  
That means code that runs right after a state change may still read the old DOM.

This is exactly what `nextTick` solves.

---

## What is nextTick?

`nextTick` defers a callback (or Promise continuation) until Vue finishes updating the DOM.

In short:  
Vue updates the DOM first, then your `nextTick` code runs.

```ts
import { nextTick } from 'vue';
```

---

## When should you use it?

- You need to measure an element after reactive data changes
- You want to focus an input that was just rendered
- You need to control scroll/animation based on updated DOM

---

## Example 1: Focus an input after it appears

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

Without `await nextTick()`, `inputRef` can still be `null`.

---

## Example 2: Auto-scroll a list after adding an item

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

## Common usage styles

1. `await nextTick()` inside async methods
2. `nextTick(() => { ... })` in callback style

```ts
nextTick(() => {
  // DOM is updated here
});
```

---

## Common mistakes

- Using `nextTick` for every UI issue
- Expecting synchronous DOM updates from reactive state
- Ignoring better alternatives like `watch`/`watchEffect` when appropriate

---

## Architectural note

`nextTick` is a low-level synchronization utility with Vue's render lifecycle, not a general business-logic tool.  
If you need it everywhere, your component structure may need refactoring.

---

## Conclusion

Use `nextTick` when you need the **updated DOM**, not just updated state.

- DOM measurement, focus, and scroll logic: great use case
- Data flow logic: usually better solved with reactive patterns first

