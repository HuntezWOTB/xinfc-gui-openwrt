[العربية](../ar/01-quickstart.md) · [简体中文](../zh-CN/01-quickstart.md) · [English](../en/01-quickstart.md) · [Deutsch](../de/01-quickstart.md) · [Русский](../ru/01-quickstart.md) · [Español](../es/01-quickstart.md) · [Türkçe](../tr/01-quickstart.md) · [Українська](../uk/01-quickstart.md)

# Быстрый старт: установка и первая запись

Время: ~10 минут. Нужны: роутер с NFC-чипом (проверен AX3000T), телефон
с NFC для проверки, SSH.

## 1. Установка одной командой

На роутере:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Поставится `xinfc-wsc`, `i2c-tools`, панель и бэкенд. В конце скрипт сам
покажет версию инструмента и конфиг бэкенда.

Нет выхода на GitHub с роутера? Передайте дерево с ПК через `tar` по SSH
(обычный `scp -r` падает без `sftp-server` в прошивке).

Нет готового бинаря под вашу архитектуру (в комплекте только aarch64)?
Соберите `xinfc-wsc` из https://github.com/Caian/xinfc и повторите с
`BIN_FILE=/путь/к/xinfc-wsc sh xinfc_owrt_install.sh`.

## 2. Панель

Разлогиньтесь/залогиньтесь в LuCI: `Службы -> NFC`. Переключатель языка
справа вверху (8 языков: AR, ZH-CN, EN, DE, RU, ES, TR, UK).

## 3. Проверка чипа

Кнопка `Найти чип`. Ожидаем шину `0` и адрес `0x57`. Если пусто —
`apk add i2c-tools`, затем `i2cdetect -y 0` руками (см. `04-troubleshoot.md`).

## 4. Первая запись

1. Профиль `2.4 ГГц`, выберите свой интерфейс.
2. `Записать в чип`, подтвердите.
3. Поднесите телефон к роутеру — появится предложение подключиться.

Первая запись создаст `/etc/xinfc/nfc_ndef_backup.bin` — скопируйте его
с роутера в надежное место. Это заводские данные чипа.

---
**Далее:** [02-profiles →](02-profiles.md) · [Оглавление](Readme.ru.md)
