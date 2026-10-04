[العربية](../ar/02-profiles.md) · [简体中文](../zh-CN/02-profiles.md) · [English](../en/02-profiles.md) · [Deutsch](../de/02-profiles.md) · [Русский](../ru/02-profiles.md) · [Español](../es/02-profiles.md) · [Türkçe](../tr/02-profiles.md) · [Українська](../uk/02-profiles.md)

# Profile: 2,4 / 5 GHz und manueller Modus

Der Chip hält einen Datensatz — das Profil wählt also, *was* geschrieben
wird. Unterschiedliche SSIDs/Passwörter pro Band werden unterstützt: jedes
Profil liest sein Interface aus den Router-Einstellungen.

## Auto-Profile 2,4 / 5 GHz

Das Panel gruppiert `wifi-iface` nach Radio (`band`, sonst `hwmode`/Kanal:
1–14 ist 2,4 GHz, darüber 5 GHz). Bei Wahl eines Interface werden SSID und
Verschlüsselung automatisch gesetzt. Der Schlüssel aus den Router-Einstellungen
**gelangt nie in den Browser** — das Backend liest ihn beim Schreiben.

Kein Schlüssel am Interface, Verschlüsselung nicht `none`? Das Panel
verweigert — Netzwerk prüfen oder manuellen Modus nehmen.

## Manueller Modus

Für Gästenetz u. Ä. ohne `wireless`-Eintrag: SSID, Passwort und
Verschlüsselung von Hand. Reines WPA3/SAE/OWE kann der Chip nicht (Panel
warnt), gemischte werden dem Telefon als WPA2 gemeldet.

## Band später wechseln

Anderes Profil wählen, `Auf Chip schreiben` — der alte Datensatz wird
ersetzt. Kein Reboot nötig, Reboot ändert nichts.

---
**← Zurück:** [01-quickstart](01-quickstart.md) · **Weiter:** [03-build →](03-build.md) · [Inhalt](Readme.de.md)
