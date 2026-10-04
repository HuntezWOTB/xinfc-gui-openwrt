[العربية](../ar/02-profiles.md) · [简体中文](../zh-CN/02-profiles.md) · [English](../en/02-profiles.md) · [Deutsch](../de/02-profiles.md) · [Русский](../ru/02-profiles.md) · [Español](../es/02-profiles.md) · [Türkçe](../tr/02-profiles.md) · [Українська](../uk/02-profiles.md)

# Perfiles: 2,4 / 5 GHz y modo manual

El chip guarda un solo registro: el perfil elige *qué* escribir.
Se admiten SSID y claves distintas por banda: cada perfil lee su
interfaz de los ajustes del router.

## Perfiles auto 2,4 / 5 GHz

El panel agrupa `wifi-iface` por radio (`band`, si no `hwmode`/canal:
1–14 es 2,4 GHz, más es 5 GHz). Al elegir interfaz, SSID y cifrado se
rellenan solos. La clave de los ajustes **nunca llega al navegador** —
la lee el backend al escribir.

¿Interfaz sin clave con cifrado distinto de `none`? El panel se niega —
revisa la red o usa el modo manual.

## Modo manual

Para la red de invitados y lo ausente en `wireless`: SSID, clave y
cifrado a mano. WPA3/SAE/OWE puro no lo soporta el chip (avisa el panel);
los mixtos se anuncian como WPA2.

## Cambiar de banda después

Elige otro perfil y pulsa `Escribir en el chip` — se reemplaza.
Sin reinicios, y reiniciar no cambia nada.

---
**← Anterior:** [01-quickstart](01-quickstart.md) · **Siguiente:** [03-build →](03-build.md) · [Índice](Readme.es.md)
