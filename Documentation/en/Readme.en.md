[العربية](Readme.ar.md) · [简体中文](Readme.zh-CN.md) · [English](Readme.en.md) · [Deutsch](Readme.de.md) · [Русский](Readme.ru.md) · [Español](Readme.es.md) · [Türkçe](Readme.tr.md) · [Українська](Readme.uk.md)

# xinfc-gui-openwrt

OpenWrt LuCI panel (`Services → NFC`) for writing Wi-Fi credentials to the
NFC chip of Xiaomi routers (tested: AX3000T). Tap the phone to the router —
it offers to connect.

- 8 UI languages, 2.4 / 5 GHz profiles + manual mode
- One-command install, careful uninstall, stock chip backup kept safe

## Install

On the router:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Uninstall: `sh xinfc_owrt_uninstall.sh`.

## Step-by-step docs (English)

- [01-quickstart.md](01-quickstart.md) — install and first write
- [02-profiles.md](02-profiles.md) — 2.4 / 5 GHz and manual mode
- [03-build.md](03-build.md) — building for other architectures
- [04-troubleshoot.md](04-troubleshoot.md) — troubleshooting

## Layout

```
xinfc_owrt_install.sh / xinfc_owrt_uninstall.sh / check.sh
bin/xinfc-wsc-aarch64     # ready binary
luci-app-xinfc/           # LuCI package: Services -> NFC
Documentation/<lang>/     # docs per language
```
