[العربية](Readme.ar.md) · [简体中文](Readme.zh-CN.md) · [English](Readme.en.md) · [Deutsch](Readme.de.md) · [Русский](Readme.ru.md) · [Español](Readme.es.md) · [Türkçe](Readme.tr.md) · [Українська](Readme.uk.md)

# xinfc-gui-openwrt

OpenWrt LuCI 面板（`服务 → NFC`）：将 Wi-Fi 信息写入小米路由器的 NFC 芯片
（已测试：AX3000T）。将手机靠近路由器即可收到连接提示。

- 8 种界面语言，2.4 / 5 GHz 配置 + 手动模式
- 一条命令安装，干净卸载，原厂备份妥善保留

## 安装

在路由器上：

```sh
cd /tmp
wget -qO- https://github.com/HuntezWOTB/xinfc-gui-openwrt/archive/refs/heads/main.tar.gz | tar -xz
cd xinfc-gui-openwrt-main
sh xinfc_owrt_install.sh
```

卸载 — `sh xinfc_owrt_uninstall.sh`。

## 分步文档（中文）

- [01-quickstart.md](01-quickstart.md) — 安装与首次写入
- [02-profiles.md](02-profiles.md) — 2.4 / 5 GHz 与手动模式
- [03-build.md](03-build.md) — 为其他架构编译
- [04-troubleshoot.md](04-troubleshoot.md) — 故障排查
