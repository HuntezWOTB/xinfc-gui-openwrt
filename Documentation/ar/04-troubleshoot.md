[العربية](../ar/04-troubleshoot.md) · [简体中文](../zh-CN/04-troubleshoot.md) · [English](../en/04-troubleshoot.md) · [Deutsch](../de/04-troubleshoot.md) · [Русский](../ru/04-troubleshoot.md) · [Español](../es/04-troubleshoot.md) · [Türkçe](../tr/04-troubleshoot.md) · [Українська](../uk/04-troubleshoot.md)

# التشخيص

جمع سريع للحالة (يوجد `check.sh` أيضًا):

```sh
/usr/sbin/xinfc-wsc 2>&1 | head -2
ls /dev/i2c*
ubus -S call luci.xinfc getConfig
ubus -S call luci.xinfc getRadios | head -c 600; echo
ubus -S call luci.xinfc detectChip
ls -l /etc/xinfc/nfc_ndef_backup.bin
```

## الشريحة غير موجودة

- `apk add i2c-tools` ثم `i2cdetect -y 0` (في AX3000T الناقل `0` والشريحة `0x57`).
- يحذر المصدر: الشريحة تعلق أحيانًا والأداة فيها إعادة محاولة —
  كرر الكتابة.
- تأكد أن العتاد مطابق للمُختبر (AX3000T + NT082C). الأداة لا تتحقق
  من ID الشريحة وقد تتلف غيرها!

## لا لوحة في الخدمات

المدخل يعتمد على تنفيذ `/usr/sbin/xinfc-wsc` (انظر menu.d).
تحقق من الملفات وACL والخلفية:

```sh
ls -l /www/luci-static/resources/view/xinfc.js \
      /usr/share/luci/menu.d/luci-app-xinfc.json \
      /usr/share/rpcd/acl.d/luci-app-xinfc.json \
      /usr/libexec/rpcd/luci.xinfc
ubus -S call luci.xinfc getRadios
```

## النسخة الاحتياطية

أول تشغيل يكتب `/etc/xinfc/nfc_ndef_backup.bin` (فقط إن غاب).
يحذر المصدر بصدق: قد لا تكفي للاسترداد. أول نسخة هي الأثمن —
احفظها منفصلة.
