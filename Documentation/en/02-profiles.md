[العربية](../ar/02-profiles.md) · [简体中文](../zh-CN/02-profiles.md) · [English](../en/02-profiles.md) · [Deutsch](../de/02-profiles.md) · [Русский](../ru/02-profiles.md) · [Español](../es/02-profiles.md) · [Türkçe](../tr/02-profiles.md) · [Українська](../uk/02-profiles.md)

# Profiles: 2.4 / 5 GHz and manual mode

The chip stores a single record, so a profile is a choice of *what* to write.
Different SSIDs and passwords per band are supported: each profile reads its
own interface from the router settings.

## Auto profiles 2.4 / 5 GHz

The panel groups `wifi-iface` by radio (`band`, else `hwmode`/channel:
1–14 is 2.4 GHz, above is 5 GHz). Picking an interface fills SSID and
encryption automatically. The key from router settings **never reaches
the browser** — the backend reads it at write time.

No key on the interface while encryption is not `none`? The panel refuses
until clarified — check the network or use manual mode.

## Manual mode

For guest networks and anything absent from the `wireless` config: SSID,
password and encryption typed by hand. Pure WPA3/SAE/OWE is not supported
by the chip (the panel warns); mixed modes are announced as WPA2.

## Switching bands later

Just pick another profile and press `Write to chip` — the old record is
replaced. No reboot needed, and reboot changes nothing.
