[العربية](Readme.ar.md) · [简体中文](Readme.zh-CN.md) · [English](Readme.en.md) · [Deutsch](Readme.de.md) · [Русский](Readme.ru.md) · [Español](Readme.es.md) · [Türkçe](Readme.tr.md) · [Українська](Readme.uk.md)

# xinfc-gui-openwrt

Панель OpenWrt `Служби → NFC`: запис Wi-Fi даних у NFC-чип Xiaomi-роутерів
(перевірено: AX3000T). Піднесіть телефон до роутера — з’явиться запит
на підключення.

- 8 мов інтерфейсу, профілі 2,4 / 5 ГГц + ручний режим
- Встановлення однією командою, акуратне знесення, заводський бекап у цілості

## Встановлення

На роутері:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Знесення — `sh xinfc_owrt_uninstall.sh`.

## Покрокові доки (українською)

- [01-quickstart.md](01-quickstart.md) — встановлення і перший запис
- [02-profiles.md](02-profiles.md) — профілі 2,4 / 5 ГГц і ручний режим
- [03-build.md](03-build.md) — збірка під інші архітектури
- [04-troubleshoot.md](04-troubleshoot.md) — діагностика
