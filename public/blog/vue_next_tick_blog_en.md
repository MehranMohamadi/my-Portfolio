# A Complete Guide to nextTick in Vue.js

## Introduction

When you change a `ref` or reactive value in Vue, the state changes immediately, but the DOM is not necessarily patched at that exact moment. Vue queues related updates and processes them together to avoid unnecessary renders.

This optimization has an important consequence: code that runs immediately after a state change can still see the old DOM. If you need to measure an element, focus an input that has just appeared, or scroll after adding an item, you must wait until Vue finishes the DOM update.

That is the problem `nextTick` solves.

---

## What exactly is nextTick?

`nextTick` is a Vue utility that postpones the continuation of your code until the current DOM update cycle has completed. It supports both Promise and callback styles:

```ts
import { nextTick } from 'vue';

await nextTick();

// The DOM for earlier reactive changes has now been updated.
```

`nextTick` does not wait for an arbitrary amount of time. It waits for Vue to flush its pending updates, so it is a synchronization tool for Vue's scheduler—not a general-purpose delay.

---

## How Vue's update cycle works

Consider several synchronous changes to the same counter:

```ts
count.value++;
count.value++;
count.value++;
```

The value changes immediately, but Vue normally does not render the component three separate times. It batches the changes and patches the DOM once.

A simplified sequence looks like this:

1. Reactive state changes.
2. Vue queues the affected component update.
3. The current synchronous code finishes.
4. Vue flushes its update queue and patches the DOM.
5. The `nextTick` Promise resolves and code after `await` continues.

```ts
count.value++;

console.log(count.value); // New state value
console.log(counterEl.value?.textContent); // May still contain the old DOM text

await nextTick();

console.log(counterEl.value?.textContent); // Updated DOM text
```

The distinction is between state and rendered output. You do not need `nextTick` to read new reactive state; you may need it to interact with the DOM produced from that state.

---

## When should you use nextTick?

Use `nextTick` when the next operation directly depends on the updated DOM, such as:

- Focusing an input or button created with `v-if`
- Reading `clientHeight`, `scrollHeight`, or `getBoundingClientRect()` after content changes
- Scrolling to an item that was just added to a list
- Starting an animation based on a new element size or position
- Initializing a third-party library with freshly rendered markup
- Testing a component's rendered output after a reactive update

If you only need the new state value, `nextTick` is unnecessary because reactive state has already changed.

---

## Example 1: Focus an input after it appears

The input in this component only exists while `showInput` is `true`:

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
  <button type="button" @click="openAndFocus">Edit name</button>
  <input v-if="showInput" ref="inputRef" aria-label="Name" />
</template>
```

Immediately after `showInput.value = true`, Vue may not have created the input yet, so `inputRef.value` can still be `null`. After `await nextTick()`, the template has been patched and the ref is available.

---

## Example 2: Scroll to the latest message

The list height only changes after Vue renders the new item:

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

Reading `scrollHeight` before `nextTick` can return the previous list height and leave the viewport slightly above the newest message.

---

## Example 3: Measure an expanded panel

An accordion animation may need the real height of newly rendered content:

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

Here, `nextTick` ensures that the element exists and its current content contributes to the measurement. If a font, image, or asynchronous resource is still loading, one tick is not enough; wait for its actual `load` event as well.

---

## Example 4: Batch several state changes

You do not need a `nextTick` after every reactive assignment. Make the related changes first, then wait once:

```ts
const saveAndShowResult = async () => {
  isSaving.value = false;
  isModalOpen.value = false;
  notification.value = 'Changes saved';

  await nextTick();
  notificationRef.value?.focus();
};
```

Vue batches the changes and resolves the Promise after applying the resulting DOM update.

---

## Two ways to use nextTick

### Promise and async/await

This style is usually easier to read and keeps sequential UI logic together:

```ts
const updateLayout = async () => {
  expanded.value = true;
  await nextTick();
  measureLayout();
};
```

### Callback style

`nextTick` also accepts a callback:

```ts
expanded.value = true;

nextTick(() => {
  measureLayout();
});
```

Both forms have the same purpose. In modern code, `await nextTick()` often communicates the sequence more clearly.

---

## nextTick vs setTimeout

This code may appear to solve the same problem:

```ts
setTimeout(() => {
  inputRef.value?.focus();
}, 0);
```

However, `setTimeout(..., 0)` places the callback in the browser's task queue and has no direct relationship with Vue's render cycle. It often waits longer than necessary, hides the real intent, and is harder to control in tests.

`nextTick`, by contrast, is connected to Vue's scheduler and explicitly means: “continue after the pending Vue DOM updates are applied.” Use `nextTick` when you are waiting for Vue; use a timer when you genuinely need a time delay. They are not interchangeable.

---

## nextTick vs watch and watchEffect

These tools solve different problems:

| Tool | Primary purpose |
| --- | --- |
| `nextTick` | Continue one operation after the DOM update flush |
| `watch` | React to changes in one or more explicit reactive sources |
| `watchEffect` | Run an effect based on dependencies used inside it |
| Lifecycle hooks | Run logic at a component lifecycle stage |

If a list must be measured every time `items` changes, a post-flush watcher can be clearer than calling `nextTick` in several places:

```ts
watch(
  items,
  () => {
    measureList();
  },
  { flush: 'post' },
);
```

With `flush: 'post'`, the watcher callback runs after Vue updates the component DOM. For a step-by-step event handler—change state, wait for DOM, then focus—`nextTick` is usually the clearer option.

---

## Does nextTick mean the browser has painted?

No. A resolved `nextTick` means Vue has applied its DOM patch, but it does not guarantee that the browser has painted the new pixels to the screen.

For work that must happen on a following frame, such as precise visual animation sequencing, combine `nextTick` with `requestAnimationFrame`:

```ts
await nextTick();

await new Promise<void>((resolve) => {
  requestAnimationFrame(() => resolve());
});

// The browser has had a chance to enter the next frame.
```

This distinction usually does not matter for focus or basic DOM measurements, but it can matter for animation timing.

---

## nextTick with SSR and Nuxt

There is no browser DOM during server-side rendering. Code that accesses `document`, `window`, or template refs must run on the client, commonly inside `onMounted` or behind an appropriate guard:

```ts
onMounted(async () => {
  ready.value = true;
  await nextTick();
  elementRef.value?.focus();
});
```

`nextTick` is not a replacement for `onMounted`. If a component is not mounted, waiting one tick does not necessarily produce a usable browser element. Enter the correct lifecycle stage first, then use `nextTick` if that stage triggers another DOM update you need to await.

---

## Using nextTick in component tests

Reactive changes and rendered output are also asynchronous in tests. In Vue Test Utils, methods such as `trigger` and `setValue` return a Promise, so you can await them directly:

```ts
const wrapper = mount(Counter);

await wrapper.get('button').trigger('click');

expect(wrapper.get('[data-test="count"]').text()).toBe('1');
```

If you mutate state outside those helpers, wait for `nextTick` before asserting against the DOM:

```ts
count.value++;
await nextTick();

expect(wrapper.text()).toContain('1');
```

`nextTick` does not wait for unrelated Promises such as API responses. Await the actual Promise—or an appropriate Promise-flushing helper—in those cases.

---

## Common mistakes

### Waiting after every state change

If no subsequent code reads or writes the DOM, `nextTick` is unnecessary. Reactive values change immediately.

### Hiding an unstable design

Several consecutive `nextTick` calls often indicate that component dependencies, lifecycle timing, or data flow are not modeled clearly. Find the underlying race condition first.

### Assuming asynchronous data is ready

`nextTick` only flushes Vue's render queue. It does not wait for a fetch request, timer, image load, or CSS transition.

### Using it instead of a component event

If a parent needs to know when a child finishes an operation, an explicit event or Promise is usually better than guessing its timing with `nextTick`.

### Manipulating the DOM when Vue or CSS can do it

Before reaching for a template ref and DOM API, check whether a binding, computed value, directive, or CSS rule can express the same behavior declaratively.

---

## Decision checklist

Before writing `await nextTick()`, ask:

1. Do I need the new state or the new DOM?
2. Does the operation depend on an element's existence, size, position, focus, or scroll state?
3. Is this a one-time step after a specific action, or should it happen after every data change?
4. Would a post-flush watcher, lifecycle hook, or component event express the intent better?
5. Am I waiting for Vue, or actually waiting for an API, image, transition, or browser frame?

If the first answer is “the new DOM” and the second is “yes,” `nextTick` is probably the right tool.

---

## Conclusion

`nextTick` is a small but important synchronization tool for Vue's rendering lifecycle. Reactive state changes immediately, while Vue batches DOM patches for efficiency. `await nextTick()` lets you safely work with the DOM after that pending patch completes.

The practical rule is simple:

- Reading new state usually does not require `nextTick`.
- Focus, scroll, measurement, and integrations that depend on fresh DOM are good use cases.
- Repeated reactions to data may be clearer with `watch` or `watchEffect`.
- APIs, images, transitions, and browser paint require their own completion signals.

Used for the right reason, `nextTick` makes UI code predictable. Used everywhere, it can be a signal that the component architecture is doing more timing coordination than it should.
