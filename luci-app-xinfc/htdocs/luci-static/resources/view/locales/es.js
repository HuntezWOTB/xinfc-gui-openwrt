'use strict';
/* Español — Spanish strings for luci-app-xinfc. */
return {
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
	fail: 'Error de escritura (ver salida).', tagContent: 'Contenido de la etiqueta', chipTitle: 'Chip', events: 'Eventos recientes',
	ssidLabel: 'Nombre de la red',
	i2cHint: 'I2C es el pequeño bus interno con el que el router habla con el chip (dos cables: datos y reloj). El panel lo usa para encontrar el chip y escribir la etiqueta.',
	mapSub: 'Credenciales Wi-Fi para el chip NFC del router (Xiaomi AX3000T y similares).'
};
