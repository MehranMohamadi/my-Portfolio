# Context and Scope in JavaScript: Similar Terms, Different Jobs

## Introduction
`Scope` and `context` are often mixed up, but they solve different problems. Once you separate them clearly, debugging `this`, closures, and callback behavior becomes much easier.

---

## What is scope?
`Scope` defines which variables are accessible from a given part of your code.

Common types:

1. `Global Scope`
2. `Function Scope`
3. `Block Scope`
4. `Lexical Scope`

```js
const appName = 'portfolio';

function showMessage() {
  const title = 'Context vs Scope';

  if (true) {
    const version = 'v1';
    console.log(appName, title, version);
  }

  console.log(appName, title);
}
```

---

## What is context?
`Context` is about how a function is executed and what `this` refers to at runtime.

- `Scope` answers: "Which variables can I read here?"
- `Context` answers: "What is `this` right now?"

```js
const user = {
  name: 'Karo',
  greet() {
    console.log(this.name);
  },
};

user.greet();
```

---

## Scope vs context

| Concept | Main question | Example |
| --- | --- | --- |
| `Scope` | Which variables can I access? | `count`, `config`, `name` |
| `Context` | What is `this` right now? | `window`, `undefined`, an object |

---

## A common context bug

```js
const counter = {
  count: 0,
  increment() {
    this.count += 1;
  },
};

setTimeout(counter.increment, 1000);
```

Passing the method directly loses its original context. Fix it with an arrow function or `bind`.

```js
setTimeout(() => counter.increment(), 1000);
setTimeout(counter.increment.bind(counter), 1000);
```

---

## Scope and closures
Closures come from lexical scope. A function can keep access to variables from its outer function even after that outer function has finished executing.

```js
function createCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}
```

---

## Arrow functions and context
Arrow functions do not create their own `this`. They inherit it from the outer execution context, which makes them useful inside callbacks.

---

## Quick debugging rule

- Missing variable: usually a `scope` issue
- Broken `this`: usually a `context` issue
- Access to outer variables later on: likely a `closure`

---

## Summary
`Scope` is about variable access. `Context` is about the runtime value of `this`. Knowing the difference helps you write cleaner JavaScript and debug faster.
