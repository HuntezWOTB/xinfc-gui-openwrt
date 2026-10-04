[العربية](../ar/03-build.md) · [简体中文](../zh-CN/03-build.md) · [English](../en/03-build.md) · [Deutsch](../de/03-build.md) · [Русский](../ru/03-build.md) · [Español](../es/03-build.md) · [Türkçe](../tr/03-build.md) · [Українська](../uk/03-build.md)

# بناء xinfc-wsc لمعماريات أخرى

المرفق: `bin/xinfc-wsc-aarch64` الجاهز (AX3000T وأمثاله). للبقية ابنِ
من المصدر:

```sh
git clone https://github.com/Caian/xinfc
cd xinfc
# انظر DOCKER_HOWTO.md و build.sh في مستودع المصدر
```

ثم على الموجه:

```sh
BIN_FILE=/tmp/xinfc-wsc sh xinfc_owrt_install.sh
```

يضع المثبّت binary في `/usr/sbin/xinfc-wsc`. يحتاج المصدر `i2c-tools`
للبحث؛ الأداة نفسها تتحدث عبر ioctl مباشرة.
