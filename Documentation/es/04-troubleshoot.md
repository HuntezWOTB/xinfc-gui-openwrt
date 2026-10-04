[العربية](../ar/04-troubleshoot.md) · [简体中文](../zh-CN/04-troubleshoot.md) · [English](../en/04-troubleshoot.md) · [Deutsch](../de/04-troubleshoot.md) · [Русский](../ru/04-troubleshoot.md) · [Español](../es/04-troubleshoot.md) · [Türkçe](../tr/04-troubleshoot.md) · [Українська](../uk/04-troubleshoot.md)

# Diagnóstico

Estado rápido (también `check.sh`):

```sh
/usr/sbin/xinfc-wsc 2>&1 | head -2
ls /dev/i2c*
ubus -S call luci.xinfc getConfig
ubus -S call luci.xinfc getRadios | head -c 600; echo
ubus -S call luci.xinfc detectChip
ls -l /etc/xinfc/nfc_ndef_backup.bin
```

## Chip no encontrado

- `apk add i2c-tools`, luego `i2cdetect -y 0` (AX3000T: bus `0`, chip `0x57`).
- Upstream avisa: el chip se cuelga a veces, la herramienta lleva
  reintentos — repite la escritura.
- Que el hardware coincida con el probado (AX3000T + NT082C).
  ¡La herramienta no verifica el ID y puede dañar otro chip!

## Sin panel en Servicios

La entrada depende del ejecutable `/usr/sbin/xinfc-wsc` (ver menu.d).
Revisa archivos, ACL y backend:

```sh
ls -l /www/luci-static/resources/view/xinfc.js \
      /usr/share/luci/menu.d/luci-app-xinfc.json \
      /usr/share/rpcd/acl.d/luci-app-xinfc.json \
      /usr/libexec/rpcd/luci.xinfc
ubus -S call luci.xinfc getRadios
```

## Copia de seguridad

La primera ejecución escribe `/etc/xinfc/nfc_ndef_backup.bin` (solo si
no existe). Upstream advierte honestamente: puede no bastar para
recuperar. La primera copia es la más valiosa — guárdala aparte.

---
**← Anterior:** [03-build](03-build.md) · [Índice](Readme.es.md)
