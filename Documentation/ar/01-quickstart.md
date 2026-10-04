[العربية](../ar/01-quickstart.md) · [简体中文](../zh-CN/01-quickstart.md) · [English](../en/01-quickstart.md) · [Deutsch](../de/01-quickstart.md) · [Русский](../ru/01-quickstart.md) · [Español](../es/01-quickstart.md) · [Türkçe](../tr/01-quickstart.md) · [Українська](../uk/01-quickstart.md)

# البدء السريع: التثبيت وأول كتابة

الوقت: ~10 دقائق. تحتاج: موجهًا بشريحة NFC (مُختبر: AX3000T)، هاتفًا
بـ NFC للاختبار، SSH.

## 1. التثبيت بأمر واحد

على الموجه:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

يُثبَّت `xinfc-wsc` و`i2c-tools` واللوحة والخلفية. لا وصول إلى GitHub
من الموجه؟ انقل الشجرة من الحاسوب عبر `tar` بـ SSH (فشل `scp -r`
العادي لغياب `sftp-server` في النظام).

معمارية أخرى (المرفق aarch64 فقط)؟ ابنِ `xinfc-wsc` من
https://github.com/Caian/xinfc ثم كرر مع
`BIN_FILE=/path/to/xinfc-wsc sh xinfc_owrt_install.sh`.

## 2. اللوحة

اخرج وادخل إلى LuCI: `الخدمات ← NFC`. مبدّل اللغة أعلى اليمين
(8 لغات: AR وZH-CN وEN وDE وRU وES وTR وUK).

## 3. العثور على الشريحة

زر البحث. المتوقع: الناقل `0` والعنوان `0x57`. فارغ —
`apk add i2c-tools` ثم `i2cdetect -y 0` يدويًا (انظر `04-troubleshoot.md`).

## 4. أول كتابة

1. ملف `2.4 غيغاهرتز`، اختر واجهتك.
2. `الكتابة على الشريحة` ثم أكّد.
3. قرّب الهاتف من الموجه — يظهر طلب الاتصال.

أول كتابة تنشئ `/etc/xinfc/nfc_ndef_backup.bin` — انسخه من الموجه
إلى مكان آمن. هذه بيانات المصنع للشريحة.
