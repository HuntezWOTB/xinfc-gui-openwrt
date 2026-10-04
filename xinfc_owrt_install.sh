#!/bin/sh
# xinfc_owrt_install.sh — one-command NFC panel setup on OpenWrt.
#
# Usage:
#   sh xinfc_owrt_install.sh                    # from the repo root
#   sh xinfc_owrt_install.sh --from-github      # fetch the tree from GitHub
#   REPO=... REF=... sh xinfc_owrt_install.sh --from-github
#
# Installs: xinfc-wsc binary (aarch64 bundled), Services -> NFC panel,
# luci.xinfc backend, config. Never touches foreign files; everything
# installed is recorded in /etc/xinfc/install.manifest. No daemon —
# the chip keeps data with no power.
set -eu

REPO="${REPO:-https://github.com/HuntezWOTB/xinfc-gui-openwrt}"
REF="${REF:-main}"
BIN="${BIN:-/usr/sbin/xinfc-wsc}"
CONF_DIR="/etc/xinfc"
MANIFEST="$CONF_DIR/install.manifest"
MARKER="xinfc-gui-openwrt"

SRC=""
FROM_GITHUB=0
for a in "$@"; do
  case "$a" in --from-github) FROM_GITHUB=1 ;; esac
done

log() { echo "[xinfc-install] $*"; }
remember() { printf '%s\n' "$1" >> "$MANIFEST.tmp"; }

if [ "$FROM_GITHUB" = "1" ]; then
  log "downloading $REPO@$REF"
  rm -rf /tmp/xinfc-src
  mkdir -p /tmp/xinfc-src
  wget -qO- "$REPO/archive/refs/heads/$REF.tar.gz" | tar -xz -C /tmp/xinfc-src
  SRC="$(echo /tmp/xinfc-src/*/)"
elif [ -d "luci-app-xinfc" ]; then
  SRC="$(pwd)/"
else
  log "ERROR: repo tree not found."
  log "Run from the repo root or add --from-github."
  exit 1
fi
log "source: $SRC"

mkdir -p "$CONF_DIR"
chmod 700 "$CONF_DIR"
: > "$MANIFEST.tmp"

ARCH="$(uname -m)"
log "arch: $ARCH"

# --- binary: only aarch64 bundled ---
# NOTE: executable bit wins over the manifest — a stale record with
# a missing file reinstalls instead of being trusted.
if [ -x "$BIN" ] && grep -qxF "$BIN" "$MANIFEST" 2>/dev/null; then
  log "binary is ours, keeping: $BIN"
  remember "$BIN"
elif [ -x "$BIN" ]; then
  log "foreign $BIN exists — leaving it alone, using it"
  printf 'keep:%s\n' "$BIN" >> "$MANIFEST.tmp"
else
  case "$ARCH" in
    aarch64|arm64)
      log "installing bundled aarch64 binary"
      cp "$SRC/bin/xinfc-wsc-aarch64" "$BIN"
      chmod +x "$BIN"
      remember "$BIN"
      ;;
    *)
      log "ERROR: no ready binary for $ARCH."
      log "Build xinfc-wsc from https://github.com/Caian/xinfc (see Documentation/en/03-build.md)"
      log "then rerun with BIN_FILE=/path/to/xinfc-wsc sh xinfc_owrt_install.sh"
      if [ -n "${BIN_FILE:-}" ] && [ -f "$BIN_FILE" ]; then
        cp "$BIN_FILE" "$BIN"
        chmod +x "$BIN"
        remember "$BIN"
      else
        exit 1
      fi
      ;;
  esac
fi

# --- runtime deps: libstdcpp for the C++ binary, i2c-tools for chip search ---
# (writes themselves go over ioctl and don't need i2c-tools).
# NOTE: the OpenWrt package is named libstdcpp, not libstdc++.
NEED_APK=0
ls /usr/lib/libstdcpp.so* >/dev/null 2>&1 || NEED_APK=1
[ -x /usr/sbin/i2cdetect ] || NEED_APK=1
if [ "$NEED_APK" = "1" ]; then
  log "installing runtime deps (libstdcpp, i2c-tools)"
  apk update && apk add libstdcpp i2c-tools || log "apk failed — chip search may be unavailable"
else
  log "runtime deps present"
fi

# --- LuCI panel ---
LUCI="$SRC/luci-app-xinfc"
mkdir -p /usr/share/luci/menu.d
cp "$LUCI/menu.d/luci-app-xinfc.json" /usr/share/luci/menu.d/luci-app-xinfc.json
remember "/usr/share/luci/menu.d/luci-app-xinfc.json"
mkdir -p /usr/share/rpcd/acl.d
cp "$LUCI/rpcd/luci-app-xinfc.json" /usr/share/rpcd/acl.d/luci-app-xinfc.json
remember "/usr/share/rpcd/acl.d/luci-app-xinfc.json"
mkdir -p /usr/libexec/rpcd
cp "$LUCI/rpcd-exec/luci.xinfc" /usr/libexec/rpcd/luci.xinfc
chmod +x /usr/libexec/rpcd/luci.xinfc
remember "/usr/libexec/rpcd/luci.xinfc"
mkdir -p /www/luci-static/resources/view
cp "$LUCI/htdocs/luci-static/resources/view/xinfc.js" /www/luci-static/resources/view/xinfc.js
remember "/www/luci-static/resources/view/xinfc.js"
if [ ! -f /etc/config/xinfc ]; then
  cp "$LUCI/root/etc/config/xinfc" /etc/config/xinfc
  remember "/etc/config/xinfc"
else
  log "/etc/config/xinfc exists — leaving it alone"
fi

mv "$MANIFEST.tmp" "$MANIFEST"
chmod 600 "$MANIFEST"
rm -rf /tmp/luci-indexcache /tmp/luci-modulecache 2>/dev/null || true
/etc/init.d/rpcd restart 2>/dev/null || true
/etc/init.d/uhttpd restart 2>/dev/null || true

echo "--- self-check ---"
"$BIN" 2>&1 | head -2 || true
ubus -S call luci.xinfc getConfig
log "done. Panel: re-login, Services -> NFC."
log "IMPORTANT: the first write backs up stock chip data to $CONF_DIR/nfc_ndef_backup.bin — save it!"
