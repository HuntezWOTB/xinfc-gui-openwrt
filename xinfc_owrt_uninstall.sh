#!/bin/sh
# xinfc_owrt_uninstall.sh — аккуратный снос NFC-панели с роутера.
# Удаляет ТОЛЬКО свое по /etc/xinfc/install.manifest. Заводской бэкап
# nfc_ndef_backup.bin НЕ трогает — удалите вручную, если уверены.
set -eu

CONF_DIR="/etc/xinfc"
MANIFEST="$CONF_DIR/install.manifest"

log() { echo "[xinfc-uninstall] $*"; }

FALLBACK="\
/www/luci-static/resources/view/xinfc.js
/usr/share/luci/menu.d/luci-app-xinfc.json
/usr/share/rpcd/acl.d/luci-app-xinfc.json
/usr/libexec/rpcd/luci.xinfc
/etc/config/xinfc
/usr/sbin/xinfc-wsc
/etc/xinfc/install.manifest"

LIST=""
if [ -f "$MANIFEST" ]; then
  log "manifest found"
  LIST="$(cat "$MANIFEST")"
else
  log "no manifest — fallback list"
  LIST="$FALLBACK"
fi

CHANGED=0
for entry in $LIST; do
  case "$entry" in
    keep:*) log "чужое, пропускаем: ${entry#keep:}"; continue ;;
    */nfc_ndef_backup.bin) log "бэкап не трогаем: $entry"; continue ;;
  esac
  if [ -e "$entry" ]; then
    rm -f "$entry" && log "removed $entry" && CHANGED=1
  fi
done

rmdir "$CONF_DIR" 2>/dev/null || log "$CONF_DIR не пуст (бэкап?) — оставляем"

if [ "$CHANGED" = "1" ]; then
  rm -rf /tmp/luci-indexcache /tmp/luci-modulecache 2>/dev/null || true
  /etc/init.d/rpcd restart 2>/dev/null || true
  /etc/init.d/uhttpd restart 2>/dev/null || true
fi
echo "Готово."
