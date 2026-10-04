[العربية](Readme.ar.md) · [简体中文](Readme.zh-CN.md) · [English](Readme.en.md) · [Deutsch](Readme.de.md) · [Русский](Readme.ru.md) · [Español](Readme.es.md) · [Türkçe](Readme.tr.md) · [Українська](Readme.uk.md)

# xinfc-gui-openwrt

لوحة OpenWrt LuCI (`الخدمات ← NFC`): كتابة بيانات Wi-Fi في شريحة NFC
لموجهات Xiaomi (مُختبر: AX3000T). قرّب الهاتف من الموجه — يظهر طلب الاتصال.

- 8 لغات واجهة، ملفا 2.4 / 5 غيغاهرتز + الوضع اليدوي
- تثبيت بأمر واحد، إزالة نظيفة، النسخة الأصلية محفوظة

## التثبيت

على الموجه:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

الإزالة — `sh xinfc_owrt_uninstall.sh`.

## أدلة خطوة بخطوة (العربية)

- [01-quickstart.md](01-quickstart.md) — التثبيت وأول كتابة
- [02-profiles.md](02-profiles.md) — ملفا 2.4 / 5 غيغاهرتز والوضع اليدوي
- [03-build.md](03-build.md) — البناء لمعماريات أخرى
- [04-troubleshoot.md](04-troubleshoot.md) — التشخيص
