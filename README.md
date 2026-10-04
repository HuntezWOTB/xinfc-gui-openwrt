# xinfc-gui-openwrt

OpenWrt LuCI panel (`Services → NFC`) for writing Wi-Fi credentials to the
NFC chip of Xiaomi routers. Tap the phone to the router — it offers to connect.

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

## Documentation

| | |
|---|---|
| العربية | [Documentation/ar/](Documentation/ar/) |
| 简体中文 | [Documentation/zh-CN/](Documentation/zh-CN/) |
| English | [Documentation/en/](Documentation/en/) |
| Deutsch | [Documentation/de/](Documentation/de/) |
| Русский | [Documentation/ru/](Documentation/ru/) |
| Español | [Documentation/es/](Documentation/es/) |
| Türkçe | [Documentation/tr/](Documentation/tr/) |
| Українська | [Documentation/uk/](Documentation/uk/) |

## Layout

```
xinfc_owrt_install.sh     # one-command setup
xinfc_owrt_uninstall.sh   # careful removal (chip backup untouched)
check.sh                  # diagnostics
bin/xinfc-wsc-aarch64     # ready binary (AX3000T and alike)
luci-app-xinfc/           # LuCI package: Services -> NFC
Documentation/<lang>/     # full docs per language
```

Tool upstream: https://github.com/Caian/xinfc (GPL-2.0)
