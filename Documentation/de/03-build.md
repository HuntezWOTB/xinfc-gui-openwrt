[العربية](../ar/03-build.md) · [简体中文](../zh-CN/03-build.md) · [English](../en/03-build.md) · [Deutsch](../de/03-build.md) · [Русский](../ru/03-build.md) · [Español](../es/03-build.md) · [Türkçe](../tr/03-build.md) · [Українська](../uk/03-build.md)

# xinfc-wsc für andere Architekturen bauen

Dabei: fertiges `bin/xinfc-wsc-aarch64` (AX3000T u. Ä.). Für andere
Plattformen aus Upstream bauen:

```sh
git clone https://github.com/Caian/xinfc
cd xinfc
# siehe DOCKER_HOWTO.md und build.sh im Upstream-Repo
```

Dann auf dem Router:

```sh
BIN_FILE=/tmp/xinfc-wsc sh xinfc_owrt_install.sh
```

Der Installer legt das Binary nach `/usr/sbin/xinfc-wsc`.
Upstream braucht `i2c-tools` zum Suchen, das Tool selbst spricht ioctl direkt.

---
**← Zurück:** [02-profiles](02-profiles.md) · **Weiter:** [04-troubleshoot →](04-troubleshoot.md) · [Inhalt](Readme.de.md)
