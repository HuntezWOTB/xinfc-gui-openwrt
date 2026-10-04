[العربية](../ar/01-quickstart.md) · [简体中文](../zh-CN/01-quickstart.md) · [English](../en/01-quickstart.md) · [Deutsch](../de/01-quickstart.md) · [Русский](../ru/01-quickstart.md) · [Español](../es/01-quickstart.md) · [Türkçe](../tr/01-quickstart.md) · [Українська](../uk/01-quickstart.md)

# 快速入门：安装与首次写入

约 10 分钟。需要：带 NFC 芯片的路由器（已测试 AX3000T）、带 NFC 的手机、SSH。

## 1. 一条命令安装

在路由器上：

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

将安装 `xinfc-wsc`、`i2c-tools`、面板和后端。路由器无法访问 GitHub？
用 `tar` 通过 SSH 从电脑传输（固件无 `sftp-server` 时 `scp -r` 会失败）。

其他架构（仅自带 aarch64）？从 https://github.com/Caian/xinfc 编译
`xinfc-wsc`，然后 `BIN_FILE=/path/to/xinfc-wsc sh xinfc_owrt_install.sh`。

## 2. 面板

重新登录 LuCI：`服务 → NFC`。右上角切换语言（8 种：AR、ZH-CN、EN、DE、RU、ES、TR、UK）。

## 3. 查找芯片

点击查找按钮。应为总线 `0`、地址 `0x57`。为空？
`apk add i2c-tools`，然后手动 `i2cdetect -y 0`（见 `04-troubleshoot.md`）。

## 4. 首次写入

1. 选择 `2.4 GHz` 配置、你的接口。
2. 点击写入并确认。
3. 将手机靠近路由器 — 出现连接提示。

首次写入会创建 `/etc/xinfc/nfc_ndef_backup.bin` — 请复制到安全的地方，
这是芯片原厂数据。
