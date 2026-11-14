# Developer Notes & Architecture Guide

[English](#english) | [Українська](#українська)

---

<a id="english"></a>

## English

### 1. Project Directory Structure

- **`src/assets/`** — Static `.webp` images and `.svg` icons.
- **`src/components/ui/`** — Stateless UI primitives (`Loader`, `Drawer`, `BackButton`, `OtpInput`, `Logo`, `HeroFrame`, `HeroLogo`) driven strictly by `props`.
- **`src/components/features/`** — Domain components grouped by feature (`Artworks`, `ArtworkDetails`, `ArtistProfile`, `Gallery`, `HeroSlider`, `Profile`, `Search`).
- **`src/components/layout/`** — Layout wrappers and navigation (`MainLayout`, `ProfileLayout`, `ProtectedRoute`, `Header`, `Footer`).
- **`src/components/modals/`** — Global modal manager (`GlobalModal`) and `ContactUsForm`.
- **`src/constants/`** — Single Source of Truth for domain configs, filter limits/options, navigation links, profile field schemas, and static slides (`common.ts`, `gallery.ts`, `navigation.ts`, `profile.ts`, `home.ts`).
- **`src/hooks/`** — Custom React hooks (`useDebounce.ts`).
- **`src/mocks/`** — MSW worker setup (`browser.ts`), route handlers (`handlers/`), and in-memory seed data (`data/`).
- **`src/pages/`** — Route-level page components registered in `src/router.tsx`.
- **`src/services/`** — Axios client, interceptors, and API service modules (`api.ts`).
- **`src/store/`** — Zustand stores (`useAuthStore`, `useProfileStore`, `useArtworkStore`, `useFavoritesStore`, `useNotificationsStore`, `useAppStore`) and `sessionSync.ts`.
- **`src/types/`** — Shared TypeScript contracts (`artwork.ts`, `artist.ts`, `user.ts`, `auth.ts`, `gallery.ts`, `notifications.ts`).
- **`src/utils/`** — Helpers (`apiErrors.ts`, `tokenQueue.ts`, `galleryFilters.ts`, `getArtworkStatusMeta.ts`, `getFullName.ts`, `formatDate.ts`, `cn.ts`, `ScrollToTop.tsx`).

### 2. Constants & Styling Convention

- **Centralized Configs (`src/constants/`):** All filter options, limits, navigation links, and form field schemas live in `src/constants/`. Cross-feature constant imports are prohibited.
- **Co-located Tailwind Styles:** Component-specific class strings (`INPUT_GROUP`, `TAB_LINK_BASE`) stay at the top of their `.tsx` file to keep styling encapsulated.

### 3. Routing & Role-Based Access Control (`src/router.tsx`)

- **Public Routes:** `/` (`HomePage`), `/gallery` (`GalleryPage`), `/gallery/:id` (`ArtworkPage`), `/artists/:id` (`ArtistProfilePage`), `/search` (`SearchPage`), and `/login` (`LoginPage`).
- **Protected Cabinet (`/profile` — roles: `user`, `artist`, `admin`):**
  - `/profile` → redirects to `/profile/settings`.
  - `/profile/settings` — Personal info, address, avatar upload (`FormData`), and artist application (`To become an artist` / `Application under review` / `Re-apply`). Renders artist bio/style/statement/socials when `role === 'artist'`.
  - `/profile/favorites` — Saved favorite artworks grid.
  - `/profile/notifications` — Order inquiries and moderation notifications.
  - `/profile/arts` *(only `artist`)* — Uploaded artworks with status badges (`approved`, `pending`, `sold`, `rejected`).
  - `/profile/arts/new` *(only `artist`)* — Multipart artwork upload form with image cropper.
- **Protected Admin Route (`/admin` — role: `admin`):** Moderation dashboard stub.

### 4. API Layer, Token Refresh Queue & Session Sync

- **`FormData` Handling (`api.ts`):** Request interceptor strips `application/json` when `config.data instanceof FormData` so the browser sets the multipart boundary.
- **401 Refresh Queue (`tokenQueue.ts`):** Concurrent `401` responses wait in an in-memory queue while a single `POST /users/refresh/` executes, then replay with the new token (or clear session and redirect to `/login` on failure).
- **Session Sync (`sessionSync.ts`):** Subscribes to `useAuthStore` at bootstrap. Hydrates `useProfileStore` (`/artists/profile/` or `/users/profile/` by role) and `useFavoritesStore` on login; resets all user stores on logout.

### 5. Gallery Data Flow, Search & Optimistic Favorites

- **Gallery (`useArtworkStore`):** Holds active `filters` and `sort`. `formatGalleryParams` serializes filter arrays into query strings. `GalleryPage` caches loaded items across route transitions using refs and appends pages via `"See More"`.
- **Masonry Grid (`ArtworkGrid`):** Balances 2 columns (`< 1024px`) or 3 columns (`>= 1024px`) by cumulative aspect ratio (`image_height / image_width`) while preserving server sort order.
- **Debounced Search (`SearchPage`):** Uses `useDebounce(trimmedQuery, 300)` against `GET /artworks/search/?text=`. Tracks `isSearchPending` (`isSearching || trimmedQuery !== debouncedQuery`) to prevent empty-state flashes and falls back to `galleryArtworks` when cleared.
- **Optimistic Favorites (`useFavoritesStore`):** Toggles `favoriteArtworkIds: Set<number>` immediately in UI and rolls back if `POST/DELETE /favorites/` fails.

### 6. Responsive Design & Animations

- **Breakpoints:** Mobile-first (`393px` ref) → `md:` (`768px`) → `lg:` (`1024px–1440px` ref) → `xl:` (`1280px`). Global padding uses `.px-global` and `.pt-header` CSS variables.
- **Fluid Scaling:** Editorial layouts (`ArtworkPage`, `ArtistProfilePage`) scale proportionally between `1024px` and `1440px` using `(px / 1440) * 100 = vw` capped with `min()`, e.g. `lg:h-[min(52.08vw,750px)]`.
- **Hero Animations:** First visit plays a cascading reveal (`HeroLogo` → `HeroFrame` → `HeroSlider`) tracked in `useAppStore`; return visits morph the header `Logo` into `HeroLogo` via Framer Motion shared layout.

### 7. MSW Mocking Notes

- Enabled via `VITE_USE_MOCKS=true` in `src/main.tsx`. See `README.md` for test login email prefixes.
- `src/mocks/data/artistsData.ts` provides full profiles for all 6 catalog artists (`id: 10..15`). Append `?mock_error=500` to `/notifications/` to test error states.

---

<a id="українська"></a>

## Українська

### 1. Архітектура папок проєкту

- **`src/assets/`** — Статичні `.webp` зображення та `.svg` іконки.
- **`src/components/ui/`** — Універсальні UI-примітиви без бізнес-логіки (`Loader`, `Drawer`, `BackButton`, `OtpInput`, `Logo`, `HeroFrame`, `HeroLogo`), що працюють суто через `props`.
- **`src/components/features/`** — Предметні компоненти за модулями (`Artworks`, `ArtworkDetails`, `ArtistProfile`, `Gallery`, `HeroSlider`, `Profile`, `Search`).
- **`src/components/layout/`** — Каркасні обгортки та навігація (`MainLayout`, `ProfileLayout`, `ProtectedRoute`, `Header`, `Footer`).
- **`src/components/modals/`** — Менеджер модальних вікон (`GlobalModal`) та форма `ContactUsForm`.
- **`src/constants/`** — Єдине джерело правди для бізнес-конфігурацій, лімітів/опцій фільтрів, навігації, схем полів профілю та даних слайдера (`common.ts`, `gallery.ts`, `navigation.ts`, `profile.ts`, `home.ts`).
- **`src/hooks/`** — Кастомні React-хуки (`useDebounce.ts`).
- **`src/mocks/`** — Налаштування MSW (`browser.ts`), перехоплювачі маршрутів (`handlers/`) та in-memory фікстури (`data/`).
- **`src/pages/`** — Компоненти сторінок, підключені в `src/router.tsx`.
- **`src/services/`** — Клієнт Axios, інтерцептори та типізовані API-сервіси (`api.ts`).
- **`src/store/`** — Глобальні стори Zustand (`useAuthStore`, `useProfileStore`, `useArtworkStore`, `useFavoritesStore`, `useNotificationsStore`, `useAppStore`) та `sessionSync.ts`.
- **`src/types/`** — Спільні TypeScript-контракти (`artwork.ts`, `artist.ts`, `user.ts`, `auth.ts`, `gallery.ts`, `notifications.ts`).
- **`src/utils/`** — Утиліти (`apiErrors.ts`, `tokenQueue.ts`, `galleryFilters.ts`, `getArtworkStatusMeta.ts`, `getFullName.ts`, `formatDate.ts`, `cn.ts`, `ScrollToTop.tsx`).

### 2. Організація констант та стилів

- **Централізовані конфіги (`src/constants/`):** Усі опції фільтрів, ліміти, маршрути навігації та схеми полів форм знаходяться в `src/constants/`. Імпорт констант між різними фічами заборонений.
- **Локальні Tailwind-стилі:** Рядкові константи класів конкретного компонента (`INPUT_GROUP`, `TAB_LINK_BASE`) залишаються на початку відповідного `.tsx` файлу.

### 3. Маршрутизація та рольовий доступ (`src/router.tsx`)

- **Публічні маршрути:** `/` (`HomePage`), `/gallery` (`GalleryPage`), `/gallery/:id` (`ArtworkPage`), `/artists/:id` (`ArtistProfilePage`), `/search` (`SearchPage`) та `/login` (`LoginPage`).
- **Захищений кабінет (`/profile` — ролі: `user`, `artist`, `admin`):**
  - `/profile` → автоматичний редірект на `/profile/settings`.
  - `/profile/settings` — Особисті дані, адреса, завантаження аватара (`FormData`) та подача заявки художника (`To become an artist` / `Application under review` / `Re-apply`). Для ролі `artist` відкриває поля `bio`, `style`, `statement`, категорії та соцмережі.
  - `/profile/favorites` — Сітка збережених улюблених картин.
  - `/profile/notifications` — Сповіщення про замовлення та модерацію.
  - `/profile/arts` *(тільки `artist`)* — Власні картини зі статусами (`approved`, `pending`, `sold`, `rejected`).
  - `/profile/arts/new` *(тільки `artist`)* — Форма публікації нової картини з кадруванням.
- **Адмін-панель (`/admin` — роль: `admin`):** Сторінка модерації (заглушка).

### 4. Мережевий шар, черга оновлення токенів та синхронізація сесії

- **Підтримка `FormData` (`api.ts`):** Request-інтерцептор прибирає `application/json` для `FormData`, дозволяючи браузеру виставити multipart boundary.
- **Черга 401 (`tokenQueue.ts`):** Паралельні запити, що отримали `401`, стають у чергу під час виконання одного `POST /users/refresh/`, після чого повторюються з новим токеном (або очищують сесію з редіректом на `/login`).
- **Синхронізація сторів (`sessionSync.ts`):** Підписується на `useAuthStore` при старті застосунку. При вході завантажує `useProfileStore` (`/artists/profile/` або `/users/profile/` за роллю) та `useFavoritesStore`; при виході очищує всі користувацькі стори.

### 5. Логіка галереї, пошуку та оптимістичних лайків

- **Галерея (`useArtworkStore`):** Зберігає `filters` та `sort`. Хелпер `formatGalleryParams` формує query-параметри. `GalleryPage` кешує завантажені роботи між переходами через `useRef` і довантажує сторінки кнопкою `"See More"`.
- **Masonry-сітка (`ArtworkGrid`):** Балансує 2 колонки (`< 1024px`) або 3 колонки (`>= 1024px`) за сумою пропорцій (`image_height / image_width`), не змінюючи порядок сортування від сервера.
- **Пошук (`SearchPage`):** Використовує `useDebounce(trimmedQuery, 300)` для `GET /artworks/search/?text=`. Прапорець `isSearchPending` (`isSearching || trimmedQuery !== debouncedQuery`) блокує миготіння порожнього стану, а очищення інпуту миттєво повертає `galleryArtworks`.
- **Оптимістичні лайки (`useFavoritesStore`):** Миттєво оновлює `favoriteArtworkIds: Set<number>` в UI та автоматично відкочує зміни при помилці `POST/DELETE /favorites/`.

### 6. Адаптивний дизайн та анімації

- **Брейкпоінти:** Mobile-first (`393px`) → `md:` (`768px`) → `lg:` (`1024px–1440px`) → `xl:` (`1280px`). Глобальні відступи задаються через `.px-global` та `.pt-header`.
- **Fluid Scaling:** Складні сітки (`ArtworkPage`, `ArtistProfilePage`) масштабуються між `1024px` та `1440px` за формулою `(Xpx / 1440) * 100 = Yvw` з обмежувачем `min()`, наприклад `lg:h-[min(52.08vw,750px)]`.
- **Анімації Hero:** Перший візит запускає каскад (`HeroLogo` → `HeroFrame` → `HeroSlider`) через `useAppStore`; повторні переходи трансформують `Logo` з хедера у `HeroLogo` через shared layout (`framer-motion`).

### 7. Робота з MSW-моками

- Вмикається через `VITE_USE_MOCKS=true` у `src/main.tsx`. Тестові email-префікси для входу наведені в `README.md`.
- У `src/mocks/data/artistsData.ts` описані всі 6 художників каталогу (`id: 10..15`). Параметр `?mock_error=500` для `/notifications/` симулює помилку сервера.
