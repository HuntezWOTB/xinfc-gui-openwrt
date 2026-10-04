[العربية](../ar/01-quickstart.md) · [简体中文](../zh-CN/01-quickstart.md) · [English](../en/01-quickstart.md) · [Deutsch](../de/01-quickstart.md) · [Русский](../ru/01-quickstart.md) · [Español](../es/01-quickstart.md) · [Türkçe](../tr/01-quickstart.md) · [Українська](../uk/01-quickstart.md)

# Hızlı başlangıç: kurulum ve ilk yazma

Süre: ~10 dk. Gerekli: NFC çipli yönlendirici (test edilen: AX3000T),
NFC'li telefon, SSH.

## 1. Tek komutla kurulum

Yönlendiricide:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

`xinfc-wsc`, `i2c-tools`, panel ve arka uç kurulur. Yönlendiricide GitHub
yoksa ağaç `tar` ile SSH üzerinden PC'den aktarılır (`sftp-server`
yokken `scp -r` başarısız olur).

Başka mimari (sadece aarch64 dahil)? https://github.com/Caian/xinfc
adresinden `xinfc-wsc` derleyin ve
`BIN_FILE=/path/to/xinfc-wsc sh xinfc_owrt_install.sh` ile tekrarlayın.

## 2. Panel

LuCI'dan çıkıp girin: `Servisler → NFC`. Sağ üstte dil seçimi
(8 dil: AR, ZH-CN, EN, DE, RU, ES, TR, UK).

## 3. Çipi bulma

Bul düğmesi. Beklenen: yol `0`, adres `0x57`. Boşsa —
`apk add i2c-tools`, sonra elle `i2cdetect -y 0` (bkz. `04-troubleshoot.md`).

## 4. İlk yazma

1. `2.4 GHz` profili, kendi arayüzünüz.
2. Çipe yaz, onaylayın.
3. Telefonu yönlendiriciye yaklaştırın — bağlantı isteği gelir.

İlk yazma `/etc/xinfc/nfc_ndef_backup.bin` oluşturur — yönlendiriciden
güvenli bir yere kopyalayın. Bu, çipin fabrika verisidir.

---
**Sonraki:** [02-profiles →](02-profiles.md) · [İçindekiler](Readme.tr.md)
