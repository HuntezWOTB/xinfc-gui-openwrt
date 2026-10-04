[العربية](Readme.ar.md) · [简体中文](Readme.zh-CN.md) · [English](Readme.en.md) · [Deutsch](Readme.de.md) · [Русский](Readme.ru.md) · [Español](Readme.es.md) · [Türkçe](Readme.tr.md) · [Українська](Readme.uk.md)

# xinfc-gui-openwrt

OpenWrt-LuCI-Panel (`Dienste → NFC`): WLAN-Daten auf den NFC-Chip von
Xiaomi-Routern schreiben (getestet: AX3000T). Handy an den Router halten —
Verbindungsabfrage erscheint.

- 8 UI-Sprachen, 2,4-/5-GHz-Profile + manueller Modus
- Installation in einem Befehl, saubere Deinstallation, Werks-Backup bleibt

## Installation

Auf dem Router:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Deinstallation — `sh xinfc_owrt_uninstall.sh`.

## Schritt-für-Schritt-Docs (deutsch)

- [01-quickstart.md](01-quickstart.md) — Installation und erster Schreibvorgang
- [02-profiles.md](02-profiles.md) — 2,4-/5-GHz-Profile und manueller Modus
- [03-build.md](03-build.md) — Bauen für andere Architekturen
- [04-troubleshoot.md](04-troubleshoot.md) — Diagnose
