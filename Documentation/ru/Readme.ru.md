[العربية](Readme.ar.md) · [简体中文](Readme.zh-CN.md) · [English](Readme.en.md) · [Deutsch](Readme.de.md) · [Русский](Readme.ru.md) · [Español](Readme.es.md) · [Türkçe](Readme.tr.md) · [Українська](Readme.uk.md)

# xinfc-gui-openwrt

Панель OpenWrt `Службы -> NFC`: запись Wi-Fi данных в NFC-чип Xiaomi-роутеров
(проверено: AX3000T). Поднесли телефон к роутеру — он предложил подключиться.

- 8 языков интерфейса, профили 2.4 / 5 ГГц + ручной режим
- Установка одной командой, аккуратный снос, заводской бэкап чипа в целости

## Установка

На роутере:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Снос — `sh xinfc_owrt_uninstall.sh`.

## Пошаговые доки (на русском)

- [01-quickstart.md](01-quickstart.md) — установка и первая запись
- [02-profiles.md](02-profiles.md) — профили 2.4 / 5 ГГц и ручной режим
- [03-build.md](03-build.md) — сборка под другие архитектуры
- [04-troubleshoot.md](04-troubleshoot.md) — диагностика

## Состав

```
xinfc_owrt_install.sh / xinfc_owrt_uninstall.sh / check.sh
bin/xinfc-wsc-aarch64     # готовый бинарь
luci-app-xinfc/           # пакет LuCI: Службы -> NFC
Documentation/<lang>/     # доки по языкам
```
