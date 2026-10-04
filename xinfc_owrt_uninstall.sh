#!/bin/sh
# xinfc_owrt_uninstall.sh — careful NFC panel removal from the router.
# Removes ONLY what the installer recorded in /etc/xinfc/install.manifest.
# The stock nfc_ndef_backup.bin is NEVER touched — delete it by hand if sure.
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
    keep:*) log "foreign, skipping: ${entry#keep:}"; continue ;;
    */nfc_ndef_backup.bin) log "backup untouched: $entry"; continue ;;
  esac
  if [ -e "$entry" ]; then
    rm -f "$entry" && log "removed $entry" && CHANGED=1
  fi
done

rmdir "$CONF_DIR" 2>/dev/null || log "$CONF_DIR not empty (backup?) — keeping it"

if [ "$CHANGED" = "1" ]; then
  rm -rf /tmp/luci-indexcache /tmp/luci-modulecache 2>/dev/null || true
  /etc/init.d/rpcd restart 2>/dev/null || true
  /etc/init.d/uhttpd restart 2>/dev/null || true
fi
echo "Done."
