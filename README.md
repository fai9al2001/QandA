# لعبة معرفة تريفيا (Arabic Trivia Game)

واجهة لعبة أسئلة وأجوبة تفاعلية مبنية بـ Vite + React + TypeScript + Tailwind مع دعم اللغة العربية (اتجاه RTL).

## Features
- React 18 + TypeScript
- Vite fast dev server
- Tailwind CSS with dark mode toggle
- React Router basic pages (Home, Ask, Question, 404)
- Sample placeholder data

## التشغيل محلياً (Development)
ثبّت الحزم ثم شغّل خادم التطوير:

```
npm install
npm run dev
```

## البناء (Build)
```
npm run build
npm run preview
```

## البنية (Structure)
```
src/
  main.tsx        # entry
  App.tsx         # routes
  components/     # layout + UI
  pages/          # page components
  styles.css      # Tailwind directives
```

## أفكار مستقبلية
- نظام خلفي لتخزين الأسئلة (API / قاعدة بيانات)
- حسابات وتسجيل دخول
- لوبي انتظار متعدد الألعاب
- لوح نقاط مباشر عبر WebSocket
- مؤقت مرئي صوتي

## النشر على GitHub Pages (Hosting on GitHub Pages)
1. أنشئ مستودع Git جديد وادفع الكود إلى GitHub.
2. أضف سكربت نشر في `package.json` (مثال يستخدم الفرع `gh-pages`).
3. ثبّت أداة `gh-pages`:
  ```
  npm install --save-dev gh-pages
  ```
4. حدّث `package.json`:
  ```json
  {
    "homepage": "https://USERNAME.github.io/REPO",
    "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
    }
  }
  ```
5. شغّل:
  ```
  npm run deploy
  ```
6. فعّل GitHub Pages من إعدادات المستودع (Source: gh-pages branch).

ملاحظة: لتعمل الروابط (Routing) بدون 404 في GitHub Pages قد تحتاج ملف `404.html` ينسخ محتوى `index.html`.
