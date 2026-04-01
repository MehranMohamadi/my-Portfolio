# Context and Scope in Vue: Why `watch` Must Run Inside Vue Context

## Introduction
In Vue, some APIs are not just regular functions. APIs like `watch` need to run inside Vue's execution context so they can connect to reactivity, lifecycle, and cleanup correctly.

---

## Scope vs context in Vue

- `Scope` means which variables or refs you can access
- `Context` means whether the code is running inside Vue's active component/reactivity environment

---

## The common mistake

Writing `watch()` directly in a random `ts` file is usually the wrong abstraction:

```ts
import { watch } from 'vue';
```

The better pattern is to wrap it in a composable and call that composable from `setup` or `<script setup>`.

```ts
import { watch, type Ref } from 'vue';

export function useUserWatcher(userId: Ref<number | null>) {
  watch(userId, (value) => {
    console.log(value);
  });
}
```

---

## The key rule

- Defining logic in a `ts` file is fine
- Executing `watch` should happen in Vue context

That usually means:

1. `setup()`
2. `<script setup>`
3. A composable called from setup

---

## Summary
If you want to use `watch` in a TypeScript file, put it inside a function or composable, then call that function from Vue's setup context. That way Vue can properly register, manage, and clean up the watcher.
