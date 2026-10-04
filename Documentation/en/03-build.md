[العربية](../ar/03-build.md) · [简体中文](../zh-CN/03-build.md) · [English](../en/03-build.md) · [Deutsch](../de/03-build.md) · [Русский](../ru/03-build.md) · [Español](../es/03-build.md) · [Türkçe](../tr/03-build.md) · [Українська](../uk/03-build.md)

# Building xinfc-wsc for other architectures

Bundled: ready `bin/xinfc-wsc-aarch64` (AX3000T and alike). For other
platforms build from upstream:

```sh
git clone https://github.com/Caian/xinfc
cd xinfc
# see DOCKER_HOWTO.md and build.sh in the upstream repo
```

Then on the router:

```sh
BIN_FILE=/tmp/xinfc-wsc sh xinfc_owrt_install.sh
```

The installer puts your binary at `/usr/sbin/xinfc-wsc`.
Upstream needs `i2c-tools` for discovery; the tool itself talks over ioctl.
