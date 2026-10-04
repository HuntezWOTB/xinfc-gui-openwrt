[العربية](../ar/04-troubleshoot.md) · [简体中文](../zh-CN/04-troubleshoot.md) · [English](../en/04-troubleshoot.md) · [Deutsch](../de/04-troubleshoot.md) · [Русский](../ru/04-troubleshoot.md) · [Español](../es/04-troubleshoot.md) · [Türkçe](../tr/04-troubleshoot.md) · [Українська](../uk/04-troubleshoot.md)

# Sorun giderme

Hızlı durum (`check.sh` de var):

```sh
/usr/sbin/xinfc-wsc 2>&1 | head -2
ls /dev/i2c*
ubus -S call luci.xinfc getConfig
ubus -S call luci.xinfc getRadios | head -c 600; echo
ubus -S call luci.xinfc detectChip
ls -l /etc/xinfc/nfc_ndef_backup.bin
```

## Çip bulunamadı

- `apk add i2c-tools`, sonra `i2cdetect -y 0` (AX3000T: yol `0`, çip `0x57`).
- Yukarı akış uyarıyor: çip zaman zaman takılır, araçta yeniden deneme var —
  yazmayı tekrarlayın.
- Donanımın test edilenle eşleştiğini doğrulayın (AX3000T + NT082C).
  Araç çip ID kontrolü yapmaz, başkasını bozabilir!

## Servislerde panel yok

Girdi, çalıştırılabilir `/usr/sbin/xinfc-wsc` dosyasına bağlıdır (bkz. menu.d).
Dosyaları, ACL ve arka ucu kontrol edin:

```sh
ls -l /www/luci-static/resources/view/xinfc.js \
      /usr/share/luci/menu.d/luci-app-xinfc.json \
      /usr/share/rpcd/acl.d/luci-app-xinfc.json \
      /usr/libexec/rpcd/luci.xinfc
ubus -S call luci.xinfc getRadios
```

## Yedek

İlk çalıştırma `/etc/xinfc/nfc_ndef_backup.bin` yazar (yoksa). Yukarı akış
dürüstçe uyarıyor: kurtarmaya yetmeyebilir. İlk yedek en değerlisidir —
ayrı saklayın.

---
**← Önceki:** [03-build](03-build.md) · [İçindekiler](Readme.tr.md)
