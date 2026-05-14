# Nitro.js - خادم HTTP الكامل

---

## المقدمة

بناء تطبيقات الويب الحديثة غالباً ما يتطلب خادماً قوياً يمكنه التعامل مع مسارات API وتقديم الصفحات من جانب الخادم والبرامج الوسيطة بسهولة.

**Nitro.js** هو خادم HTTP فائق السرعة ومستقل عن الإطار العمل يجعل تطوير الواجهة الخلفية بسيط مثل إنشاء ملفات في مجلد.

سواء كنت تبني:
- REST API بسيط
- تطبيق كامل مع SSR
- microservice
- دالة serverless

يوفر Nitro الإطار العمل والأدوات للبدء في ثوان.

---

## ما هو Nitro؟

Nitro هو **خادم HTTP بسيط وخفيف الوزن** مبني على Web APIs القياسية (مثل Fetch و Response). وهو مصمم للعمل مع:

- **Nuxt.js** (على الرغم من أنه مستقل عن أي إطار عمل)
- **أي بيئة Node.js**
- **منصات serverless** (AWS Lambda، Vercel، Cloudflare Workers، إلخ)
- **حاويات Docker**

### لماذا Nitro؟

✅ **التوجيه المبني على الملفات** - أنشئ المسارات ببساطة بتنظيم الملفات في دليل  
✅ **بدون تكوين** - يعمل من الصندوق  
✅ **دعم البرامج الوسيطة** - مجموعة middleware قابلة للتركيب  
✅ **التحقق المدمج** - معالجات توجيه آمنة من النوع باستخدام TypeScript  
✅ **استهداف نشر متعدد** - انشر في أي مكان  
✅ **سرعة فائقة** - محسّن للأداء  

---

## الشروع مع Nitro

### التثبيت

```bash
npm install -D nitropack
```

### هيكل المشروع

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

## إنشاء أول مسار لك

### مسار GET بسيط

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    message: 'مرحباً من Nitro!',
    timestamp: new Date().toISOString()
  };
});
```

### مسار مع معاملات

```typescript
// server/api/users/[id].ts
export default defineEventHandler((event) => {
  const { id } = getRouterParams(event);
  
  return {
    userId: id,
    name: 'محمد علي',
    email: 'mohmmad@example.com'
  };
});
```

### POST مع JSON

```typescript
// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  // التحقق من الصحة
  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'الاسم والبريد الإلكتروني مطلوبان'
    });
  }
  
  // حفظ في قاعدة البيانات
  const user = await db.users.create(body);
  
  return user;
});
```

---

## البرامج الوسيطة في Nitro

تعمل البرامج الوسيطة قبل معالجات المسارات، وهي مثالية للمصادقة و CORS والتسجيل والمزيد.

### إنشاء برنامج وسيط

```typescript
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth-token');
  
  if (!token && event.node.req.url.startsWith('/api/admin')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'غير مصرح'
    });
  }
});
```

---

## معالجة الطلب والاستجابة

### قراءة بيانات الطلب

```typescript
export default defineEventHandler(async (event) => {
  // الحصول على معاملات الاستعلام
  const query = getQuery(event);
  
  // الحصول على معاملات المسار
  const params = getRouterParams(event);
  
  // الحصول على الرؤوس
  const headers = getHeader(event, 'authorization');
  
  // الحصول على الجسم
  const body = await readBody(event);
  
  return { query, params, headers, body };
});
```

### الاستجابات المخصصة

```typescript
export default defineEventHandler((event) => {
  // تعيين حالة الاستجابة والرؤوس
  setResponseStatus(event, 201);
  setHeader(event, 'X-Custom-Header', 'value');
  
  // إرسال الاستجابة
  return { id: 1, created: true };
});
```

---

## معالجة الأخطاء

يجعل Nitro معالجة الخطأ بديهية مع تنسيق الخطأ المدمج.

```typescript
export default defineEventHandler(async (event) => {
  try {
    const user = await getUser(id);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'لم يتم العثور على المستخدم',
        data: { userId: id }
      });
    }
    return user;
  } catch (error) {
    // يتم تنسيق الخطأ وإرساله تلقائياً
    throw error;
  }
});
```

---

## النشر

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

## أفضل الممارسات

### 1. تنظيم المسارات

حافظ على المسارات منظمة حسب الميزة:
```
server/
├── api/
│   ├── auth/
│   ├── users/
│   └── posts/
```

### 2. استخدام متغيرات البيئة

```typescript
const apiKey = useRuntimeConfig().apiKey;
```

### 3. التحقق من الإدخال

تحقق دائماً من البيانات الواردة لمنع مشاكل الأمان.

### 4. التخزين المؤقت الاستراتيجي

استخدم التخزين المؤقت للاستجابات للبيانات التي يتم الوصول إليها بشكل متكرر:

```typescript
export default defineEventHandler((event) => {
  setHeader(event, 'Cache-Control', 'public, max-age=3600');
  return { data: 'cached' };
});
```

---

## الخلاصة

يُبسّط Nitro.js تطوير الواجهة الخلفية من خلال توفير إطار عمل خفيف الوزن وعالي الأداء يسمح لك بالتركيز على بناء الميزات بدلاً من البنية الأساسية.

مع التوجيه المبني على الملفات ودعم البرامج الوسيطة ومرونة النشر، يعتبر Nitro خياراً ممتازاً لبناء APIs وتطبيقات كاملة وخدمات صغيرة.

**ابدأ ببناء واجهتك الخلفية التالية مع Nitro اليوم!**
