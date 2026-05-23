# Lending Presentation

Лендинг-презентация frontend-разработчика с формой обратной связи.

## Стек

| Часть | Технологии |
|-------|------------|
| Frontend | React 19, TypeScript, HTML, CSS, Vite |
| Backend | Node.js, Express, TypeScript, Nodemailer |
| Инструменты | ESLint, Prettier |

## Структура проекта

```
frontend/          — React-приложение (секции лендинга, форма)
  src/
    components/    — UI-компоненты
    api/           — запросы к backend
    styles/        — стили
backend/           — API для формы
  src/
    routes/        — POST /api/contact
    services/      — отправка email
    utils/         — валидация
```

## Как запустить

### 1. Установка зависимостей

```bash
npm run install:all
```

### 2. Настройка backend

```bash
cp backend/.env.example backend/.env
```

Заполните `backend/.env`:

- **Прод / реальный SMTP** — укажите `SMTP_*` и `OWNER_EMAIL` (Mailtrap, Yandex, Gmail и т.д.).
- **Локальный тест без почты** — раскомментируйте `USE_ETHEREAL=true` и укажите `OWNER_EMAIL`. Письма не уйдут на реальный ящик; в консоли backend появятся preview-ссылки Ethereal.

### 3. Запуск (два терминала)

```bash
npm run dev:backend
```

```bash
npm run dev:frontend
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:3001  
- Проверка API: http://localhost:3001/api/health  

Запросы с фронта на `/api/*` проксируются через Vite на backend.

### Сборка

```bash
cd frontend && npm run build
cd backend && npm run build
```

## Как реализована форма

**Frontend (`ContactForm`):**

- Поля: имя, телефон, email, комментарий.
- Клиентская валидация перед отправкой.
- Состояния UI: loading, success, error.
- Подсветка полей при ошибках (клиент и сервер).
- `fetch` → `POST /api/contact` (JSON).

**Backend (`POST /api/contact`):**

- Повторная валидация на сервере.
- Отправка двух писем через Nodemailer:
  1. владельцу (`OWNER_EMAIL`) — заявка с сайта;
  2. пользователю — копия сообщения.
- Ответы API:
  - `200` + `{ ok: true, message }` — успех;
  - `400` + `{ ok: false, errors }` — ошибки полей;
  - `500` / `503` — ошибка отправки или не настроен SMTP.

## AI-инструменты

- **Cursor** (AI-ассистент в IDE) — помощь при разработке отдельных частей проекта.

## Что делалось с помощью ИИ

- Часть **CSS**: тёмная тема с розовым акцентом, адаптив, hover-анимация карточек, правки под мобильные экраны.
- **Backend** частично: каркас Express API, маршрут формы, сервис отправки писем (Nodemailer), пример `.env.example`.
- Подсказки по структуре файлов и типизации TypeScript.

## Что делалось вручную

- **Запуск и настройка проекта**: установка зависимостей, `.env`, запуск frontend и backend, проверка работы формы.
- **React**: компоненты секций, логика формы (`useState`, обработчики), интеграция с API.
- **Контент лендинга** — заготовки под заполнение (обо мне, кейсы, контакты).
- **Правки после AI**: откат лишней многоцветной палитры, доработка обработки ошибок на фронте, финальная проверка адаптива и API.
