'use strict';
'require form';
'require rpc';
'require view';

var callGetConfig = rpc.declare({ object: 'luci.xinfc', method: 'getConfig' });
var callGetRadios = rpc.declare({ object: 'luci.xinfc', method: 'getRadios' });
var callDetectChip = rpc.declare({ object: 'luci.xinfc', method: 'detectChip', params: ['buses'] });
var callWriteTag = rpc.declare({
	object: 'luci.xinfc', method: 'writeTag',
	params: ['profile', 'iface', 'ssid', 'key', 'encryption', 'bus', 'addr']
});
var callGetBackups = rpc.declare({ object: 'luci.xinfc', method: 'getBackups' });
var callSetLang = rpc.declare({ object: 'luci.xinfc', method: 'setLang', params: ['lang'] });

/* UI strings: one JSON file per language in view/locales/<code>.json,
   loaded on demand (only the active language + English fallback).
   Language list in alphabetical order of English names. */
var LANGS = [
	['ar', 'العربية'], ['zh_CN', '简体中文'], ['en', 'English'], ['de', 'Deutsch'],
	['ru', 'Русский'], ['es', 'Español'], ['tr', 'Türkçe'], ['uk', 'Українська']
];

var I18N = {};

function loadLocale(code) {
	return fetch(L.resource('view/locales/' + code + '.json')).then(function(res) {
		if (!res.ok) throw new Error('no locale ' + code);
		return res.json();
	}).then(function(dict) {
		I18N[code] = dict;
		return dict;
	});
}

var ENC_MODES = [
	['none', 'None'], ['psk', 'WPA Personal (PSK)'], ['psk2', 'WPA2 Personal (PSK)'],
	['psk2+aes', 'WPA2 Personal (AES/CCMP)'], ['psk2+ccmp', 'WPA2 Personal (CCMP)'],
	['psk-mixed', 'WPA/WPA2 Personal Mixed'], ['sae-mixed', 'WPA2/WPA3 Personal Mixed'],
	['psk2+tkip', 'WPA2 Personal (TKIP)'], ['wep', 'WEP (Open)'], ['wep+shared', 'WEP (Shared)']
];

var WPA3_PURE = ['sae', 'wpa3', 'owe'];
var WPA3_MIXED = ['sae-mixed', 'wpa3-mixed'];

return view.extend({
	load: function() {
		return L.uci.load('xinfc').then(function() {
			var lang = L.uci.get('xinfc', 'main', 'lang') || 'en';
			var known = LANGS.some(function(l) { return l[0] === lang; });
			if (!known) lang = 'en';
			return Promise.all([
				callGetConfig().then(function(r) { return (r && r.xinfc) || null; }, function() { return null; }),
				callGetRadios().then(function(r) { return (r && r.xinfc && r.xinfc.radios) || null; }, function() { return null; }),
				callGetBackups().then(function(r) { return (r && r.xinfc) || null; }, function() { return null; }),
				loadLocale(lang).catch(function() { return null; }).then(function() {
					return loadLocale('en').catch(function() { return null; }).then(function() {
						return lang;
					});
				})
			]);
		});
	},

	render: function(data) {
		var cfg = data[0] || {}, radios = data[1] || [], backup = data[2] || {};
		var lang = data[3] || 'en';
		if (!I18N[lang]) lang = 'en';
		function T(k) { return I18N[lang][k] || I18N.en[k] || k; }

		var m, s, o, badgeEl, infoEl, logEl;
		var state = { profile: '2g', iface: '' };

		function ifacesOf(band) {
			var out = [];
			radios.forEach(function(r) {
				if (r.band !== band) return;
				(r.ifaces || []).forEach(function(i) { out.push(i); });
			});
			return out;
		}

		function paintBadge(ok, text) {
			badgeEl.textContent = text;
			badgeEl.style.backgroundColor = ok == null ? '#666' : (ok ? '#12805c' : '#b52a1a');
		}

		m = new form.Map('xinfc', _('NFC'), T('mapSub') +
			'<div style="float:right;position:relative;">' + T('lang') + ': <span id="xinfc-langs"></span></div>' +
			'<div style="clear:both;margin-top:4px;color:#999;">' + T('subtitle') + '</div>');

		s = m.section(form.NamedSection, 'main', 'xinfc', T('tagContent'));
		s.addremove = false;
		s.anonymous = false;

		o = s.option(form.ListValue, '_profile', T('profile'));
		o.value('2g', T('p2g'));
		o.value('5g', T('p5g'));
		o.value('manual', T('pmanual'));
		o.default = '2g';
		o.rmempty = false;
		o.cfgvalue = function() { return state.profile; };
		o.write = function() {};

		o = s.option(form.ListValue, '_iface', T('iface'));
		o.cfgvalue = function() { return state.iface; };
		o.write = function() {};
		o.optional = true;
		o.depends('_profile', '2g');
		o.depends('_profile', '5g');
		ifacesOf('2g').forEach(function(i) {
			o.value(i.name, i.name + (i.ssid ? ' (' + T('ssidLabel') + ': ' + i.ssid + ')' : ''));
		});

		o = s.option(form.Value, 'ssid', T('ssidLabel'));
		o.datatype = 'maxlength(32)';
		o.depends('_profile', 'manual');

		o = s.option(form.ListValue, 'encryption', T('enc'));
		ENC_MODES.forEach(function(e) { o.value(e[0], e[1]); });
		o.default = 'sae-mixed';
		o.depends('_profile', 'manual');

		o = s.option(form.Value, '_key', T('key'));
		o.password = true;
		o.datatype = 'wpakey';
		o.depends('_profile', 'manual');
		o.description = T('keyHint');
		o.cfgvalue = function() { return ''; };
		o.write = function() {};

		o = s.option(form.Value, 'bus', T('bus'));
		o.default = '0';
		o.datatype = 'range(0,9)';
		o.description = T('i2cHint');

		o = s.option(form.Value, 'addr', T('addr'));
		o.default = '0x57';
		o.placeholder = '0x57';

		var box = E('div', { 'class': 'cbi-section' }, [
			E('h3', {}, T('chipTitle')),
			E('div', { 'style': 'margin:8px 0;' }, [
				E('button', { 'class': 'btn cbi-button cbi-button-apply', 'style': 'font-weight:bold;', 'id': 'xinfc-write' }, T('write')),
				' ',
				E('button', { 'class': 'btn cbi-button cbi-button-neutral', 'id': 'xinfc-detect' }, T('detect'))
			]),
			E('div', {}, [
				badgeEl = E('span', { 'style': 'display:inline-block;padding:4px 12px;border-radius:4px;color:#fff;font-weight:bold;background-color:#666;' }, T('result'))
			]),
			infoEl = E('div', { 'style': 'margin:6px 0;color:#ccc;font-size:12px;' },
				(backup.stock_backup ? T('backupOk') : T('backupMiss')) +
				(backup.stock_backup_path ? ' (' + backup.stock_backup_path + ')' : '')),
			logEl = E('pre', { 'style': 'max-height:200px;overflow:auto;background:#111;color:#bbb;padding:8px;font-size:11px;white-space:pre-wrap;' }, '')
		]);

		function refreshIfaceList() {
			var prof = state.profile;
			var list = (prof === 'manual') ? [] : ifacesOf(prof);
			var sel = box.parentNode && box.parentNode.querySelector('[id="cbid.xinfc.main._iface"] select');
			if (!sel) return;
			sel.innerHTML = '';
			if (!list.length) {
				var opt0 = document.createElement('option');
				opt0.value = ''; opt0.textContent = T('noiface');
				sel.appendChild(opt0);
				state.iface = '';
				return;
			}
			list.forEach(function(i) {
				var opt = document.createElement('option');
				opt.value = i.name;
				opt.textContent = i.name + (i.ssid ? ' (' + T('ssidLabel') + ': ' + i.ssid + ')' : '') + (i.disabled ? ' [off]' : '');
				sel.appendChild(opt);
			});
			state.iface = list[0].name;
			sel.value = state.iface;
			paintNetinfo();
		}

		function findIface(name) {
			var found = null;
			radios.forEach(function(r) {
				(r.ifaces || []).forEach(function(i) { if (i.name === name) found = i; });
			});
			return found;
		}

		function paintNetinfo() {
			var el = box.parentNode && box.parentNode.querySelector('[id="cbid.xinfc.main._iface"] .cbi-value-description');
			if (!el) return;
			if (state.profile === 'manual') { el.innerHTML = ''; return; }
			var i = findIface(state.iface);
			if (!i) { el.textContent = T('noiface'); return; }
			var warn = '';
			if (WPA3_PURE.indexOf(i.encryption) !== -1)
				warn = '<div style="color:#f0a13c;">' + T('wpa3err') + '</div>';
			else if (WPA3_MIXED.indexOf(i.encryption) !== -1)
				warn = '<div style="color:#f0a13c;">' + T('wpa3warn') + '</div>';
			el.innerHTML = T('ssidLabel') + ': <b>' + (i.ssid || '?') + '</b> · ' + T('enc') + ': <b>' +
				(i.encryption || '?') + '</b> · ' + T('key') + ': ' +
				(+i.has_key ? '***' : '<b style="color:#f0a13c;">?</b>') + warn;
		}

		function doDetect() {
			paintBadge(null, T('busy'));
			callDetectChip('0 1 2').then(function(res) {
				var b = res && res.xinfc;
				if (!b) { paintBadge(false, T('fail')); return; }
				if (b.error === 'no-i2c-tools') {
					logEl.textContent = 'apk add i2c-tools';
					paintBadge(false, T('fail'));
					return;
				}
				var txt = (b.buses || []).map(function(x) {
					return 'bus ' + x.bus + ': ' + (x.found || '—');
				}).join('\n');
				logEl.textContent = txt;
				paintBadge(true, T('detect') + ': OK');
			}, function() { paintBadge(false, T('fail')); });
		}

		function doWrite() {
			var prof = state.profile, payload;
			if (prof === 'manual') {
				var ssidEl = document.querySelector('[id="cbid.xinfc.main.ssid"] input');
				var encEl = document.querySelector('[id="cbid.xinfc.main.encryption"] select');
				var keyEl = document.querySelector('[id="cbid.xinfc.main._key"] input');
				payload = {
					profile: 'manual',
					ssid: ssidEl ? ssidEl.value : '',
					encryption: encEl ? encEl.value : 'sae-mixed',
					key: keyEl ? keyEl.value : ''
				};
			} else {
				var i = findIface(state.iface);
				if (!i) { paintBadge(false, T('noiface')); return; }
				if (WPA3_PURE.indexOf(i.encryption) !== -1) { paintBadge(false, T('wpa3err')); return; }
				if (!i.ssid || (!+i.has_key && i.encryption !== 'none')) { paintBadge(false, T('nokey')); return; }
				payload = { profile: 'auto', iface: i.name };
			}
			payload.bus = (L.uci.get('xinfc', 'main', 'bus') || (cfg.bus || '0'));
			payload.addr = (L.uci.get('xinfc', 'main', 'addr') || (cfg.addr || '0x57'));
			payload.iface = payload.iface || '';
			payload.ssid = payload.ssid || '';
			payload.key = payload.key || '';
			payload.encryption = payload.encryption || '';
			if (!confirm(T('writeConfirm'))) return;
			paintBadge(null, T('busy'));
			callWriteTag(payload.profile, payload.iface, payload.ssid, payload.key,
				payload.encryption, payload.bus, payload.addr).then(function(res) {
				var r = res && res.xinfc;
				logEl.textContent = (r && r.log) || '';
				paintBadge(r && r.ok, (r && r.ok) ? T('ok') : T('fail'));
			}, function() { paintBadge(false, T('fail')); });
		}

		return m.render().then(function(mapNode) {
			var wrap = E('div', {}, [mapNode, box]);
			var langSlot = wrap.querySelector('#xinfc-langs');
			if (langSlot) {
				var curName = lang;
				LANGS.forEach(function(l) { if (l[0] === lang) curName = l[1]; });
				var menu = E('div', {
					'style': 'display:none;position:absolute;right:0;top:100%;z-index:50;background:#222;border:1px solid #444;border-radius:4px;min-width:140px;'
				}, LANGS.map(function(l) {
					return E('div', {
						'data-lang': l[0],
						'style': 'padding:5px 10px;cursor:pointer;color:' + (l[0] === lang ? '#fff;font-weight:bold;' : '#ccc;')
					}, (l[0] === lang ? '● ' : '○ ') + l[1]);
				}));
				var globe = E('button', {
					'class': 'btn cbi-button cbi-button-neutral', 'style': 'padding:2px 8px;'
				}, '🌐 ' + curName + ' ▾');
				var holder = E('span', { 'style': 'position:relative;display:inline-block;' }, [globe, menu]);
				langSlot.appendChild(holder);
				globe.addEventListener('click', function(ev) {
					ev.preventDefault();
					menu.style.display = (menu.style.display === 'none') ? 'block' : 'none';
				});
				document.addEventListener('click', function(ev) {
					if (!holder.contains(ev.target)) menu.style.display = 'none';
				});
				menu.querySelectorAll('div[data-lang]').forEach(function(item) {
					item.addEventListener('click', function(ev) {
						ev.preventDefault();
						menu.style.display = 'none';
						callSetLang(item.getAttribute('data-lang')).then(function() { location.reload(); });
					});
				});
			}
			wrap.querySelectorAll('button[data-lang]').forEach(function(btn) {
				btn.addEventListener('click', function(ev) {
					ev.preventDefault();
					callSetLang(btn.getAttribute('data-lang')).then(function() { location.reload(); });
				});
			});
			var profSel = wrap.querySelector('[id="cbid.xinfc.main._profile"] select');
			var ifaceSel = wrap.querySelector('[id="cbid.xinfc.main._iface"] select');
			if (profSel) profSel.addEventListener('change', function() {
				state.profile = profSel.value;
				refreshIfaceList();
			});
			if (ifaceSel) ifaceSel.addEventListener('change', function() {
				state.iface = ifaceSel.value;
				paintNetinfo();
			});
			wrap.querySelector('#xinfc-write').addEventListener('click', doWrite);
			wrap.querySelector('#xinfc-detect').addEventListener('click', doDetect);
			refreshIfaceList();
			return wrap;
		});
	}
});
