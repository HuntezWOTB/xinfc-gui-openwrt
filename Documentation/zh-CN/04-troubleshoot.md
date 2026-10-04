[العربية](../ar/04-troubleshoot.md) · [简体中文](../zh-CN/04-troubleshoot.md) · [English](../en/04-troubleshoot.md) · [Deutsch](../de/04-troubleshoot.md) · [Русский](../ru/04-troubleshoot.md) · [Español](../es/04-troubleshoot.md) · [Türkçe](../tr/04-troubleshoot.md) · [Українська](../uk/04-troubleshoot.md)

# 故障排查

快速状态（也有 `check.sh`）：

```sh
/usr/sbin/xinfc-wsc 2>&1 | head -2
ls /dev/i2c*
ubus -S call luci.xinfc getConfig
ubus -S call luci.xinfc getRadios | head -c 600; echo
ubus -S call luci.xinfc detectChip
ls -l /etc/xinfc/nfc_ndef_backup.bin
```

## 找不到芯片

- `apk add i2c-tools`，然后 `i2cdetect -y 0`（AX3000T：总线 `0`、芯片 `0x57`）。
- 上游警告芯片有时会挂，工具内置重试 — 重新写入即可。
- 确认硬件与测试的一致（AX3000T + NT082C）。工具不校验芯片 ID，
  可能损坏其他芯片！

## 服务中没有面板

入口依赖可执行的 `/usr/sbin/xinfc-wsc`（见 menu.d）。检查文件、ACL 和后端：

```sh
ls -l /www/luci-static/resources/view/xinfc.js \
      /usr/share/luci/menu.d/luci-app-xinfc.json \
      /usr/share/rpcd/acl.d/luci-app-xinfc.json \
      /usr/libexec/rpcd/luci.xinfc
ubus -S call luci.xinfc getRadios
```

## 备份

首次运行写入 `/etc/xinfc/nfc_ndef_backup.bin`（仅当不存在）。上游如实警告：
备份可能不足以恢复。第一次备份最珍贵 — 请单独保存。

---
**← 上一步:** [03-build](03-build.md) · [目录](Readme.zh-CN.md)
