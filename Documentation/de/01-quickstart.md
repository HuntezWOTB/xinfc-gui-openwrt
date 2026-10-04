[العربية](../ar/01-quickstart.md) · [简体中文](../zh-CN/01-quickstart.md) · [English](../en/01-quickstart.md) · [Deutsch](../de/01-quickstart.md) · [Русский](../ru/01-quickstart.md) · [Español](../es/01-quickstart.md) · [Türkçe](../tr/01-quickstart.md) · [Українська](../uk/01-quickstart.md)

# Schnellstart: Installation und erster Schreibvorgang

Zeit: ~10 Min. Nötig: Router mit NFC-Chip (getestet: AX3000T), NFC-Handy
zum Testen, SSH.

## 1. Installation in einem Befehl

Auf dem Router:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Installiert `xinfc-wsc`, `i2c-tools`, Panel und Backend. Kein GitHub-Zugang
vom Router? Baum per `tar` über SSH vom PC übertragen (normales `scp -r`
scheitert ohne `sftp-server` in der Firmware).

Andere Architektur (nur aarch64 dabei)? `xinfc-wsc` aus
https://github.com/Caian/xinfc bauen und mit
`BIN_FILE=/pfad/zu/xinfc-wsc sh xinfc_owrt_install.sh` wiederholen.

## 2. Panel

In LuCI ab-/anmelden: `Dienste → NFC`. Sprache oben rechts
(8 Sprachen: AR, ZH-CN, EN, DE, RU, ES, TR, UK).

## 3. Chip suchen

Button `Chip suchen`. Erwartet: Bus `0`, Adresse `0x57`. Leer —
`apk add i2c-tools`, dann `i2cdetect -y 0` von Hand (siehe `04-troubleshoot.md`).

## 4. Erster Schreibvorgang

1. Profil `2,4 GHz`, eigenes Interface wählen.
2. `Auf Chip schreiben`, bestätigen.
3. Handy an den Router halten — Verbindungsabfrage erscheint.

Der erste Schreibvorgang erstellt `/etc/xinfc/nfc_ndef_backup.bin` —
vom Router an einen sicheren Ort kopieren. Das sind die Werksdaten des Chips.
