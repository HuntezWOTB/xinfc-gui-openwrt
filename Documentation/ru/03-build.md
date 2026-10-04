[العربية](../ar/03-build.md) · [简体中文](../zh-CN/03-build.md) · [English](../en/03-build.md) · [Deutsch](../de/03-build.md) · [Русский](../ru/03-build.md) · [Español](../es/03-build.md) · [Türkçe](../tr/03-build.md) · [Українська](../uk/03-build.md)

# Сборка xinfc-wsc под другие архитектуры

В комплекте — готовый `bin/xinfc-wsc-aarch64` (AX3000T и подобные).
Для остальных платформ соберите из апстрима:

```sh
git clone https://github.com/Caian/xinfc
cd xinfc
# см. DOCKER_HOWTO.md и build.sh в репозитории апстрима
```

Затем на роутере:

```sh
BIN_FILE=/tmp/xinfc-wsc sh xinfc_owrt_install.sh
```

Установщик положит ваш бинарь в `/usr/sbin/xinfc-wsc`.
Апстриму нужен `i2c-tools` для поиска, сам инструмент работает
через ioctl напрямую.
