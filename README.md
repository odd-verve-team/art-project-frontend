# Odd-Verve — Contemporary Art Marketplace (Frontend)

[English](#english) | [Українська](#українська)

---

<a id="english"></a>

## English

Client-side web application for **Odd-Verve**, a curated contemporary art marketplace connecting independent visual artists with collectors.

- **Frontend Repository:** [art-project-frontend](https://github.com/tavorotuk/art-project-frontend)
- **Backend Repository:** [art-project-backend](https://github.com/tavorotuk/art-project-backend)
- **Architecture & Developer Guide:** [`DEV_NOTES.md`](./DEV_NOTES.md)

### Tech Stack

- **Core:** React 19, TypeScript 6, Vite 8
- **Styling & Motion:** Tailwind CSS 4 (Mobile-First + Fluid `vw` Scaling), Framer Motion
- **State Management:** Zustand 5 (persisted auth storage & cross-store session sync)
- **Routing:** React Router DOM 7 (nested layouts & role-based guards)
- **Forms & Media:** React Hook Form, React Image Crop (`multipart/form-data` uploads)
- **Networking & Mocking:** Axios (401 refresh interceptor with request queue), Mock Service Worker (MSW 3)

### Key Features

- **Masonry Catalog:** Aspect-ratio-balanced 2/3-column grid with server-driven filtering, sorting, and `"See More"` pagination.
- **Debounced Live Search:** Instant dropdown suggestions and synchronized grid results via `/artworks/search/`.
- **Artwork & Artist Pages:** Detailed artwork specs, direct purchase inquiry (`buy-artwork`), category recommendations, and public artist portfolios.
- **Passwordless OTP Auth:** Email verification (`/users/code/` → `/users/authenticate/`) with automatic JWT refresh queuing on `401 Unauthorized`.
- **Role-Based Cabinet (`/profile`):**
  - **Collectors (`user`):** Profile/address settings, avatar upload, optimistic favorites with rollback, notifications, and artist application flow (`pending` / `approved` / `rejected`).
  - **Artists (`artist`):** Portfolio & social links management, artwork moderation statuses (`approved`, `pending`, `sold`, `rejected`), and new artwork uploader with interactive image cropping.

### Quick Start

```bash
git clone https://github.com/tavorotuk/art-project-frontend.git
cd art-project-frontend
git switch develop
npm install
cp .env.example .env
npm run dev
```

**Scripts:** `npm run dev` (local server) · `npm run build` (`tsc -b` + production bundle) · `npm run lint` (ESLint) · `npm run preview` (preview build).

### Autonomous Demo & QA Mode (MSW)

When `VITE_USE_MOCKS=true` is set in `.env`, **MSW** intercepts all API requests in the browser (both locally and on Vercel preview deployments) with realistic latency and in-memory state.

To test different roles on `/login`, enter an email with one of the prefixes below and **any 6-digit OTP code** (except `000000`, which triggers a validation error):

| Email Example | Role | Application Status | Unlocked Features |
| :--- | :--- | :--- | :--- |
| `user@example.com` | `user` | `null` | Collector cabinet + `"To become an artist"` flow |
| `pending@example.com` | `user` | `pending` | Collector cabinet with `"Application under review"` state |
| `rejected@example.com` | `user` | `rejected` | Collector cabinet with `"Re-apply to become an artist"` state |
| `artist@example.com` | `artist` | `approved` | Full artist cabinet, `My Arts` tab, and `New Art` uploader |
| `admin@example.com` | `admin` | `null` | Access to `/admin` route |

### Git Workflow & Roadmap

- **`develop`** — Default integration branch (`feature/*` and `chore/*` branches merge here via PRs).
- **`main`** — Production release branch.
- **Next Milestone:** Switching `VITE_USE_MOCKS=false` for live backend integration and completing `/admin` moderation views.

---

<a id="українська"></a>

## Українська

Клієнтський вебзастосунок **Odd-Verve** — кураторського маркетплейсу сучасного мистецтва, що поєднує незалежних художників та колекціонерів.

- **Репозиторій фронтенду:** [art-project-frontend](https://github.com/tavorotuk/art-project-frontend)
- **Репозиторій бекенду:** [art-project-backend](https://github.com/tavorotuk/art-project-backend)
- **Архітектура та нотатки розробника:** [`DEV_NOTES.md`](./DEV_NOTES.md)

### Стек технологій

- **Основа:** React 19, TypeScript 6, Vite 8
- **Стилізація та анімації:** Tailwind CSS 4 (Mobile-First + пропорційне `vw`-масштабування), Framer Motion
- **Глобальний стан:** Zustand 5 (збереження сесії та синхронізація сторів)
- **Маршрутизація:** React Router DOM 7 (вкладені лейаути та рольові гарди)
- **Форми та медіа:** React Hook Form, React Image Crop (`multipart/form-data` завантаження)
- **Мережа та моки:** Axios (інтерцептор 401 із чергою запитів), Mock Service Worker (MSW 3)

### Основні можливості

- **Masonry-каталог:** Динамічна сітка на 2/3 колонки з балансуванням за пропорціями картин, серверною фільтрацією, сортуванням та пагінацією `"See More"`.
- **Пошук із Debounce:** Миттєві підказки у випадаючому списку та синхронне оновлення сітки через `/artworks/search/`.
- **Сторінки картини та художника:** Деталі роботи, запит на купівлю (`buy-artwork`), рекомендації за категорією та публічне портфоліо автора.
- **OTP-автентифікація:** Вхід без пароля за кодом із пошти (`/users/code/` → `/users/authenticate/`) та автоматичне оновлення JWT через чергу запитів при `401 Unauthorized`.
- **Рольовий кабінет (`/profile`):**
  - **Колекціонери (`user`):** Редагування профілю й адреси, аватар, оптимістичні лайки з відкатом, сповіщення та подача заявки художника (`pending` / `approved` / `rejected`).
  - **Художники (`artist`):** Налаштування портфоліо й соцмереж, власні роботи зі статусами модерації (`approved`, `pending`, `sold`, `rejected`) та завантаження нових картин із кадруванням.

### Швидкий старт

```bash
git clone https://github.com/tavorotuk/art-project-frontend.git
cd art-project-frontend
git switch develop
npm install
cp .env.example .env
npm run dev
```

**Команди:** `npm run dev` (локальний сервер) · `npm run build` (`tsc -b` + продакшн-збірка) · `npm run lint` (ESLint) · `npm run preview` (перегляд збірки).

### Автономний демо-режим та QA (MSW)

За умови `VITE_USE_MOCKS=true` у `.env`, **MSW** перехоплює всі запити в браузері (як локально, так і на прев'ю-деплоях Vercel) із реалістичною затримкою та збереженням змін у пам'яті.

Для перевірки ролей на `/login` введіть email із відповідним префіксом та **будь-який 6-значний код** (крім `000000`, що симулює помилку):

| Приклад Email | Роль | Статус заявки | Доступний функціонал |
| :--- | :--- | :--- | :--- |
| `user@example.com` | `user` | `null` | Кабінет покупця + подача заявки `"To become an artist"` |
| `pending@example.com` | `user` | `pending` | Кабінет покупця зі статусом `"Application under review"` |
| `rejected@example.com` | `user` | `rejected` | Кабінет покупця з кнопкою повторної подачі заявки |
| `artist@example.com` | `artist` | `approved` | Повний кабінет художника, вкладка `My Arts` та завантаження робіт |
| `admin@example.com` | `admin` | `null` | Доступ до маршруту `/admin` |

### Git Flow та подальші плани

- **`develop`** — Основна гілка розробки (сюди вливаються `feature/*` та `chore/*` через PR).
- **`main`** — Стабільна релізна гілка.
- **Наступний етап:** Перемикання `VITE_USE_MOCKS=false` для інтеграції з живим бекендом та реалізація адмін-панелі `/admin`.
