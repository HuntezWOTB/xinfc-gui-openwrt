[العربية](../ar/02-profiles.md) · [简体中文](../zh-CN/02-profiles.md) · [English](../en/02-profiles.md) · [Deutsch](../de/02-profiles.md) · [Русский](../ru/02-profiles.md) · [Español](../es/02-profiles.md) · [Türkçe](../tr/02-profiles.md) · [Українська](../uk/02-profiles.md)

# Profiller: 2.4 / 5 GHz ve manuel mod

Çip tek kayıt tutar, yani profil *ne yazılacağının* seçimidir. Bant başına
farklı SSID ve parola desteklenir: her profil ayarlardaki kendi arayüzünü okur.

## Otomatik 2.4 / 5 GHz profilleri

Panel `wifi-iface` öğelerini radyoya göre gruplar (`band`, yoksa
`hwmode`/kanal: 1–14 = 2.4 GHz, üstü = 5 GHz). Arayüz seçince SSID ve
şifreleme otomatik dolar. Ayarlardaki parola **tarayıcıya asla ulaşmaz** —
arka uç yazma anında okur.

Şifreleme `none` değilken parolasız arayüz? Panel reddeder — ağı kontrol
edin veya manuel modu kullanın.

## Manuel mod

Misafir ağı gibiler için: SSID, parola ve şifreleme elle girilir. Saf
WPA3/SAE/OWE çipçe desteklenmez (panel uyarır); karmalar WPA2 olarak bildirilir.

## Sonra bant değiştirme

Başka profil seçip yazmaya basın — eski kayıt değişir. Yeniden başlatma
gerekmez ve etkilemez.

---
**← Önceki:** [01-quickstart](01-quickstart.md) · **Sonraki:** [03-build →](03-build.md) · [İçindekiler](Readme.tr.md)
