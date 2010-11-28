var uid;
var nav = ge('nav');
each (nav.childNodes, function (i, x) {
	if (x.firstChild != null && x.firstChild.href.match(/mail.php/)) {
		var h = x.firstChild.href.split('?id=');
		uid = h[1];
	}
});

var VERSION = 2.3;

var DEBUG = false;
var DEBUG_COUNT = 1000;

var MESSAGES_PER_PAGE = 20;

var supportedLanguages = {
	russian: 0,
	ukrainian: 1,
	english: 3
}

var getKeys = function(obj){
	var keys = [];
	for(var key in obj){
		keys.push(key);
	}
	return keys;
}

var userLang = langConfig.id;


var languages = [];

languages[supportedLanguages.russian] = {
	dateDelimiter: ' в ',
	appName: 'Статистика личной переписки',
	nameCol: 'Имя',
	numberOfMessagesCol: 'Всего сообщений',
	sentCol: 'Вы отправили',
	receivedCol: 'Вы получили',
	lastMsgCol: 'Последнее сообщение',
	messagesProcessed: 'Обработано сообщений',
	dayWithMostMessages: 'Больше всего сообщений было',
	timeWithMostMessages: 'Больше всего сообщений',
	thankYou: 'Спасибо, что дождались, надеемся, оно того стоило!',
	exportByTime: 'Экспорт статистики по времени',
	exportByMessages: 'Экспорт статистики по сообщениям',
	warning: 'Внимание! Не удалось обработать сообщений'
}

languages[supportedLanguages.english] = {
	dateDelimiter: ' at ',
	secondaryDateDelimiter: ' on ',
	appName: 'Private messages statistics',
	nameCol: 'Name',
	numberOfMessagesCol: 'Number of messages',
	sentCol: 'Sent',
	receivedCol: 'Received',
	lastMsgCol: 'Last Message',
	messagesProcessed: 'Messages processed',
	dayWithMostMessages: 'Day with most messages',
	timeWithMostMessages: 'Time with most messages',
	thankYou: 'Thank you for your time, we hope it was worth it!',
	exportByTime: 'Export time statistics',
	exportByMessages: 'Export message statistics',
	warning: 'Warning! Failed to process messages'
}

languages[supportedLanguages.ukrainian] = {
	dateDelimiter: ' о ',
	appName: 'Статистика приватні переписки',
	nameCol: "Ім'я",
	numberOfMessagesCol: 'Усього повідомлень',
	sentCol: 'Ви відправили',
	receivedCol: 'Ви одержали',
	lastMsgCol: 'Останнє повідомлення',
	messagesProcessed: 'Оброблене повідомлень',
	dayWithMostMessages: 'Найбільше повідомлень було',
	timeWithMostMessages: 'Найбільше повідомлень',
	thankYou: 'Спасибі, що дочекалися, сподіваємося, воно того коштувало!',
	exportByTime: 'Експорт статистики за часом',
	exportByMessages: 'Експорт статистики за повідомленням',
	warning: 'Увага! Не вдалося обробити повідомлень'
}


var LANG = languages[userLang];

if(LANG == undefined) {
	alert('Unsupported language! Please change the language to one of {' + getKeys(supportedLanguages) + '}');
} else {


	var stats = {};
	var f = [];
	var href2name = {};
	var dates = {};
	var times = {};


	var skipped = 0;
	var ei = 0;
	var eo = 0;
	var index = 0;
	var finished = false;

	// planner
	var p = {
		st: 0,
		out: 0,
		hd: function () {
			p.st = 0;
			index += p.st;
			p.out = 1;
			p.hd = function () {
				if(DEBUG) {
					out.debug('finished');
				}
				sortRows();
				finished = true;
			};
			la();
		}
	};

	index = p.st;

	var out = {
		countDiv: null,
		timeDiv: null,
		init: function () {
			ge('content').innerHTML = '';
			ge('content').appendChild(
				ce('img', 
					{src: '/images/progress7.gif'}, 
					{
						paddingLeft: '240px'
					}
				)
			);
			ge('header').innerHTML = '<h1>' + LANG.appName + ' ' + VERSION + '</h1>';
		},
		loaded: function () {
			ge('content').innerHTML = '';
			var pr = ce('div',
				{ id: 'sprogr' },
				{ position: 'relative', width: '100%', height: '30px', margin: '3px', backgroundColor: '#DAE2E8' }
			);
			pr.appendChild(
				ce('div', 
				{id: 'sprogb'}, {width: '0', height: 'inherit', backgroundColor: '#45688E'}
				)
			);
			pr.appendChild(
				ce('div', 
				{id: 'scnt'}, {position: 'absolute', left: '10px', top: '7px', width: '200px', height: 'inherit', color: '#fff', zIndex: 69}
				)
			);
			
			ge('content').appendChild(pr);
		},
		progress: function () {
			ge('sprogb').style.width = (100 * index / (1 * ei + 1 * eo)) + '%';
			ge('scnt').innerHTML = LANG.messagesProcessed + ': ' + index;
		},
		debug: function (msg) {
			console.debug(msg);
		},
		generateCount: function () {
			this.countDiv = ce('div');
			
			var table = ce('table', {className: 'wikiTable'});
			table.innerHTML += '<thead><th></th><th>' + LANG.nameCol + '</th><th onclick="javascript: sortRows();" style="cursor: pointer">' + LANG.numberOfMessagesCol + '</th><th onclick="javascript: sortRows(\'out\');" style="cursor: pointer">' + LANG.sentCol + '</th><th onclick="javascript: sortRows(\'in\');" style="cursor: pointer">' + LANG.receivedCol + '</th><th>' + LANG.lastMsgCol + '</th></thead>';
			
			var tbody = ce('tbody');
			table.appendChild(tbody);
			
			for (var i = 0; i < f.length; i++) {
				var tr = ce('tr');
				var tdR = ce('td', {innerHTML: i+1});
				var tdN = ce('td', {innerHTML: '<a href="'+f[i].href+'">' + f[i].name + '</a>'});
				var tdT = ce('td', {innerHTML: f[i].count});
				var tdO = ce('td', {innerHTML: f[i].count_outgoing});
				var tdI = ce('td', {innerHTML: f[i].count_incoming});
				var tdL = ce('td', {innerHTML: '<a href="mail.php?act=show&id='+f[i].lastMsgId+'">' + f[i].lastMsgTime + '</a>'});
				
				tr.appendChild(tdR);
				tr.appendChild(tdN);
				tr.appendChild(tdT);
				tr.appendChild(tdO);
				tr.appendChild(tdI);
				tr.appendChild(tdL);
				tbody.appendChild(tr);
			}
			
			this.countDiv.appendChild(table);
			ge('content').appendChild(this.countDiv);
		},
		generateTime: function () {
			this.timeDiv = ce('div');
			
			var maxTime = ''; var maxTV = 0;
			var maxDate = ''; var maxDV = 0;
			
			for (var key in dates) {
				if (dates[key].inb + dates[key].out > maxDV) {
					maxDate = key;
					maxDV = dates[key].inb + dates[key].out;
				}
			}
			
			for (var key in times) {
				if (times[key].inb + times[key].out > maxTV) {
					maxTime = key;
					maxTV = times[key].inb + times[key].out;
				}
			}
			
			this.timeDiv.innerHTML = LANG.dayWithMostMessages + ': ' + maxDate + ' &mdash; ' + maxDV;
			this.timeDiv.innerHTML += '<br/>' + LANG.timeWithMostMessages + ': ' + maxTime + ' &mdash; ' + maxTV;
			
			ge('content').appendChild(this.timeDiv);
		},
		generate: function () {
			ge('content').innerHTML = LANG.thankYou + '<br/><br/>';
			if(skipped > 0) {
				ge('content').innerHTML += LANG.warning + ': ' + skipped + '<br/>';
			}
			this.generateTime();
			ge('content').innerHTML += '<a href="#" onclick="javascript: out.exportDT();">' + LANG.exportByTime + '</a> | <a href="#" onclick="javascript: out.exportMsgs();">' + LANG.exportByMessages + '</a><br/>';
			ge('content').appendChild(ce('div', {id: 'export'}));
			ge('content').innerHTML += '<br/>';
			out.generateCount();
		},
		showCount: function () {

		},
		showTime: function () {

		},
		
		exportDT: function () {
			ge('export').innerHTML = '';
			var t = ce('textarea', {}, {width: '100%', height: '200px'});
			var d = [], z = [];
			for (var key in dates) {
				d.push({
					date: key,
					inb: dates[key].inb,
					out: dates[key].out
				});
			}
			
			for (var key in times) {
				z.push({
					time: key,
					inb: times[key].inb,
					out: times[key].out
				});
			}		
			
			t.innerHTML = '{"dates":[';
			for (var i = 0; i < d.length; i++) {
				t.innerHTML += '{"d":"'+d[i].date+'","i":'+d[i].inb+',"o":'+d[i].out+'}';
				if (i < d.length-1) t.innerHTML += ',';
			}
			t.innerHTML += '],"times":[';
			for (var i = 0; i < z.length; i++) {
				t.innerHTML += '{"t":"'+z[i].time+'","i":'+z[i].inb+',"o":'+z[i].out+'}';
				if (i < z.length-1) t.innerHTML += ',';
			}
			t.innerHTML += ']}';
			
			ge('export').appendChild(t);
		},
		
		exportMsgs: function () {
			ge('export').innerHTML = '';
			var t = ce('textarea', {}, {width: '100%', height: '200px'});
			t.innerHTML = '[';
			for (var i = 0; i < f.length; i++) {
				var g = f[i].href.split('/');
				var a = g[3];
				t.innerHTML += '{"h":"'+a+'","n":"'+f[i].name+'","o":'+f[i].count_outgoing+',"i":'+f[i].count_incoming+'}';
				if (i < f.length-1) t.innerHTML += ',';
			}
			t.innerHTML += ']';
			ge('export').appendChild(t);
		}
	};

	function sortRows(t) {
		if (f.length == 0) {
			for (var key in stats) {
				f.push({
					href: key,
					name: href2name[key],
					count: stats[key].count_out + stats[key].count_in,
					count_incoming: stats[key].count_in,
					count_outgoing: stats[key].count_out,
					lastMsgId: stats[key].lastMsgId,
					lastMsgTime: stats[key].lastMsgTime
				});
			}
		}

		if (t == undefined) {
			f.sort(function (a, b) {
				return b.count - a.count;
			});
		} else if (t == 'out') {
			f.sort(function (a, b) {
				return b.count_outgoing - a.count_outgoing;
			})
		} else {
			f.sort(function (a, b) {
				return b.count_incoming - a.count_incoming;
			});
		}
		
		out.generate();
	}

	out.init();

	Ajax.Get({
		url: 'mail.php?id=' + uid,
		onDone: function (ao, rt) {
			var res = eval('(' + rt + ')');
			ei = res.count;
			if(DEBUG) {
				out.debug('end of incoming = ' + ei);
			}
			
			Ajax.Get({
				url: 'mail.php?id=' + uid + '&out=1',
				onDone: function (ao, rt) {
					var res = eval('(' + rt + ')');
					eo = res.count;
					if(DEBUG) {
						out.debug('end of outgoing = ' + eo);
					}
					out.loaded();
					setTimeout("la()", 1000);
				}
			})
		}
	});
	
	function parseTS(localString) {
		var splitDate = localString.split(LANG.dateDelimiter);
		var resultingTime = splitDate[1];
		var resultingDate = splitDate[0];
		if(userLang == supportedLanguages.english && splitDate[1] != undefined) {
			splitDate = localString.split(LANG.secondaryDateDelimiter);
			resultingTime = splitDate[0];
			resultingDate = splitDate[1];
		}
		
		return {date: resultingDate, time: resultingTime};
	}

	function la() {
		var ajax = new Ajax();
		var start = (new Date()).getTime();
		ajax.onDone = function (ao, rt) {
			if (ao.data.st != p.st || ao.data.out != p.out) return; // synchronization failed
		
			if (rt.match(/html/)) {
				if (DEBUG) {
					console.debug('[ajax] stop cause blank.php, waiting for continue...');
				}
				return;
			}

			try {
				var r = eval('(' + rt + ')');
				var t = r.content;
				var d = ce('div');
					
				d.innerHTML = t;
			
				each (
					geByClass('name', d, 'div'), 
					function (i, x) {
						var href = x.children[0].href;
						var name = x.children[0].innerHTML;
						var ch = x.parentNode.children;
						var latestDate = ch[ch.length - 1].innerHTML;
						
						var parsedTS = parseTS(latestDate);
						
						msgDate = parsedTS.date;
						msgTime = parsedTS.time;
						
						if (dates[msgDate] == undefined) dates[msgDate] = {inb: 0, out: 0};
						if (times[msgTime] == undefined) times[msgTime] = {inb: 0, out: 0};
										
						if (href2name[href] == undefined) {
							href2name[href] = name;
							if(DEBUG) {
								out.debug('[h2n] ' + href + ' -> ' + name);
							}
						}
						
						if (stats[href] == undefined) {
						
							lastId = x.parentNode.parentNode.id.substring(4);
						
							stats[href] = {
								count_out: 0,
								count_in: 0,
								lastMsgId: lastId,
								lastMsgTime: latestDate
							};
							if(DEBUG) {
								out.debug('[stats] ' + href + ' started (lastMsgId=' + lastId + '; lastMsgTime=' + latestDate + ')');
							}
						}
						
						if (ao.data.out == 0) {
							stats[href].count_in++;
							dates[msgDate].inb++;
							times[msgTime].inb++;
						} else {
							stats[href].count_out++;
							dates[msgDate].out++;
							times[msgTime].out++;
						}
						if(DEBUG) {
							out.debug('[stats] ' + href + ' handled');
						}
					}
				);
				
				if(DEBUG) {
					out.debug('[ajax] handled successfully');
				}
			
			} catch(err) {
				if(DEBUG) {
					out.debug('[ajax] handled with error: ' + err);
				}
				skipped += MESSAGES_PER_PAGE;
			}
			
			
			index += MESSAGES_PER_PAGE;
			out.progress();
			
			var spent = (new Date()).getTime() - start;
			p.st += MESSAGES_PER_PAGE;
			if (DEBUG) {
				//To process only one page when debugging
				if (p.st >= DEBUG_COUNT) p.st += 999999999999999;
			}
			if (p.st < ((p.out == 0) ? ei : eo)) {
				if (spent < 1000) {
					setTimeout("la()", 1000 - spent);
					if(DEBUG) {
						out.debug('[timeout] ' + (1000 - spent) + 'ms');
					}
				} else {
					la();
				}
			} else {
				p.hd();
			}
		};
		
		if(DEBUG) {
			out.debug('[ajax] st='+p.st+', out='+p.out);
		}
		
		ajax.post(
			'mail.php',
			{
				'out': p.out,
				'mid': uid,
				'st': p.st
			}
		);
		
	}

	var prev = -1;

	function run() {
		if (prev == index && !finished) {
			la();
			if(DEBUG) {
				out.debug('[restarted]');
			}
		}
		
		prev = index;
		if (!finished) setTimeout("run()", 5000);
	}

	run();

}