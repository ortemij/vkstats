var uid;
var nav = ge('nav');
each (nav.childNodes, function (i, x) {
	if (x.firstChild != null && x.firstChild.href.match(/mail.php/)) {
		var h = x.firstChild.href.split('?id=');
		uid = h[1];
	}
});

var stats = {};
var f = [];
var href2name = {};
var dates = {};
var times = {};

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
			out.debug('finished');
			calculation();
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
		ge('header').innerHTML = '<h1>Статистика личной переписки 2</h1>';
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
		ge('scnt').innerHTML = 'Обработано сообщений: ' + index;
	},
	debug: function (msg) {
		
	},
	generateCount: function () {
		this.countDiv = ce('div');
		
		var table = ce('table', {className: 'wikiTable'});
		table.innerHTML += '<thead><th></th><th>Имя</th><th onclick="javascript: calculation();" style="cursor: pointer">Всего сообщений</th><th onclick="javascript: calculation(\'out\');" style="cursor: pointer">Вы отправили</th><th onclick="javascript: calculation(\'in\');" style="cursor: pointer">Вы получили</th></thead>';
		
		var tbody = ce('tbody');
		table.appendChild(tbody);
		
		for (var i = 0; i < f.length; i++) {
			var tr = ce('tr');
			var tdR = ce('td', {innerHTML: i+1});
			var tdN = ce('td', {innerHTML: '<a href="'+f[i].href+'">' + f[i].name + '</a>'});
			var tdT = ce('td', {innerHTML: f[i].count});
			var tdO = ce('td', {innerHTML: f[i].count_outgoing});
			var tdI = ce('td', {innerHTML: f[i].count_incoming});
			
			tr.appendChild(tdR);
			tr.appendChild(tdN);
			tr.appendChild(tdT);
			tr.appendChild(tdO);
			tr.appendChild(tdI);
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
		
		this.timeDiv.innerHTML = 'Больше всего сообщений было ' + maxDate + ' &mdash; ' + maxDV;
		this.timeDiv.innerHTML += '<br/>Больше всего сообщений ' + maxTime + ' &mdash; ' + maxTV;		
		
		ge('content').appendChild(this.timeDiv);
	},
	generate: function () {
		ge('content').innerHTML = 'Спасибо, что дождались, надеюсь, оно того стоило!<br/><br/>';
		this.generateTime();
		ge('content').innerHTML += '<a href="#" onclick="javascript: out.exportDT();">Экспорт статистики по времени</a> | <a href="#" onclick="javascript: out.exportMsgs();">Экспорт статистики по сообщениям</a><br/>';
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

function calculation(t) {
	if (f.length == 0) {
		for (var key in stats) {
			f.push({
				href: key,
				name: href2name[key],
				count: stats[key].count_out + stats[key].count_in,
				count_incoming: stats[key].count_in,
				count_outgoing: stats[key].count_out
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
		out.debug('end of incoming = ' + ei);
		
		Ajax.Get({
			url: 'mail.php?id=' + uid + '&out=1',
			onDone: function (ao, rt) {
				var res = eval('(' + rt + ')');
				eo = res.count;
				out.debug('end of outgoing = ' + eo);
				out.loaded();
				setTimeout("la()", 1000);
			}
		})
	}
});

function la() {
	var ajax = new Ajax();
	var start = (new Date()).getTime();
	ajax.onDone = function (ao, rt) {
		if (ao.data.st != p.st || ao.data.out != p.out) return; // synchronization failed
	
		var r = eval('(' + rt + ')'),
			t = r.content,
			d = ce('div');
		d.innerHTML = t;
		each (
			geByClass('name', d, 'div'), 
			function (i, x) {
				var href = x.children[0].href;
				var name = x.children[0].innerHTML;
				var ch = x.parentNode.children;
				var dt = ch[ch.length - 1].innerHTML.split(' в ');
				var dt2 = dt[1].split('<br>');
				if (dates[dt[0]] == undefined) dates[dt[0]] = {inb: 0, out: 0};
				if (times[dt2[0]] == undefined) times[dt2[0]] = {inb: 0, out: 0};
								
				if (href2name[href] == undefined) {
					href2name[href] = name;
					//out.debug('[h2n] ' + href + ' -> ' + name);
				}
				
				if (stats[href] == undefined) {
					stats[href] = {
						count_out: 0,
						count_in: 0
					};
					//out.debug('[stats] ' + href + ' started');
				}
				
				if (ao.data.out == 0) {
					stats[href].count_in++;
					dates[dt[0]].inb++;
					times[dt2[0]].inb++;
				} else {
					stats[href].count_out++;
					dates[dt[0]].out++;
					times[dt2[0]].out++;
				}
	
				//out.debug('[stats] ' + href + ' handled');									
			}
		);
		
		out.debug('[ajax] handled');
		
		index += 20;
		out.progress();
		
		var spent = (new Date()).getTime() - start;
		p.st += 20;
		if (p.st < ((p.out == 0) ? ei : eo)) {
			if (spent < 1000) {
				setTimeout("la()", 1000 - spent);
				out.debug('[timeout] ' + (1000 - spent) + 'ms');
			} else {
				la();
			}
		} else {
			p.hd();
		}
	};
	
	out.debug('[ajax] st='+p.st+', out='+p.out);
	
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

function stable() {
	if (prev == index && !finished) {
		la();
		out.debug('[restarted]');
	}
	
	prev = index;
	if (!finished) setTimeout("stable()", 5000);
}

stable();

