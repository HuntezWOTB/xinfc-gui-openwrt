#!/bin/sh
# Быстрая диагностика NFC на роутере: sh check.sh
set -eu
echo "== tool =="; ls -l /usr/sbin/xinfc-wsc 2>/dev/null || echo "no tool"
/usr/sbin/xinfc-wsc 2>&1 | head -2 || true
echo "== i2c =="; ls /dev/i2c* 2>/dev/null || echo "no /dev/i2c*"
which i2cdetect 2>/dev/null || echo "no i2cdetect (apk add i2c-tools)"
echo "== config =="; cat /etc/config/xinfc 2>/dev/null || echo "no /etc/config/xinfc"
echo "== backend =="; ubus -S call luci.xinfc getConfig 2>/dev/null || echo "backend missing"
echo "== backup =="; ls -l /etc/xinfc/nfc_ndef_backup.bin 2>/dev/null || echo "no stock backup yet"
echo "== radios =="; ubus -S call luci.xinfc getRadios 2>/dev/null | head -c 600; echo
