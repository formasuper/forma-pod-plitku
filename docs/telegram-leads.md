# Настройка заявок через Telegram

Форма на сайте отправляет данные POST-запросом в `/api/lead`. Этот обработчик работает на serverless-хостинге, например Vercel. На GitHub Pages API-файлы не выполняются, поэтому для рабочей отправки заявок сайт нужно опубликовать на Vercel или подключить внешний URL обработчика через `window.FORMASUPER_LEAD_ENDPOINT`.

## 1. Создать Telegram-бота

1. Откройте Telegram и найдите `@BotFather`.
2. Отправьте команду `/newbot`.
3. Укажите название бота и username, который заканчивается на `bot`.
4. Скопируйте токен вида `123456789:AA...`. Это значение для переменной `TELEGRAM_BOT_TOKEN`.

## 2. Получить chat id

1. Напишите любое сообщение созданному боту или добавьте бота в нужный чат.
2. Откройте в браузере адрес `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates`, заменив `<TELEGRAM_BOT_TOKEN>` на токен.
3. Найдите поле `chat.id`. Это значение для переменной `TELEGRAM_CHAT_ID`.

Если бот добавлен в группу, сначала отправьте сообщение в группу, затем откройте `getUpdates`. У групповой переписки `chat.id` обычно отрицательный.

## 3. Настроить Vercel

1. Создайте проект в Vercel из репозитория `formasuper/forma-pod-plitku`.
2. В настройках проекта откройте `Settings -> Environment Variables`.
3. Добавьте переменные:
   - `TELEGRAM_BOT_TOKEN` - токен от BotFather.
   - `TELEGRAM_CHAT_ID` - id чата или личной переписки.
   - `ALLOWED_ORIGIN` - `https://формаподплитку.рф` при необходимости ограничить отправку только с домена сайта.
4. Запустите новый Deploy.

## 4. Домен

Самый простой вариант: перенести домен `формаподплитку.рф` с GitHub Pages на Vercel. Тогда форма будет отправлять заявки на тот же домен через `/api/lead`.

Если сайт остается на GitHub Pages, нужно будет указать полный адрес Vercel-обработчика в `window.FORMASUPER_LEAD_ENDPOINT` или заменить endpoint в `assets/lead.js` на URL вида `https://<project>.vercel.app/api/lead`.
