[العربية](../ar/03-build.md) · [简体中文](../zh-CN/03-build.md) · [English](../en/03-build.md) · [Deutsch](../de/03-build.md) · [Русский](../ru/03-build.md) · [Español](../es/03-build.md) · [Türkçe](../tr/03-build.md) · [Українська](../uk/03-build.md)

# Compilar xinfc-wsc para otras arquitecturas

Incluido: `bin/xinfc-wsc-aarch64` listo (AX3000T y similares). Para otras
plataformas compila desde upstream:

```sh
git clone https://github.com/Caian/xinfc
cd xinfc
# ver DOCKER_HOWTO.md y build.sh en el repo upstream
```

Luego en el router:

```sh
BIN_FILE=/tmp/xinfc-wsc sh xinfc_owrt_install.sh
```

El instalador deja tu binario en `/usr/sbin/xinfc-wsc`.
Upstream necesita `i2c-tools` para buscar; la herramienta habla por ioctl.
