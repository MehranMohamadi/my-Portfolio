# Nitro.js - سرور HTTP کامل

---

## مقدمه

ساخت برنامه‌های وب مدرن اغلب به نیاز یک سرور قدرتمند دارد که بتواند از روت‌های API، رندرینگ سمت سرور و middleware پشتیبانی کند.

**Nitro.js** یک سرور HTTP فوق‌السریع و بدون وابستگی به فریم‌ورک خاصی است که توسعه‌ی بک‌اند را به اندازه‌ی ایجاد فایل‌ها در یک دایرکتوری ساده می‌کند.

چه برای ساخت:
- یک REST API ساده
- یک برنامه‌ی تمام نقش‌ها با SSR
- یک میکروسرویس
- یک تابع serverless

Nitro ابزارها و فریم‌ورکی فراهم می‌کند که می‌تونی در ثانیه‌ها شروع کنی.

---

## Nitro چیست؟

Nitro یک **سرور HTTP کوچک و سبک** است که بر روی Web APIs استاندارد ساخته شده است (مثل Fetch و Response). هدفش کار کردن با:

- **Nuxt.js** (اگرچه بدون وابستگی به هیچ فریم‌ورکی)
- **هر محیط Node.js**
- **پلتفرم‌های سرورلس** (AWS Lambda، Vercel، Cloudflare Workers، و غیره)
- **کانتینرهای Docker**

### چرا Nitro؟

✅ **روت‌دهی مبتنی بر فایل** - با سازماندهی ساده‌ی فایل‌ها، روت‌هایت ایجاد می‌شوند  
✅ **بدون کانفیگ** - درست از جعبه کار می‌کند  
✅ **پشتیبانی Middleware** - stack middleware قابل ترکیب  
✅ **اعتبارسنجی درون‌ساخته** - route handler های type-safe با TypeScript  
✅ **استقرار در بسیاری جا** - به هرجایی استقرار بده  
✅ **سریع فوق‌العاده** - بهینه‌شده برای کارایی  

---

## شروع با Nitro

### نصب

```bash
npm install -D nitropack
```

### ساختار پروژه

```
project/
├── server/
│   ├── api/
│   │   ├── hello.ts
│   │   └── users/
│   │       └── [id].ts
│   ├── middleware/
│   │   └── auth.ts
│   └── routes/
│       └── sitemap.xml.ts
└── nitro.config.ts
```

---

## ایجاد اولین روت‌ت

### روت GET ساده

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    message: 'سلام از Nitro!',
    timestamp: new Date().toISOString()
  };
});
```

### روت با پارامتر

```typescript
// server/api/users/[id].ts
export default defineEventHandler((event) => {
  const { id } = getRouterParams(event);
  
  return {
    userId: id,
    name: 'علی احمدی',
    email: 'ali@example.com'
  };
});
```

### POST با JSON

```typescript
// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  // اعتبارسنجی
  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'نام و ایمیل لازم است'
    });
  }
  
  // ذخیره در دیتابیس
  const user = await db.users.create(body);
  
  return user;
});
```

---

## Middleware در Nitro

Middleware قبل از route handler ت اجرا می‌شود، مناسب برای احراز هویت، CORS، logging و بیشتر.

### ایجاد Middleware

```typescript
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth-token');
  
  if (!token && event.node.req.url.startsWith('/api/admin')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'بدون اجازه'
    });
  }
});
```

---

## مدیریت Request و Response

### خواندن داده‌های Request

```typescript
export default defineEventHandler(async (event) => {
  // Query parameters
  const query = getQuery(event);
  
  // Route parameters
  const params = getRouterParams(event);
  
  // Headers
  const headers = getHeader(event, 'authorization');
  
  // Body
  const body = await readBody(event);
  
  return { query, params, headers, body };
});
```

### Response سفارشی

```typescript
export default defineEventHandler((event) => {
  // تعیین status و headers
  setResponseStatus(event, 201);
  setHeader(event, 'X-Custom-Header', 'value');
  
  // ارسال پاسخ
  return { id: 1, created: true };
});
```

---

## مدیریت خطا

Nitro مدیریت خطا را با فرمت‌کردن خودکار خطا آسان می‌کند.

```typescript
export default defineEventHandler(async (event) => {
  try {
    const user = await getUser(id);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'کاربر یافت نشد',
        data: { userId: id }
      });
    }
    return user;
  } catch (error) {
    // خطا خودکار فرمت‌دهی و ارسال می‌شود
    throw error;
  }
});
```

---

## استقرار

### Vercel

```typescript
// nitro.config.ts
export default defineNitroConfig({
  prerender: {
    crawlLinks: true
  }
});
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

---

## بهترین شیوه‌ها

### 1. سازماندهی روت‌ها

روت‌ها را بر اساس ویژگی سازماندهی کن:
```
server/
├── api/
│   ├── auth/
│   ├── users/
│   └── posts/
```

### 2. استفاده از متغیرهای محیط

```typescript
const apiKey = useRuntimeConfig().apiKey;
```

### 3. اعتبارسنجی Input

همیشه داده‌های دریافتی را بررسی کن تا از مسائل امنیتی جلوگیری کنی.

### 4. Cache استراتژیک

برای داده‌های پرتکرار از Response caching استفاده کن:

```typescript
export default defineEventHandler((event) => {
  setHeader(event, 'Cache-Control', 'public, max-age=3600');
  return { data: 'cached' };
});
```

---

## نتیجه‌گیری

Nitro.js توسعه‌ی بک‌اند را با فراهم کردن یک فریم‌ورک سبک و کارآمد ساده می‌کند که بتونی روی ساخت ویژگی‌ها تمرکز کنی نه زیرساخت.

با روت‌دهی مبتنی بر فایل، پشتیبانی middleware و انعطاف‌پذیری استقرار، Nitro انتخاب عالیی برای ساخت API، برنامه‌های تمام نقش‌ها و میکروسرویس‌ها است.

**امروز شروع کن و بک‌اند بعدی‌ات را با Nitro بساز!**
