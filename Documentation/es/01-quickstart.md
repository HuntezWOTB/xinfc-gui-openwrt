[العربية](../ar/01-quickstart.md) · [简体中文](../zh-CN/01-quickstart.md) · [English](../en/01-quickstart.md) · [Deutsch](../de/01-quickstart.md) · [Русский](../ru/01-quickstart.md) · [Español](../es/01-quickstart.md) · [Türkçe](../tr/01-quickstart.md) · [Українська](../uk/01-quickstart.md)

# Inicio rápido: instalación y primera escritura

Tiempo: ~10 min. Necesitas: router con chip NFC (probado: AX3000T),
teléfono con NFC, SSH.

## 1. Instalación en un comando

En el router:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Se instala `xinfc-wsc`, `i2c-tools`, el panel y el backend. Sin GitHub
en el router: pasa el árbol desde el PC con `tar` por SSH
(`scp -r` falla sin `sftp-server` en el firmware).

¿Otra arquitectura (solo aarch64 incluido)? Compila `xinfc-wsc` desde
https://github.com/Caian/xinfc y repite con
`BIN_FILE=/ruta/a/xinfc-wsc sh xinfc_owrt_install.sh`.

## 2. Panel

Sal y entra en LuCI: `Servicios → NFC`. Idioma arriba a la derecha
(8 idiomas: AR, ZH-CN, EN, DE, RU, ES, TR, UK).

## 3. Buscar el chip

Botón de detección. Esperado: bus `0`, dirección `0x57`. Si vacío —
`apk add i2c-tools`, luego `i2cdetect -y 0` a mano (ver `04-troubleshoot.md`).

## 4. Primera escritura

1. Perfil `2,4 GHz`, elige tu interfaz.
2. `Escribir en el chip`, confirma.
3. Acerca el teléfono al router — aparece la solicitud de conexión.

La primera escritura crea `/etc/xinfc/nfc_ndef_backup.bin` — cópialo
del router a un lugar seguro. Son los datos originales del chip.
