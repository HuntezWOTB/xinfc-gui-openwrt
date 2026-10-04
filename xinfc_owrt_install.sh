#!/bin/sh
# xinfc_owrt_install.sh — установка NFC-панели на OpenWrt одной командой.
#
# Использование:
#   sh xinfc_owrt_install.sh                    # из корня репозитория
#   sh xinfc_owrt_install.sh --from-github      # скачать дерево с GitHub
#   REPO=... REF=... sh xinfc_owrt_install.sh --from-github
#
# Ставит: бинарь xinfc-wsc (aarch64 в комплекте), панель Службы -> NFC,
# бэкенд luci.xinfc, конфиг. Чужие файлы не трогает, поставленное пишет
# в /etc/xinfc/install.manifest. Демона нет — чип хранит данные без питания.
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
  log "ERROR: дерево репозитория не найдено."
  log "Запустите из корня репозитория или добавьте --from-github."
  exit 1
fi
log "source: $SRC"

mkdir -p "$CONF_DIR"
chmod 700 "$CONF_DIR"
: > "$MANIFEST.tmp"

ARCH="$(uname -m)"
log "arch: $ARCH"

# --- бинарь: только aarch64 в комплекте ---
if grep -qxF "$BIN" "$MANIFEST" 2>/dev/null; then
  log "binary is ours, keeping: $BIN"
  remember "$BIN"
elif [ -x "$BIN" ]; then
  log "чужой $BIN уже есть — не трогаем, используем его"
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
      log "ERROR: готового бинаря под $ARCH нет."
      log "Соберите xinfc-wsc из https://github.com/Caian/xinfc (см. docs/03-build.md)"
      log "и повторите с BIN_FILE=/путь/к/xinfc-wsc sh xinfc_owrt_install.sh"
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

# --- i2c-tools для кнопки поиска чипа (сама запись идет через ioctl) ---
if [ ! -x /usr/sbin/i2cdetect ]; then
  log "installing i2c-tools (нужен для поиска чипа)"
  apk update && apk add i2c-tools || log "не вышло — поиск чипа будет недоступен, запись работает"
else
  log "i2c-tools present"
fi

# --- панель LuCI ---
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
  log "/etc/config/xinfc exists — не затираем"
fi

mv "$MANIFEST.tmp" "$MANIFEST"
chmod 600 "$MANIFEST"
rm -rf /tmp/luci-indexcache /tmp/luci-modulecache 2>/dev/null || true
/etc/init.d/rpcd restart 2>/dev/null || true
/etc/init.d/uhttpd restart 2>/dev/null || true

echo "--- проверка ---"
"$BIN" 2>&1 | head -2 || true
ubus -S call luci.xinfc getConfig
log "готово. Панель: разлогиньтесь/залогиньтесь, Службы -> NFC."
log "ВАЖНО: первая запись сделает бэкап заводских данных в $CONF_DIR/nfc_ndef_backup.bin — сохраните его!"
