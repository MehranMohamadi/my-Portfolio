# Context و Scope در JavaScript: دو مفهوم شبیه، دو کاربرد متفاوت

## مقدمه
خیلی وقت‌ها این دو واژه به‌جای هم استفاده می‌شوند، در حالی که `scope` و `context` یکی نیستند. اگر این تفاوت را دقیق بفهمی، هم کد خواناتری می‌نویسی و هم باگ‌های مربوط به `this`، closure و nested functionها را سریع‌تر پیدا می‌کنی.

---

## Scope چیست؟
`Scope` مشخص می‌کند به چه متغیرهایی از یک بخش کد دسترسی داری.

در جاوااسکریپت معمولاً با این نوع scope روبه‌رو می‌شویم:

1. `Global Scope`
2. `Function Scope`
3. `Block Scope`
4. `Lexical Scope`

مثال ساده:

```js
const appName = 'portfolio';

function showMessage() {
  const title = 'Context vs Scope';

  if (true) {
    const version = 'v1';
    console.log(appName, title, version);
  }

  console.log(appName, title);
  // console.log(version); // ReferenceError
}
```

در این مثال:

- `appName` در scope سراسری است
- `title` فقط داخل تابع در دسترس است
- `version` فقط داخل همان block در دسترس است

---

## Lexical Scope یعنی چه؟
جاوااسکریپت scope را براساس محل نوشته شدن کد تعیین می‌کند، نه محل اجرا شدن آن. به این ویژگی می‌گوییم `Lexical Scope`.

```js
function outer() {
  const topic = 'JavaScript';

  function inner() {
    console.log(topic);
  }

  inner();
}
```

تابع `inner` به `topic` دسترسی دارد چون در همان محیط تعریف شده، حتی اگر بعداً در جای دیگری صدا زده شود.

---

## Context چیست؟
`Context` به این مربوط است که یک تابع در چه شرایط اجرایی اجرا می‌شود و مقدار `this` داخل آن چه خواهد بود.

پس به‌صورت خلاصه:

- `Scope` می‌گوید به چه چیزی دسترسی داری
- `Context` می‌گوید الان `this` به چه چیزی اشاره می‌کند

مثال:

```js
const user = {
  name: 'Karo',
  greet() {
    console.log(this.name);
  },
};

user.greet(); // Karo
```

اینجا `this` به آبجکت `user` اشاره می‌کند، چون تابع به‌عنوان متد همان آبجکت صدا زده شده است.

---

## تفاوت مهم Scope و Context

| مفهوم | سوال اصلی | مثال |
| --- | --- | --- |
| `Scope` | به کدام متغیرها دسترسی دارم؟ | `name`، `count`، `config` |
| `Context` | مقدار `this` الان چیست؟ | `window`، `undefined`، یک object |

این دو معمولاً با هم اشتباه گرفته می‌شوند چون هر دو به "محیط اجرای کد" مربوط‌اند، اما در عمل دو مسئله‌ی جدا هستند.

---

## باگ رایج: از دست رفتن Context

```js
const counter = {
  count: 0,
  increment() {
    this.count += 1;
    console.log(this.count);
  },
};

setTimeout(counter.increment, 1000);
```

اینجا متد `increment` جدا از آبجکت پاس داده شده، بنابراین context قبلی‌اش را از دست می‌دهد و `this` دیگر به `counter` اشاره نمی‌کند.

راه‌حل:

```js
setTimeout(() => counter.increment(), 1000);
```

یا:

```js
setTimeout(counter.increment.bind(counter), 1000);
```

---

## Scope و Closure چه ارتباطی دارند؟
`Closure` نتیجه‌ی مستقیم lexical scope است. یعنی یک تابع می‌تواند بعد از تمام شدن اجرای تابع والد هم به متغیرهای آن دسترسی داشته باشد.

```js
function createCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

const increment = createCounter();

console.log(increment()); // 1
console.log(increment()); // 2
```

اینجا `count` داخل scope تابع `createCounter` است، اما تابع برگشتی هنوز به آن دسترسی دارد.

---

## Arrow Function و Context
تابع‌های arrow، `this` مخصوص خودشان را نمی‌سازند و `this` را از context بیرونی می‌گیرند.

```js
const team = {
  name: 'Frontend',
  members: ['Ali', 'Sara'],
  print() {
    this.members.forEach((member) => {
      console.log(this.name, member);
    });
  },
};
```

اینجا استفاده از arrow باعث می‌شود `this.name` همان `this` متد `print` باشد. اگر به‌جای آن function معمولی بگذاری، ممکن است context متفاوت شود.

---

## چطور سریع تشخیص بدهم مشکل از Scope است یا Context؟

- اگر خطا از نوع `ReferenceError` یا "متغیر پیدا نشد" باشد، معمولاً مشکل از `scope` است
- اگر مشکل روی `this`، متدهای آبجکت یا callbackها باشد، معمولاً به `context` مربوط است
- اگر تابعی به متغیرهای بیرونی دسترسی دارد، احتمالاً با `closure` طرف هستی

---

## بهترین شیوه‌ها

- برای جلوگیری از اشتباه، تا جای ممکن از `const` و `let` به‌جای `var` استفاده کن
- هنگام پاس دادن متدهای object به callbackها، حواست به `this` باشد
- وقتی به context پایدار نیاز داری، از `bind` یا arrow function استفاده کن
- برای دیباگ، جداگانه از خودت بپرس: "این متغیر از کجا آمده؟" و "الان this چیست؟"

---

## جمع‌بندی
اگر بخواهم خیلی کوتاه بگویم:

- `Scope` درباره‌ی دسترسی به متغیرهاست
- `Context` درباره‌ی مقدار `this` در لحظه‌ی اجراست

فهم دقیق این تفاوت، پایه‌ی درک closure، callback، object method و بخش مهمی از رفتار جاوااسکریپت است.
