[العربية](../ar/02-profiles.md) · [简体中文](../zh-CN/02-profiles.md) · [English](../en/02-profiles.md) · [Deutsch](../de/02-profiles.md) · [Русский](../ru/02-profiles.md) · [Español](../es/02-profiles.md) · [Türkçe](../tr/02-profiles.md) · [Українська](../uk/02-profiles.md)

# 配置：2.4 / 5 GHz 与手动模式

芯片只存一条记录，配置即选择*写入什么*。支持不同频段不同 SSID 和密码：
每个配置读取路由器设置中对应的接口。

## 自动配置 2.4 / 5 GHz

面板按射频分组 `wifi-iface`（`band`，否则 `hwmode`/信道：1–14 为 2.4 GHz，
以上为 5 GHz）。选择接口后 SSID 和加密自动填入。设置中的密码**不会传到
浏览器** — 后端在写入时读取。

接口无密码但加密不是 `none`？面板会拒绝 — 请检查网络或用手动模式。

## 手动模式

用于访客网络等：手动输入 SSID、密码和加密。芯片不支持纯 WPA3/SAE/OWE
（面板会警告）；混合模式将以 WPA2 通告。

## 之后切换频段

选择另一配置并点击写入即可替换旧记录。无需重启，重启也不影响。
