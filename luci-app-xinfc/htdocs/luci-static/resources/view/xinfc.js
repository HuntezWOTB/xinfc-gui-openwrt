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

/* Languages in alphabetical order of their English names. */
var LANGS = [
	['ar', 'العربية'], ['zh_CN', '简体中文'], ['en', 'English'], ['de', 'Deutsch'],
	['ru', 'Русский'], ['es', 'Español'], ['tr', 'Türkçe'], ['uk', 'Українська']
];

var I18N = {
	ar: {
		subtitle: 'اكتب بيانات Wi-Fi في شريحة NFC الخاصة بالموجه. قرّب الهاتف من الموجه لتلقي طلب الاتصال.',
		profile: 'الملف', p2g: '2.4 غيغاهرتز (من إعدادات الموجه)', p5g: '5 غيغاهرتز (من إعدادات الموجه)',
		pmanual: 'يدوي (مثل شبكة الضيوف)', iface: 'الواجهة', ssid: 'SSID', enc: 'التشفير', key: 'كلمة المرور',
		keyHint: 'يُدخل هنا فقط ويُرسل مباشرة إلى الكتابة. مفاتيح إعدادات الموجه لا تصل إلى المتصفح.',
		bus: 'ناقل I2C', addr: 'عنوان الشريحة على I2C', detect: 'العثور على الشريحة', write: 'الكتابة على الشريحة',
		writeConfirm: 'كتابة البيانات على شريحة NFC؟ سيتم استبدال المحتوى القديم.', result: 'النتيجة',
		nokey: 'لا توجد كلمة مرور لهذه الواجهة في الإعدادات — أدخلها يدويًا أو تحقق من الشبكة.',
		wpa3err: 'WPA3/SAE/OWE الخالص غير مدعوم من الشريحة. اختر وضعًا مختلطًا أو WPA2.',
		wpa3warn: 'سيُعلن وضع WPA2/WPA3 المختلط للهاتف كـ WPA2.', noiface: 'لا توجد واجهات في هذا النطاق.',
		backupOk: 'النسخة الاحتياطية الأصلية للشريحة موجودة',
		backupMiss: 'لا توجد نسخة احتياطية بعد — ستنشئها الكتابة الأولى. احتفظ بها في مكان آمن!',
		lang: 'اللغة', busy: 'جارٍ التنفيذ…', ok: 'تمت الكتابة بنجاح. قرّب الهاتف من الموجه.',
		fail: 'فشلت الكتابة (انظر الناتج).', tagContent: 'محتوى العلامة', chipTitle: 'الشريحة', events: 'الأحداث الأخيرة'
	},
	zh_CN: {
		subtitle: '将 Wi-Fi 信息写入路由器的 NFC 芯片。将手机靠近路由器即可收到连接提示。',
		profile: '配置文件', p2g: '2.4 GHz（来自路由器设置）', p5g: '5 GHz（来自路由器设置）',
		pmanual: '手动（例如访客网络）', iface: '接口', ssid: 'SSID', enc: '加密', key: '密码',
		keyHint: '仅在此处输入并直接发送写入。路由器设置中的密码不会传到浏览器。',
		bus: 'I2C 总线', addr: '芯片 I2C 地址', detect: '查找芯片', write: '写入芯片',
		writeConfirm: '将数据写入 NFC 芯片？旧内容将被替换。', result: '结果',
		nokey: '该接口在设置中没有密码 — 请手动输入或检查网络。',
		wpa3err: '芯片不支持纯 WPA3/SAE/OWE。请选择混合模式或 WPA2。',
		wpa3warn: '混合 WPA2/WPA3 将以 WPA2 形式通告给手机。', noiface: '该频段没有接口。',
		backupOk: '芯片原厂备份已存在',
		backupMiss: '尚无备份 — 首次写入将创建。请妥善保管！',
		lang: '语言', busy: '执行中…', ok: '写入成功。将手机靠近路由器。', fail: '写入失败（见输出）。',
		tagContent: '标签内容', chipTitle: '芯片', events: '最近事件'
	},
	en: {
		subtitle: 'Write Wi-Fi credentials to the router NFC chip. Tap the phone to the router to get a connect prompt.',
		profile: 'Profile', p2g: '2.4 GHz (from router settings)', p5g: '5 GHz (from router settings)',
		pmanual: 'Manual (e.g. guest network)', iface: 'Interface', ssid: 'SSID', enc: 'Encryption', key: 'Password',
		keyHint: 'Typed here only and sent straight to the write. Keys from router settings never reach the browser.',
		bus: 'I2C bus', addr: 'Chip I2C address', detect: 'Detect chip', write: 'Write to chip',
		writeConfirm: 'Write data to the NFC chip? Old content will be replaced.', result: 'Result',
		nokey: 'This interface has no key in settings — enter manually or check the network.',
		wpa3err: 'Pure WPA3/SAE/OWE is not supported by the chip. Pick a mixed mode or WPA2.',
		wpa3warn: 'Mixed WPA2/WPA3 will be announced to the phone as WPA2.', noiface: 'No interfaces in this band.',
		backupOk: 'Stock chip backup is in place',
		backupMiss: 'No stock backup yet — the first write will create it. Keep it safe!',
		lang: 'Language', busy: 'Working…', ok: 'Written successfully. Tap the phone to the router.',
		fail: 'Write failed (see output).', tagContent: 'Tag content', chipTitle: 'Chip', events: 'Recent events'
	},
	de: {
		subtitle: 'WLAN-Zugangsdaten auf den NFC-Chip des Routers schreiben. Telefon an den Router halten — Verbindungsabfrage erscheint.',
		profile: 'Profil', p2g: '2,4 GHz (aus Router-Einstellungen)', p5g: '5 GHz (aus Router-Einstellungen)',
		pmanual: 'Manuell (z. B. Gästenetz)', iface: 'Schnittstelle', ssid: 'SSID', enc: 'Verschlüsselung', key: 'Passwort',
		keyHint: 'Nur hier eingeben, geht direkt zum Schreiben. Schlüssel aus den Router-Einstellungen gelangen nie in den Browser.',
		bus: 'I2C-Bus', addr: 'I2C-Adresse des Chips', detect: 'Chip suchen', write: 'Auf Chip schreiben',
		writeConfirm: 'Daten auf den NFC-Chip schreiben? Alter Inhalt wird ersetzt.', result: 'Ergebnis',
		nokey: 'Für diese Schnittstelle ist kein Schlüssel hinterlegt — manuell eingeben oder Netzwerk prüfen.',
		wpa3err: 'Reines WPA3/SAE/OWE wird vom Chip nicht unterstützt. Gemischten Modus oder WPA2 wählen.',
		wpa3warn: 'Gemischtes WPA2/WPA3 wird dem Telefon als WPA2 gemeldet.', noiface: 'Keine Schnittstellen in diesem Band.',
		backupOk: 'Werks-Backup des Chips vorhanden',
		backupMiss: 'Noch kein Backup — der erste Schreibvorgang erstellt es. Gut aufbewahren!',
		lang: 'Sprache', busy: 'Läuft…', ok: 'Erfolgreich geschrieben. Telefon an den Router halten.',
		fail: 'Schreiben fehlgeschlagen (siehe Ausgabe).', tagContent: 'Tag-Inhalt', chipTitle: 'Chip', events: 'Letzte Ereignisse'
	},
	ru: {
		subtitle: 'Запись Wi-Fi данных в NFC-чип роутера. Поднесите телефон к роутеру — он предложит подключиться.',
		profile: 'Профиль', p2g: '2.4 ГГц (из настроек роутера)', p5g: '5 ГГц (из настроек роутера)',
		pmanual: 'Вручную (например, гостевая сеть)', iface: 'Интерфейс', ssid: 'SSID', enc: 'Шифрование', key: 'Пароль',
		keyHint: 'Вводится только здесь и уходит сразу в запись. Из настроек роутера пароль в браузер не передается.',
		bus: 'Шина I2C', addr: 'Адрес чипа I2C', detect: 'Найти чип', write: 'Записать в чип',
		writeConfirm: 'Записать данные в NFC-чип? Старое содержимое будет заменено.', result: 'Результат',
		nokey: 'У интерфейса нет пароля в настройках — выберите вручную или проверьте сеть.',
		wpa3err: 'Чистый WPA3/SAE/OWE чипом не поддерживается. Выберите смешанный режим или WPA2.',
		wpa3warn: 'Смешанный WPA2/WPA3 будет объявлен телефону как WPA2.', noiface: 'Нет интерфейсов в этом диапазоне.',
		backupOk: 'Заводской бэкап чипа на месте',
		backupMiss: 'Заводского бэкапа нет — первая запись его создаст. Храните его в безопасности!',
		lang: 'Язык', busy: 'Выполняю…', ok: 'Успешно записано. Поднесите телефон к роутеру.',
		fail: 'Ошибка записи (см. вывод).', tagContent: 'Содержимое метки', chipTitle: 'Чип', events: 'Последние события'
	},
	es: {
		subtitle: 'Escribe las credenciales Wi-Fi en el chip NFC del router. Acerca el teléfono al router para recibir la solicitud de conexión.',
		profile: 'Perfil', p2g: '2,4 GHz (desde los ajustes del router)', p5g: '5 GHz (desde los ajustes del router)',
		pmanual: 'Manual (p. ej. red de invitados)', iface: 'Interfaz', ssid: 'SSID', enc: 'Cifrado', key: 'Contraseña',
		keyHint: 'Se escribe solo aquí y va directo a la grabación. Las claves de los ajustes nunca llegan al navegador.',
		bus: 'Bus I2C', addr: 'Dirección I2C del chip', detect: 'Detectar chip', write: 'Escribir en el chip',
		writeConfirm: '¿Escribir datos en el chip NFC? Se reemplazará el contenido anterior.', result: 'Resultado',
		nokey: 'Esta interfaz no tiene clave en los ajustes — introdúcela manualmente o revisa la red.',
		wpa3err: 'WPA3/SAE/OWE puro no lo soporta el chip. Elige modo mixto o WPA2.',
		wpa3warn: 'WPA2/WPA3 mixto se anunciará al teléfono como WPA2.', noiface: 'No hay interfaces en esta banda.',
		backupOk: 'Copia de seguridad original del chip presente',
		backupMiss: 'Aún no hay copia — la primera escritura la creará. ¡Guárdala bien!',
		lang: 'Idioma', busy: 'En curso…', ok: 'Escrito correctamente. Acerca el teléfono al router.',
		fail: 'Error de escritura (ver salida).', tagContent: 'Contenido de la etiqueta', chipTitle: 'Chip', events: 'Eventos recientes'
	},
	tr: {
		subtitle: 'Wi-Fi bilgilerini yönlendiricinin NFC çipine yazın. Telefonu yönlendiriciye yaklaştırın, bağlantı isteği gelecektir.',
		profile: 'Profil', p2g: '2.4 GHz (yönlendirici ayarlarından)', p5g: '5 GHz (yönlendirici ayarlarından)',
		pmanual: 'Manuel (örn. misafir ağı)', iface: 'Arayüz', ssid: 'SSID', enc: 'Şifreleme', key: 'Parola',
		keyHint: 'Yalnızca buraya girilir ve doğrudan yazmaya gönderilir. Ayarlardaki parolalar tarayıcıya ulaşmaz.',
		bus: 'I2C veriyolu', addr: 'Çipin I2C adresi', detect: 'Çipi bul', write: 'Çipe yaz',
		writeConfirm: 'Veriler NFC çipine yazılsın mı? Eski içerik değiştirilecek.', result: 'Sonuç',
		nokey: 'Bu arayüzün ayarlarda parolası yok — manuel girin veya ağı kontrol edin.',
		wpa3err: 'Saf WPA3/SAE/OWE çip tarafından desteklenmiyor. Karma mod veya WPA2 seçin.',
		wpa3warn: 'Karma WPA2/WPA3 telefona WPA2 olarak bildirilecek.', noiface: 'Bu bantta arayüz yok.',
		backupOk: 'Çipin fabrika yedeği mevcut',
		backupMiss: 'Henüz yedek yok — ilk yazma oluşturacak. Güvenli saklayın!',
		lang: 'Dil', busy: 'Çalışıyor…', ok: 'Başarıyla yazıldı. Telefonu yönlendiriciye yaklaştırın.',
		fail: 'Yazma başarısız (çıktıya bakın).', tagContent: 'Etiket içeriği', chipTitle: 'Çip', events: 'Son olaylar'
	},
	uk: {
		subtitle: 'Запишіть дані Wi-Fi у NFC-чип роутера. Піднесіть телефон до роутера — з’явиться запит на підключення.',
		profile: 'Профіль', p2g: '2,4 ГГц (з налаштувань роутера)', p5g: '5 ГГц (з налаштувань роутера)',
		pmanual: 'Вручну (наприклад, гостьова мережа)', iface: 'Інтерфейс', ssid: 'SSID', enc: 'Шифрування', key: 'Пароль',
		keyHint: 'Вводиться лише тут і йде одразу на запис. Паролі з налаштувань роутера в браузер не потрапляють.',
		bus: 'Шина I2C', addr: 'I2C-адреса чипа', detect: 'Знайти чип', write: 'Записати в чип',
		writeConfirm: 'Записати дані в NFC-чип? Старий вміст буде замінено.', result: 'Результат',
		nokey: 'У цього інтерфейсу немає пароля в налаштуваннях — введіть вручну або перевірте мережу.',
		wpa3err: 'Чистий WPA3/SAE/OWE чипом не підтримується. Оберіть змішаний режим або WPA2.',
		wpa3warn: 'Змішаний WPA2/WPA3 буде оголошено телефону як WPA2.', noiface: 'Немає інтерфейсів у цьому діапазоні.',
		backupOk: 'Заводський бекап чипа на місці',
		backupMiss: 'Бекапа ще немає — перший запис його створить. Зберігайте у безпеці!',
		lang: 'Мова', busy: 'Виконую…', ok: 'Успішно записано. Піднесіть телефон до роутера.',
		fail: 'Помилка запису (див. вивід).', tagContent: 'Вміст мітки', chipTitle: 'Чип', events: 'Останні події'
	}
};

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
		return Promise.all([
			L.uci.load('xinfc'),
			callGetConfig().then(function(r) { return (r && r.xinfc) || null; }, function() { return null; }),
			callGetRadios().then(function(r) { return (r && r.xinfc && r.xinfc.radios) || null; }, function() { return null; }),
			callGetBackups().then(function(r) { return (r && r.xinfc) || null; }, function() { return null; })
		]);
	},

	render: function(data) {
		var cfg = data[1] || {}, radios = data[2] || [], backup = data[3] || {};
		var lang = L.uci.get('xinfc', 'main', 'lang') || cfg.lang || 'en';
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

		m = new form.Map('xinfc', _('NFC'),
			_('Wi-Fi credentials to the router NFC chip (Xiaomi AX3000T and alike).') +
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
			o.value(i.name, i.name + (i.ssid ? ' (SSID: ' + i.ssid + ')' : ''));
		});

		o = s.option(form.Value, 'ssid', T('ssid'));
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
				opt.textContent = i.name + (i.ssid ? ' (SSID: ' + i.ssid + ')' : '') + (i.disabled ? ' [off]' : '');
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
			el.innerHTML = 'SSID: <b>' + (i.ssid || '?') + '</b> · ' + T('enc') + ': <b>' +
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
