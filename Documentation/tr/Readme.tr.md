[العربية](Readme.ar.md) · [简体中文](Readme.zh-CN.md) · [English](Readme.en.md) · [Deutsch](Readme.de.md) · [Русский](Readme.ru.md) · [Español](Readme.es.md) · [Türkçe](Readme.tr.md) · [Українська](Readme.uk.md)

# xinfc-gui-openwrt

OpenWrt LuCI paneli (`Servisler → NFC`): Xiaomi yönlendiricilerin NFC
çipine Wi-Fi bilgisi yazar (test edilen: AX3000T). Telefonu yönlendiriciye
yaklaştırın, bağlantı isteği gelir.

- 8 arayüz dili, 2.4 / 5 GHz profilleri + manuel mod
- Tek komutla kurulum, dikkatli kaldırma, fabrika yedeği korunur

## Kurulum

Yönlendiricide:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Kaldırma — `sh xinfc_owrt_uninstall.sh`.

## Adım adım belgeler (Türkçe)

- [01-quickstart.md](01-quickstart.md) — kurulum ve ilk yazma
- [02-profiles.md](02-profiles.md) — 2.4 / 5 GHz ve manuel mod
- [03-build.md](03-build.md) — başka mimariler için derleme
- [04-troubleshoot.md](04-troubleshoot.md) — sorun giderme
