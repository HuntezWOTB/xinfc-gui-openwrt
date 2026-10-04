[العربية](../ar/03-build.md) · [简体中文](../zh-CN/03-build.md) · [English](../en/03-build.md) · [Deutsch](../de/03-build.md) · [Русский](../ru/03-build.md) · [Español](../es/03-build.md) · [Türkçe](../tr/03-build.md) · [Українська](../uk/03-build.md)

# xinfc-wsc'yi başka mimariler için derleme

Dahil: hazır `bin/xinfc-wsc-aarch64` (AX3000T vb.). Diğerleri için kaynaktan:

```sh
git clone https://github.com/Caian/xinfc
cd xinfc
# bkz. yukarı depodaki DOCKER_HOWTO.md ve build.sh
```

Sonra yönlendiricide:

```sh
BIN_FILE=/tmp/xinfc-wsc sh xinfc_owrt_install.sh
```

Kurucu binary `/usr/sbin/xinfc-wsc` konumuna koyar. Arama için `i2c-tools`
gerekir; araç kendisi doğrudan ioctl ile konuşur.
