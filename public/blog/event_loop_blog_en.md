# JavaScript Event Loop: How Async Code Really Runs

## Introduction
JavaScript runs on a single thread, meaning only one synchronous operation runs on the call stack at a time. Yet it still handles many async tasks efficiently. The key is the `Event Loop`.

---

## A simple mental model

Keep these 4 parts in mind:

1. `Call Stack`: where synchronous code executes
2. `Web APIs` (or Node APIs): async work like timers and network
3. `Task Queue` (Macrotask Queue): callbacks such as `setTimeout`
4. `Microtask Queue`: callbacks from `Promise.then`, `queueMicrotask`, `MutationObserver`

The Event Loop repeatedly does this:

- If stack is empty, flush all microtasks first
- Then run one macrotask from the task queue
- Repeat

---

## Promise vs setTimeout execution order

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

Output:

```txt
A
D
C - promise
B - timeout
```

Why? Because microtasks (`Promise`) run before macrotasks (`setTimeout`).

---

## Real-world pattern: avoid UI blocking

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

This chunks heavy work so the Event Loop can render frames and process user input.

---

## What is microtask starvation?

If you keep scheduling microtasks recursively, macrotasks and rendering can be delayed indefinitely.

```js
function loop() {
  queueMicrotask(loop);
}

loop();
```

This pattern can freeze the UI because the microtask queue never drains.

---

## Browser vs Node.js Event Loop

The core idea is the same, but Node.js has explicit phases (timers, poll, check, ...).  
Knowing those differences helps debug async behavior in fullstack apps.

---

## Best practices

- Use `queueMicrotask` / `Promise.then` for lightweight deferred logic
- Use `setTimeout` or `requestIdleCallback` to split heavy work
- Avoid infinite microtask recursion
- Profile with DevTools Performance panel

---

## Conclusion

The Event Loop controls when async callbacks actually run. Understanding it helps you:

- Debug async issues faster
- Build smoother UIs
- Choose better between microtasks and macrotasks

