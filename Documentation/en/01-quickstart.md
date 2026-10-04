[العربية](../ar/01-quickstart.md) · [简体中文](../zh-CN/01-quickstart.md) · [English](../en/01-quickstart.md) · [Deutsch](../de/01-quickstart.md) · [Русский](../ru/01-quickstart.md) · [Español](../es/01-quickstart.md) · [Türkçe](../tr/01-quickstart.md) · [Українська](../uk/01-quickstart.md)

# Quickstart: from stock firmware to the first write

Time: ~10 min. You need: an NFC-capable router (tested: AX3000T), an NFC
phone for testing, SSH.

## 1. One-command install

On the router:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

This installs `xinfc-wsc`, `i2c-tools`, the panel and the backend. At the end
the script prints the tool version and the backend config.

No GitHub access from the router? Transfer the tree from a PC over SSH
with `tar` (plain `scp -r` fails without `sftp-server` on the firmware).

No ready binary for your arch (only aarch64 bundled)? Build `xinfc-wsc`
from https://github.com/Caian/xinfc and rerun with
`BIN_FILE=/path/to/xinfc-wsc sh xinfc_owrt_install.sh`.

## 2. Panel

Log out/in to LuCI: `Services → NFC`. RU/EN… switch is top-right
(8 languages: AR, ZH-CN, EN, DE, RU, ES, TR, UK).

## 3. Find the chip

`Detect chip` button. Expect bus `0`, address `0x57`. If empty —
`apk add i2c-tools`, then `i2cdetect -y 0` by hand (see `04-troubleshoot.md`).

## 4. First write

1. Profile `2.4 GHz`, pick your network interface.
2. `Write to chip`, confirm.
3. Tap the phone to the router — connect prompt appears.

The first write creates `/etc/xinfc/nfc_ndef_backup.bin` — copy it off
the router to a safe place. It holds the stock chip data.

---
**Next:** [02-profiles →](02-profiles.md) · [Index](Readme.en.md)
