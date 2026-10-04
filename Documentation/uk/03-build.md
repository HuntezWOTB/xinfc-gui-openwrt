[العربية](../ar/03-build.md) · [简体中文](../zh-CN/03-build.md) · [English](../en/03-build.md) · [Deutsch](../de/03-build.md) · [Русский](../ru/03-build.md) · [Español](../es/03-build.md) · [Türkçe](../tr/03-build.md) · [Українська](../uk/03-build.md)

# Збірка xinfc-wsc під інші архітектури

У комплекті — готовий `bin/xinfc-wsc-aarch64` (AX3000T і подібні).
Для інших платформ зберіть з апстриму:

```sh
git clone https://github.com/Caian/xinfc
cd xinfc
# див. DOCKER_HOWTO.md і build.sh у репозиторії апстрима
```

Потім на роутері:

```sh
BIN_FILE=/tmp/xinfc-wsc sh xinfc_owrt_install.sh
```

Встановлювач покладе ваш бінарник у `/usr/sbin/xinfc-wsc`.
Апстриму потрібен `i2c-tools` для пошуку, сам інструмент працює
через ioctl напряму.
