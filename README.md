# Art Project — Frontend

Клієнтська частина проєкту (користувацький інтерфейс, стан застосунку, взаємодія з API).

---

## 🏗 Архітектура проєкту

Проєкт розділений на два незалежні репозиторії:
* **Frontend:** [Клієнтська частина проєкту](https://github.com/tavorotuk/art-project-frontend)
* **Backend:** [Серверна частина проєкту](https://github.com/tavorotuk/art-project-backend)

Детальний опис структури папок та архітектурних домовленостей знаходиться у файлі [`DEV_NOTES.md`](./DEV_NOTES.md).

---

## 🛠 Стек технологій

* **Фреймворк та збірка:** React, Vite
* **Стилізація:** Tailwind CSS
* **Глобальний стан:** Zustand
* **Маршрутизація:** React Router DOM
* **HTTP-клієнт:** Axios

---

## 🌿 Git Flow

* **`develop`** — **основна гілка за замовчуванням (Default branch)**. Уся розробка ведеться тут.
* Нові завдання розробляються у фіче-гілках виду `feature/<назва-фічі>` та зливаються через Pull Request у гілку `develop` (наприклад: `feature/header-ui`, `feature/cart-modal`).
* **`main`** — стабільна релізна гілка для продакшену.

---

## ⚙️ Початок роботи

1. Склонувати репозиторій та переконатися, що ви на гілці `develop`:
   ```bash
   git clone <frontend-repo-url>
   git checkout develop
   ```

2. Встановити залежності:
   ```bash
   npm install
   ```

3. Запустити локальний сервер для розробки:
   ```bash
   npm run dev
   ```