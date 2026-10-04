[العربية](../ar/04-troubleshoot.md) · [简体中文](../zh-CN/04-troubleshoot.md) · [English](../en/04-troubleshoot.md) · [Deutsch](../de/04-troubleshoot.md) · [Русский](../ru/04-troubleshoot.md) · [Español](../es/04-troubleshoot.md) · [Türkçe](../tr/04-troubleshoot.md) · [Українська](../uk/04-troubleshoot.md)

# Диагностика

Быстрый сбор состояния (есть `check.sh`):

```sh
/usr/sbin/xinfc-wsc 2>&1 | head -2
ls /dev/i2c*
ubus -S call luci.xinfc getConfig
ubus -S call luci.xinfc getRadios | head -c 600; echo
ubus -S call luci.xinfc detectChip
ls -l /etc/xinfc/nfc_ndef_backup.bin
```

## Чип не находится

- `apk add i2c-tools`, затем `i2cdetect -y 0` (у AX3000T шина `0`, чип `0x57`).
- Апстрим предупреждает: чип периодически виснет, в инструмент вшиты
  ретраи — просто повторите запись.
- Убедитесь, что железо совпадает с проверенным (AX3000T + NT082C).
  Инструмент не проверяет ID чипа и может испортить чужой!

## Панели нет в Службах

Пункт зависит от исполняемого `/usr/sbin/xinfc-wsc` (см. menu.d).
Проверьте файлы панели, ACL и бэкенд:

```sh
ls -l /www/luci-static/resources/view/xinfc.js \
      /usr/share/luci/menu.d/luci-app-xinfc.json \
      /usr/share/rpcd/acl.d/luci-app-xinfc.json \
      /usr/libexec/rpcd/luci.xinfc
ubus -S call luci.xinfc getRadios
```

## Бэкап

Первый запуск пишет `/etc/xinfc/nfc_ndef_backup.bin` (только если файла
еще нет). Апстрим честно предупреждает: бэкапа может не хватить для
восстановления при сбое. Первый бэкап — самый ценный, храните отдельно.

---
**← Назад:** [03-build](03-build.md) · [Оглавление](Readme.ru.md)
