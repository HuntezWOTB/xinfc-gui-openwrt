[العربية](../ar/03-build.md) · [简体中文](../zh-CN/03-build.md) · [English](../en/03-build.md) · [Deutsch](../de/03-build.md) · [Русский](../ru/03-build.md) · [Español](../es/03-build.md) · [Türkçe](../tr/03-build.md) · [Українська](../uk/03-build.md)

# 为其他架构编译 xinfc-wsc

自带 `bin/xinfc-wsc-aarch64`（AX3000T 等）。其他平台请从上游编译：

```sh
git clone https://github.com/Caian/xinfc
cd xinfc
# 见上游仓库的 DOCKER_HOWTO.md 和 build.sh
```

然后在路由器上：

```sh
BIN_FILE=/tmp/xinfc-wsc sh xinfc_owrt_install.sh
```

安装程序会放到 `/usr/sbin/xinfc-wsc`。上游查找需要 `i2c-tools`，
工具本身直接用 ioctl 通信。

---
**← 上一步:** [02-profiles](02-profiles.md) · **下一步:** [04-troubleshoot →](04-troubleshoot.md) · [目录](Readme.zh-CN.md)
