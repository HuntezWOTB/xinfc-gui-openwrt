[العربية](../ar/01-quickstart.md) · [简体中文](../zh-CN/01-quickstart.md) · [English](../en/01-quickstart.md) · [Deutsch](../de/01-quickstart.md) · [Русский](../ru/01-quickstart.md) · [Español](../es/01-quickstart.md) · [Türkçe](../tr/01-quickstart.md) · [Українська](../uk/01-quickstart.md)

# Швидкий старт: встановлення і перший запис

Час: ~10 хв. Треба: роутер з NFC-чипом (перевірено AX3000T), телефон
з NFC для перевірки, SSH.

## 1. Встановлення однією командою

На роутері:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Встановиться `xinfc-wsc`, `i2c-tools`, панель і бекенд. Немає виходу
на GitHub з роутера? Передайте дерево з ПК через `tar` по SSH
(звичайний `scp -r` падає без `sftp-server` у прошивці).

Інша архітектура (в комплекті лише aarch64)? Зберіть `xinfc-wsc`
з https://github.com/Caian/xinfc і повторіть з
`BIN_FILE=/path/to/xinfc-wsc sh xinfc_owrt_install.sh`.

## 2. Панель

Розлогіньтесь/залогіньтесь у LuCI: `Служби → NFC`. Перемикач мови
вгорі праворуч (8 мов: AR, ZH-CN, EN, DE, RU, ES, TR, UK).

## 3. Перевірка чипа

Кнопка пошуку. Очікуємо шину `0` й адресу `0x57`. Порожньо —
`apk add i2c-tools`, потім `i2cdetect -y 0` вручну (див. `04-troubleshoot.md`).

## 4. Перший запис

1. Профіль `2,4 ГГц`, оберіть свій інтерфейс.
2. `Записати в чип`, підтвердьте.
3. Піднесіть телефон до роутера — з’явиться запит на підключення.

Перший запис створить `/etc/xinfc/nfc_ndef_backup.bin` — скопіюйте його
з роутера у безпечне місце. Це заводські дані чипа.
