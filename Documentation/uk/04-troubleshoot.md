[العربية](../ar/04-troubleshoot.md) · [简体中文](../zh-CN/04-troubleshoot.md) · [English](../en/04-troubleshoot.md) · [Deutsch](../de/04-troubleshoot.md) · [Русский](../ru/04-troubleshoot.md) · [Español](../es/04-troubleshoot.md) · [Türkçe](../tr/04-troubleshoot.md) · [Українська](../uk/04-troubleshoot.md)

# Діагностика

Швидкий збір стану (є `check.sh`):

```sh
/usr/sbin/xinfc-wsc 2>&1 | head -2
ls /dev/i2c*
ubus -S call luci.xinfc getConfig
ubus -S call luci.xinfc getRadios | head -c 600; echo
ubus -S call luci.xinfc detectChip
ls -l /etc/xinfc/nfc_ndef_backup.bin
```

## Чип не знаходиться

- `apk add i2c-tools`, потім `i2cdetect -y 0` (в AX3000T шина `0`, чип `0x57`).
- Апстрим попереджає: чип періодично висить, в інструмент вшито
  ретраї — просто повторіть запис.
- Переконайтеся, що залізо збігається з перевіреним (AX3000T + NT082C).
  Інструмент не перевіряє ID чипа й може зіпсувати чужий!

## Панелі немає у Службах

Пункт залежить від виконуваного `/usr/sbin/xinfc-wsc` (див. menu.d).
Перевірте файли панелі, ACL і бекенд:

```sh
ls -l /www/luci-static/resources/view/xinfc.js \
      /usr/share/luci/menu.d/luci-app-xinfc.json \
      /usr/share/rpcd/acl.d/luci-app-xinfc.json \
      /usr/libexec/rpcd/luci.xinfc
ubus -S call luci.xinfc getRadios
```

## Бекап

Перший запуск пише `/etc/xinfc/nfc_ndef_backup.bin` (лише якщо файла
ще немає). Апстрим чесно попереджає: бекапа може не вистачити для
відновлення при збої. Перший бекап — найцінніший, зберігайте окремо.
