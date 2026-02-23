
# Debounce and Throttle in JavaScript

---

## Introduction

In modern web applications, especially in Vue and Nuxt projects, proper event management directly impacts **performance** and user experience.  
Events such as scroll, resize, input, and mousemove can fire dozens or even hundreds of times per second.

If these events directly trigger API calls, heavy computations, or re-renders, performance degradation and unnecessary resource consumption are inevitable.

This is where two important techniques come in:

- **Debounce**
- **Throttle**

---

## What is Debounce?

### Concept

**Debounce ensures that a function is executed only after a certain period of inactivity since the last call.**

Simply put:  
Do not run while events keep firing. Execute once after they stop.

### Basic Implementation

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

### Real Project Example (Search in Nuxt)

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

### Why Debounce Makes Sense Here?

- Users type continuously  
- Only the final result matters  
- API calls are costly  
- UX becomes cleaner

---

## What is Throttle?

### Concept

**Throttle ensures that a function executes at most once every X milliseconds.**

Simply put:  
No matter how often the event fires, execution is rate-limited.

### Basic Implementation

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

### Real Project Example (Scroll Listener)

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
const handleScroll = throttle(() => {
  isSticky.value = window.scrollY > 100;
}, 200);

window.addEventListener('scroll', handleScroll);
</code></pre>
</div>

### Why Throttle is Appropriate Here?

- Scroll events fire frequently  
- No need to process every pixel  
- Reduces pressure on the main thread

---

## Debounce vs Throttle Comparison

| Feature | Debounce | Throttle |
|----------|-----------|------------|
| Execution Time | After inactivity | At fixed intervals |
| Best For | Search, Autocomplete | Scroll, Resize |
| Focus | Final result | Rate limiting |

---

## Architectural Perspective

Debounce is based on **Idle Detection**.  
Throttle is based on **Rate Limiting**.

- Debounce fits intent-driven interactions  
- Throttle fits continuous events

---

## Best Practices

### 1. Use Lodash in Production

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
</code></pre>
</div>

### 2. Cleanup in Vue/Nuxt

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</code></pre>
</div>

### 3. Be Careful with SSR in Nuxt

Window events exist only on the **client side**.

---

## Common Mistakes

- ❌ Using Debounce for Scroll → may cause lag  
- ❌ Using Throttle for Search → incomplete results and poor UX  
- ❌ Forgetting cancel → should cancel on route changes

<div style="background:#1e1e1e; padding:12px; border-radius:8px; color:#dcdcdc; direction:ltr;">
<pre style="margin:0;"><code style="color:#dcdcdc;">
const debounced = debounce(fn, 300);
debounced.cancel();
</code></pre>
</div>

---

## Conclusion

Debounce and Throttle are tools for controlling system load, not just utility helpers.

- **Debounce** → when the final result matters  
- **Throttle** → when execution rate control matters  

Proper use of these techniques directly impacts **performance, Core Web Vitals, and UX**.
