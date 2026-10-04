[العربية](../ar/04-troubleshoot.md) · [简体中文](../zh-CN/04-troubleshoot.md) · [English](../en/04-troubleshoot.md) · [Deutsch](../de/04-troubleshoot.md) · [Русский](../ru/04-troubleshoot.md) · [Español](../es/04-troubleshoot.md) · [Türkçe](../tr/04-troubleshoot.md) · [Українська](../uk/04-troubleshoot.md)

# Troubleshooting

Fast state dump (`check.sh` exists too):

```sh
/usr/sbin/xinfc-wsc 2>&1 | head -2
ls /dev/i2c*
ubus -S call luci.xinfc getConfig
ubus -S call luci.xinfc getRadios | head -c 600; echo
ubus -S call luci.xinfc detectChip
ls -l /etc/xinfc/nfc_ndef_backup.bin
```

## Chip not found

- `apk add i2c-tools`, then `i2cdetect -y 0` (AX3000T: bus `0`, chip `0x57`).
- Upstream warns the chip hangs at times; retries are built into the tool —
  just write again.
- Make sure the hardware matches the tested one (AX3000T + NT082C).
  The tool does not check chip ID and may damage a different one!

## No panel under Services

The entry depends on executable `/usr/sbin/xinfc-wsc` (see menu.d).
Check panel files, ACL and backend:

```sh
ls -l /www/luci-static/resources/view/xinfc.js \
      /usr/share/luci/menu.d/luci-app-xinfc.json \
      /usr/share/rpcd/acl.d/luci-app-xinfc.json \
      /usr/libexec/rpcd/luci.xinfc
ubus -S call luci.xinfc getRadios
```

## Backup

The first run writes `/etc/xinfc/nfc_ndef_backup.bin` (only if absent).
Upstream honestly warns the backup may be insufficient for recovery.
The first backup is the most valuable — store it separately.
