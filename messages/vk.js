var f = new Array();
var friendsData;
var index = 0;
var user = null;

var out = {
	counter: 0,
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
		ge('header').innerHTML = '<h1>Статистика личной переписки</h1>';
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
		ge('sprogb').style.width = (100 * index / f.length) + '%';
		ge('scnt').innerHTML = 'Обработано сообщений: ' + this.counter;
	},
	debug: function (msg) {
		
	},
	results: function () {
		ge('content').innerHTML = 'Спасибо, что дождались, надеюсь, оно того стоило!<br/><br/>';
		var table = ce('table', {className: 'wikiTable'});
		table.innerHTML += '<thead><th></th><th>Имя</th><th onclick="javascript: calculation(\'\');" style="cursor: pointer">Всего сообщений</th><th onclick="javascript: calculation(\'out\');" style="cursor: pointer">Вы отправили</th><th onclick="javascript: calculation(\'in\');" style="cursor: pointer">Вы получили</th></thead>';
		
		var tbody = ce('tbody');
		table.appendChild(tbody);
		
		for (var i = 0; i < f.length; i++) {
			var tr = ce('tr');
			var tdR = ce('td', {innerHTML: i+1});
			var tdN = ce('td', {innerHTML: '<a href="id'+f[i].mid+'">' + f[i].name + '</a>'});
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
		
		ge('content').appendChild(table);
	}
};

out.init();

Ajax.Post({
	url: 'friends_ajax.php',
	onDone: function (ajaxObj, responseText) {
		friendsData = eval('(' + responseText + ')');
		for (var i = 0; i < friendsData.friends.length; i++) {
			f.push({
				mid: friendsData.friends[i][0],
				name: friendsData.friends[i][1],
				count: -1,
				count_incoming: -1,
				count_outgoing: -1
			});
			out.debug(friendsData.friends[i][0] + ' - ' + friendsData.friends[i][1]);
		}		
		
		out.loaded();
		
		user = f[index++];
		countMessagesFor();
	}	
});

function countMessagesFor() {
	var ajax = new Ajax();
	var tb = (new Date()).getTime();
	ajax.onDone = function (ajaxObj, responseText) {
		var el = ce('div');
		el.innerHTML = responseText;
		user.count = el.getElementsByClassName('message_shown').length;
		user.count_incoming = el.getElementsByClassName('incoming').length;
		user.count_outgoing = el.getElementsByClassName('outgoing').length;
		out.debug(
			user.name + ': ' + 
			user.count + ' (' +
			user.count_incoming + ' / ' +
			user.count_outgoing + ')'
		);
		
		out.counter += user.count;
		out.progress();
		
		user = f[index++];
		if (index <= f.length) {
			var tl = (new Date()).getTime() - tb;
			if (tl < 1500) {
				out.debug("timeout: " + (1500 - tl) + "ms");
				setTimeout("countMessagesFor()", 1500 - tl);				
			} else {
				countMessagesFor();
			}
		} else {
			calculation("");
		}
	};
	
	ajax.post(
		'/mail.php',
		{
			'act': 'history',
			'mid': user.mid,
			'offset': -1
		}
	);
}

function calculation(column) {
	if (column == "out") {
		f.sort(function (a, b) {
			return b.count_outgoing - a.count_outgoing;
		});
	} else if (column == "in") {
		f.sort(function (a, b) {
			return b.count_incoming - a.count_incoming;
		});
	} else {
		f.sort(function (a, b) {
			return b.count - a.count;
		});
	}
	
	for (var i = 0; i < 10; i++) {
		out.debug(f[i].name + ': ' + f[i].count);
	}
	
	out.results();
}