[العربية](../ar/04-troubleshoot.md) · [简体中文](../zh-CN/04-troubleshoot.md) · [English](../en/04-troubleshoot.md) · [Deutsch](../de/04-troubleshoot.md) · [Русский](../ru/04-troubleshoot.md) · [Español](../es/04-troubleshoot.md) · [Türkçe](../tr/04-troubleshoot.md) · [Українська](../uk/04-troubleshoot.md)

# Diagnose

Schnellstatus (auch `check.sh`):

```sh
/usr/sbin/xinfc-wsc 2>&1 | head -2
ls /dev/i2c*
ubus -S call luci.xinfc getConfig
ubus -S call luci.xinfc getRadios | head -c 600; echo
ubus -S call luci.xinfc detectChip
ls -l /etc/xinfc/nfc_ndef_backup.bin
```

## Chip nicht gefunden

- `apk add i2c-tools`, dann `i2cdetect -y 0` (AX3000T: Bus `0`, Chip `0x57`).
- Upstream warnt: der Chip hängt zeitweise, Retries sind eingebaut —
  Schreiben einfach wiederholen.
- Hardware muss der getesteten entsprechen (AX3000T + NT082C).
  Das Tool prüft keine Chip-ID und kann einen anderen beschädigen!

## Kein Panel unter Dienste

Der Eintrag hängt am ausführbaren `/usr/sbin/xinfc-wsc` (siehe menu.d).
Dateien, ACL und Backend prüfen:

```sh
ls -l /www/luci-static/resources/view/xinfc.js \
      /usr/share/luci/menu.d/luci-app-xinfc.json \
      /usr/share/rpcd/acl.d/luci-app-xinfc.json \
      /usr/libexec/rpcd/luci.xinfc
ubus -S call luci.xinfc getRadios
```

## Backup

Der erste Lauf schreibt `/etc/xinfc/nfc_ndef_backup.bin` (nur falls fehlend).
Upstream warnt ehrlich: Es könnte zur Wiederherstellung nicht reichen.
Das erste Backup ist das wertvollste — separat aufbewahren.
