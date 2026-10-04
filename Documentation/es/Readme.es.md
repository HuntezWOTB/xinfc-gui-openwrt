[العربية](Readme.ar.md) · [简体中文](Readme.zh-CN.md) · [English](Readme.en.md) · [Deutsch](Readme.de.md) · [Русский](Readme.ru.md) · [Español](Readme.es.md) · [Türkçe](Readme.tr.md) · [Українська](Readme.uk.md)

# xinfc-gui-openwrt

Panel OpenWrt `Servicios → NFC`: escribe las credenciales Wi-Fi en el chip
NFC de routers Xiaomi (probado: AX3000T). Acerca el teléfono al router —
recibirás la solicitud de conexión.

- 8 idiomas, perfiles 2,4 / 5 GHz + modo manual
- Instalación en un comando, desinstalación cuidadosa, copia original a salvo

## Instalación

En el router:

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

Desinstalar — `sh xinfc_owrt_uninstall.sh`.

## Guías paso a paso (español)

- [01-quickstart.md](01-quickstart.md) — instalación y primera escritura
- [02-profiles.md](02-profiles.md) — perfiles 2,4 / 5 GHz y modo manual
- [03-build.md](03-build.md) — compilar para otras arquitecturas
- [04-troubleshoot.md](04-troubleshoot.md) — diagnóstico
