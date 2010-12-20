var getKeys = function(obj){
	var keys = [];
	for(var key in obj){
		keys.push(key);
	}
	return keys;
};

var loadjscssfile = function (filename, filetype){
	if (filetype=="js"){
		var fileref=document.createElement('script')
		fileref.setAttribute("type","text/javascript")
		fileref.setAttribute("src", filename)
	}
	else if (filetype=="css"){
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
	}
	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref)
}

var fixQuot = function(s) {
	if(browser.msie)return s.replace(/\"/g, '&quot;');
	else return s;
}

var nKeys = function(obj){
	var keys = 0;
	for(var key in obj){
		keys ++;
	}
	return keys;
};

var splitArrayToSubArrays = function(arr, maxPieceSize) {
	var result = [];
	for(var i = 0; i < arr.length / maxPieceSize; i ++) {
		result.push(arr.slice(maxPieceSize * i, maxPieceSize * (i + 1)));
	}
	return result;
};

var formatDate = function(date, withMsec) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if(month < 10) month = '0' + month;
	var day = date.getDate();
	if(day < 10) day = '0' + day;
	
	var hours = date.getHours();
	if(hours < 10) hours = '0' + hours;
	
	var minutes = date.getMinutes();
	if(minutes < 10) minutes = '0' + minutes;
	
	var seconds = date.getSeconds();
	if(seconds < 10) seconds = '0' + seconds;
	
	if(withMsec) {
	
		var msec = mod(date.getTime(), 1000);
		if(msec < 100) msec = '0' + msec;
		if(intval(msec) < 10) msec = '0' + msec;
	
		seconds = seconds + '.' + msec;
		
	}
	
	return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
};

var insertAfter = function ( referenceNode, newNode ){
	referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
};

//because when inserted into address bar, expressions with percentage sign tend to get converted to characters
var mod = function(first, second) {
	return first % second;
};

var myCheckChange = function(obj, uid) {
	checkChange(obj,uid);
	if(messagesChecked > SYS.MAX_USERS_AT_ONE_GRAPH) {
		if(user.plotGraphs) {
			ge('plot_graphs_links').style.visibility = 'hidden';
		}
		
	} else {
		if(user.plotGraphs) {
			ge('plot_graphs_links').style.visibility = '';
		}
	}
};


//Here goest the google code closure-compressed md5 calculating function
var rotateLeft=function(a,b){return a<<b|a>>>32-b},addUnsigned=function(a,b){var g,h,i,j,c;i=a&2147483648;j=b&2147483648;g=a&1073741824;h=b&1073741824;c=(a&1073741823)+(b&1073741823);if(g&h)return c^2147483648^i^j;return g|h?c&1073741824?c^3221225472^i^j:c^1073741824^i^j:c^i^j},F=function(a,b,g){return a&b|~a&g},G=function(a,b,g){return a&g|b&~g},H=function(a,b,g){return a^b^g},I=function(a,b,g){return b^(a|~g)},FF=function(a,b,g,h,i,j,c){a=addUnsigned(a,addUnsigned(addUnsigned(F(b,g,h),i),c));return addUnsigned(rotateLeft(a,
j),b)},GG=function(a,b,g,h,i,j,c){a=addUnsigned(a,addUnsigned(addUnsigned(G(b,g,h),i),c));return addUnsigned(rotateLeft(a,j),b)},HH=function(a,b,g,h,i,j,c){a=addUnsigned(a,addUnsigned(addUnsigned(H(b,g,h),i),c));return addUnsigned(rotateLeft(a,j),b)},II=function(a,b,g,h,i,j,c){a=addUnsigned(a,addUnsigned(addUnsigned(I(b,g,h),i),c));return addUnsigned(rotateLeft(a,j),b)},convertToWordArray=function(a){var b,g=a.length;b=g+8;for(var h=((b-mod(b,64))/64+1)*16,i=Array(h-1),j=0,c=0;c<g;){b=(c-mod(c,4))/4;j=mod(c,4)*
8;i[b]|=a.charCodeAt(c)<<j;c++}b=(c-mod(c,4))/4;j=mod(c,4)*8;i[b]|=128<<j;i[h-2]=g<<3;i[h-1]=g>>>29;return i},wordToHex=function(a){var b="",g="",h;for(h=0;h<=3;h++){g=a>>>h*8&255;g="0"+g.toString(16);b+=g.substr(g.length-2,2)}return b},uTF8Encode=function(a){a=a.replace(/\x0d\x0a/g,"\n");for(var b="",g=0;g<a.length;g++){var h=a.charCodeAt(g);if(h<128)b+=String.fromCharCode(h);else{if(h>127&&h<2048)b+=String.fromCharCode(h>>6|192);else{b+=String.fromCharCode(h>>12|224);b+=String.fromCharCode(h>>6&63|128)}b+=
String.fromCharCode(h&63|128)}}return b},md5=function(a){var b=[],g,h,i,j,c,d,e,f;a=uTF8Encode(a);b=convertToWordArray(a);c=1732584193;d=4023233417;e=2562383102;f=271733878;for(a=0;a<b.length;a+=16){g=c;h=d;i=e;j=f;c=FF(c,d,e,f,b[a+0],7,3614090360);f=FF(f,c,d,e,b[a+1],12,3905402710);e=FF(e,f,c,d,b[a+2],17,606105819);d=FF(d,e,f,c,b[a+3],22,3250441966);c=FF(c,d,e,f,b[a+4],7,4118548399);f=FF(f,c,d,e,b[a+5],12,1200080426);e=FF(e,f,c,d,b[a+6],17,2821735955);d=FF(d,e,f,c,b[a+7],22,4249261313);c=FF(c,d,
e,f,b[a+8],7,1770035416);f=FF(f,c,d,e,b[a+9],12,2336552879);e=FF(e,f,c,d,b[a+10],17,4294925233);d=FF(d,e,f,c,b[a+11],22,2304563134);c=FF(c,d,e,f,b[a+12],7,1804603682);f=FF(f,c,d,e,b[a+13],12,4254626195);e=FF(e,f,c,d,b[a+14],17,2792965006);d=FF(d,e,f,c,b[a+15],22,1236535329);c=GG(c,d,e,f,b[a+1],5,4129170786);f=GG(f,c,d,e,b[a+6],9,3225465664);e=GG(e,f,c,d,b[a+11],14,643717713);d=GG(d,e,f,c,b[a+0],20,3921069994);c=GG(c,d,e,f,b[a+5],5,3593408605);f=GG(f,c,d,e,b[a+10],9,38016083);e=GG(e,f,c,d,b[a+15],
14,3634488961);d=GG(d,e,f,c,b[a+4],20,3889429448);c=GG(c,d,e,f,b[a+9],5,568446438);f=GG(f,c,d,e,b[a+14],9,3275163606);e=GG(e,f,c,d,b[a+3],14,4107603335);d=GG(d,e,f,c,b[a+8],20,1163531501);c=GG(c,d,e,f,b[a+13],5,2850285829);f=GG(f,c,d,e,b[a+2],9,4243563512);e=GG(e,f,c,d,b[a+7],14,1735328473);d=GG(d,e,f,c,b[a+12],20,2368359562);c=HH(c,d,e,f,b[a+5],4,4294588738);f=HH(f,c,d,e,b[a+8],11,2272392833);e=HH(e,f,c,d,b[a+11],16,1839030562);d=HH(d,e,f,c,b[a+14],23,4259657740);c=HH(c,d,e,f,b[a+1],4,2763975236);
f=HH(f,c,d,e,b[a+4],11,1272893353);e=HH(e,f,c,d,b[a+7],16,4139469664);d=HH(d,e,f,c,b[a+10],23,3200236656);c=HH(c,d,e,f,b[a+13],4,681279174);f=HH(f,c,d,e,b[a+0],11,3936430074);e=HH(e,f,c,d,b[a+3],16,3572445317);d=HH(d,e,f,c,b[a+6],23,76029189);c=HH(c,d,e,f,b[a+9],4,3654602809);f=HH(f,c,d,e,b[a+12],11,3873151461);e=HH(e,f,c,d,b[a+15],16,530742520);d=HH(d,e,f,c,b[a+2],23,3299628645);c=II(c,d,e,f,b[a+0],6,4096336452);f=II(f,c,d,e,b[a+7],10,1126891415);e=II(e,f,c,d,b[a+14],15,2878612391);d=II(d,e,f,c,
b[a+5],21,4237533241);c=II(c,d,e,f,b[a+12],6,1700485571);f=II(f,c,d,e,b[a+3],10,2399980690);e=II(e,f,c,d,b[a+10],15,4293915773);d=II(d,e,f,c,b[a+1],21,2240044497);c=II(c,d,e,f,b[a+8],6,1873313359);f=II(f,c,d,e,b[a+15],10,4264355552);e=II(e,f,c,d,b[a+6],15,2734768916);d=II(d,e,f,c,b[a+13],21,1309151649);c=II(c,d,e,f,b[a+4],6,4149444226);f=II(f,c,d,e,b[a+11],10,3174756917);e=II(e,f,c,d,b[a+2],15,718787259);d=II(d,e,f,c,b[a+9],21,3951481745);c=addUnsigned(c,g);d=addUnsigned(d,h);e=addUnsigned(e,i);f=
addUnsigned(f,j)}return(wordToHex(c)+wordToHex(d)+wordToHex(e)+wordToHex(f)).toLowerCase()};


var SYS = {
	VERSION: '4.1.0',
	APP_ID: 2045168,
	LOGIN_SETTING: 0 + 2048 + 4096,
	DEBUG: false,
	MESSAGES_TO_PROCESS_IN_DEBUG_MODE: 400,
	MESSAGES_PER_REQUEST: 100,
	MSEC_BETWEEN_REQUESTS: 333,
	MSEC_BETWEEN_REQUESTS_FOR_USERDATA: 1000,
	MAX_USERS_PER_REQUEST: 1000,
	LINK_TO_CLUB: '/club21792535',
	TOO_MANY_REQUESTS_ERR_CODE: 6,
	MAX_USERS_AT_ONE_GRAPH: 3,
	PATH_TO_SWFOBJECT: 'http://vkontakte.ru/js/lib/swfobject2.js',
	LANGUAGES: {
		0: {
			name: 'russian',
			strings: {
				authorizing: 'Авторизация',
				authorized: 'Авторизация завершена',
				loadingMessageNumbers: 'Определение числа сообщений',
				fatal: 'Критическая ошибка. Пожалуйста, сообщите приведённые ниже данные разработчику.',
				appName: 'Статистика личной переписки',
				nameCol: 'Имя',
				kbytes: 'Учитывать размер сообщений',
				settingsText: 'Выберите желаемые параметры',
				startButton: 'Поехали!',
				verbose: 'Логгировать все действия',
				gettingNames: 'Загрузка имён пользователей',
				numberOfMessagesCol: 'Всего сообщений',
				sentCol: 'Отправлено',
				receivedCol: 'Получено',
				symbolsCol: 'Всего символов',
				sentSymbolsCol: 'Отправлено символов',
				receivedSymbolsCol: 'Получено символов',
				lastMsgCol: 'Последнее сообщение',
				processingMessages: 'Обработка сообщений',
				done: 'Обработка завершена',
				messagesProcessed: 'Обработано сообщений',
				incoming: 'входящих',
				outgoing: 'исходящих',
				dayWithMostMessages: 'Больше всего сообщений было',
				timeWithMostMessages: 'Больше всего сообщений',
				thankYou: 'Спасибо, что дождались, надеемся, оно того стоило!',
				exportByTime: 'Экспорт статистики по времени',
				exportByMessages: 'Экспорт статистики по сообщениям',
				warning: 'Внимание! Не удалось обработать сообщений',
				friendsOnly: 'Учитывать только друзей',
				withSelected: 'Выбранные',
				exportToNote: 'экспортировать в заметку',
				ourGroup: 'Наша группа',
				noteSuccess: 'Заметка успешно создана',
				noteFailure: 'Не удалось создать заметку. Попробуйте ещё раз позднее.',
				seeNote: 'Посмотреть',
				wrongPage: 'Чтобы использовать скрипт, вы должны находиться в "Моих Сообщениях"!',
				plotKbytesGraph: 'построить график по числу символов',
				plotMessagesGraph: 'построить график по числу сообщений',
				wantToPlotGraphs: 'Я захочу строить графики общения от времени',
				totalFirstName: 'Общая', 
				totalLastName: 'статистика'
			}
		},
		1: {
			name: 'ukrainian',
			strings: {
				authorizing: 'Авторизація',
				authorized: 'Авторизація завершена',
				loadingMessageNumbers: 'Визначення кількості повідомлень',
				settingsText: 'Виберіть бажані параметри',
				startButton: 'Поїхали!',
				verbose: 'Логгіровать всі дії',
				fatal: 'Критична помилка. Будь ласка, повідомте наведені нижче дані розробнику.',
				appName: 'Статистика приватні переписки',
				nameCol: "Ім'я",
				numberOfMessagesCol: 'Усього повідомлень',
				kbytes: 'Враховувати розмір повідомлень',
				gettingNames: 'Завантаження імен користувачів',
				symbolsCol: 'Всього символів',
				sentSymbolsCol: 'Ви відправили символів',
				receivedSymbolsCol: 'Ви отримали символів',
				sentCol: 'Ви відправили',
				receivedCol: 'Ви одержали',
				lastMsgCol: 'Останнє повідомлення',
				messagesProcessed: 'Оброблене повідомлень',
				processingMessages: 'Обробка повідомлень',
				done: 'Обробка завершена',
				incoming: 'входять',
				outgoing: 'вихідних',
				dayWithMostMessages: 'Найбільше повідомлень було',
				timeWithMostMessages: 'Найбільше повідомлень',
				thankYou: 'Спасибі, що дочекалися, сподіваємося, воно того коштувало!',
				exportByTime: 'Експорт статистики за часом',
				exportByMessages: 'Експорт статистики за повідомленням',
				warning: 'Увага! Не вдалося обробити повідомлень',
				friendsOnly: 'Враховувати тільки друзів',
				withSelected: 'Вибрані',
				exportToNote: 'експортувати в замітку',
				ourGroup: 'Наша група',
				noteSuccess: 'Замітка успішно створена',
				noteFailure: 'Не вдалося створити замітку. Спробуйте ще раз пізніше.',
				seeNote: 'Подивитися',
				wrongPage: 'Щоб запустити скрипт, ви повинні знаходитися в "Моїх повідомленнях"',
				plotKbytesGraph: 'побудувати графік за кількістю символів',
				plotMessagesGraph: 'побудувати графік за кількістю сообщенійь',
				wantToPlotGraphs: 'Я захочу будувати гарні графіки',
				totalFirstName: 'Загальна', 
				totalLastName: 'статистика'
			}
		},
		3: {
			name: 'english',
			strings: {
				authorizing: 'Authorizing',
				authorized: 'Authorization complete',
				loadingMessageNumbers: 'Getting message numbers',
				fatal: 'Fatal error. Please, send the info below to the developers',
				appName: 'Private messages statistics',
				settingsText: 'Set your desired parameters',
				startButton: 'Start',
				verbose: 'Verbose mode',
				kbytes: 'Count message sizes as well',
				nameCol: 'Name',
				numberOfMessagesCol: 'Number of messages',
				gettingNames: 'Loading user names',
				sentCol: 'Sent',
				receivedCol: 'Received',
				symbolsCol: 'Total symbols',
				sentSymbolsCol: 'Sent symbols',
				receivedSymbolsCol: 'Received symbols',
				lastMsgCol: 'Last Message',
				messagesProcessed: 'Messages processed',
				processingMessages: 'Processing messages',
				done: 'Processing complete',
				incoming: 'incoming',
				outgoing: 'outgoing',
				dayWithMostMessages: 'Day with most messages',
				timeWithMostMessages: 'Time with most messages',
				thankYou: 'Thank you for your time, we hope it was worth it!',
				exportByTime: 'Export time statistics',
				exportByMessages: 'Export message statistics',
				warning: 'Warning! Failed to process messages',
				friendsOnly: 'Count only for friends',
				withSelected: 'Selected',
				exportToNote: 'export to note',
				ourGroup: 'Our club',
				noteSuccess: 'Note created successfully',
				noteFailure: 'Failed to create a note. Please try again later',
				seeNote: 'See it',
				wrongPage: 'You need to be at "My Messages" page for this script to run!',
				plotKbytesGraph: 'plot symbol number graph',
				plotMessagesGraph: 'plot message number graph',
				wantToPlotGraphs: 'I\'d like to plot fancy graphs',
				totalFirstName: 'Overall', 
				totalLastName: 'stats'
			}
		}
	},
	
	fatal: function(obj) {
		ui.setHeader(user.lang.fatal);
		ui.clearContent();
		var t = ce('textarea', {'cols': 80, 'rows': 20}, {fontFamily: 'Courier new'});
		t.innerHTML = obj;
		ui.appendContentElement(t);
		throw obj;
	},
	
	log: function(str) {
		str = formatDate(new Date(), true) + ': ' + str;
		var pane = ge('loggerPane');
		if(pane == undefined || pane == null) {
			ui.addLoggerPane();
			pane = ge('loggerPane');
		}
		pane.innerHTML += str + "\n";
		pane.scrollTop = pane.scrollHeight;
	},
};

loadjscssfile(SYS.PATH_TO_SWFOBJECT, "js");

var user = {
	lang: SYS.LANGUAGES[langConfig.id] == undefined ? SYS.LANGUAGES[3].strings : SYS.LANGUAGES[langConfig.id].strings,
	verbose: false,
	kbytes: true,
	friendsOnly: false,
	plotGraphs: true
};


var ui = {
	setTitle: function(string) {
		document.title = string;
	},

	setHeader: function(string) {
		ge('header').innerHTML = string;
		this.setTitle(string);
	},
	
	setContent: function(content) {
		ge('content').innerHTML = content;
	},
	
	clearContent: function() {
		this.setContent('');
	},
	
	appendContentElement: function(element) {
		ge('content').appendChild(element);
	},
	
	createProgressBar: function() {
		var pr = ce('div',
			{id: 'progressbar'},
			{position: 'relative', width: '100%', height: '30px', margin: '3px', backgroundColor: '#DAE2E8'}
		);
		pr.appendChild(
			ce('div',
			{id: 'progressbarbg'}, {width: '0', height: 'inherit', backgroundColor: '#45688E'}
			)
		);
		pr.appendChild(
			ce('div',
			{id: 'progresstext'}, {position: 'absolute', left: '10px', top: '7px', width: '400px', height: 'inherit', color: '#000', zIndex: 69}
			)
		);
		
		this.clearContent();
		this.appendContentElement(pr);
	},
	
	updateProgressBar: function(processedIncoming, totalIncoming, processedOutgoing, totalOutgoing) {
		var processed = processedIncoming + processedOutgoing,
			total = totalIncoming + totalOutgoing,
			percentage = (100 * processed / total);
		ge('progressbarbg').style.width = percentage + '%';
		ge('progresstext').innerHTML = user.lang.messagesProcessed + ': ' +
			user.lang.incoming + ': ' + processedIncoming + '/' + totalIncoming + '; ' +
			user.lang.outgoing + ': ' + processedOutgoing + '/' + totalOutgoing;

		this.setTitle(Math.floor(percentage) + '% ' + user.lang.processingMessages);
	},
	
	sortBy: function(sorted, sortBy) {
		if(sortBy == 'tot-size') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.inSize + b.outSize - (a.inSize + a.outSize);
			});
		}
		
		if(sortBy == 'in-size') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.inSize - a.inSize;
			});
		}
		
		if(sortBy == 'out-size') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.outSize - a.outSize;
			});
		}
		
		if(sortBy == 'tot') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.inM + b.outM - (a.inM + a.outM);
			});
		}
		
		if(sortBy == 'in') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.inM - a.inM;
			});
		}
		
		if(sortBy == 'out') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.outM - a.outM;
			});
		}
		
		if(sortBy == 'date') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.lastMessageDate - a.lastMessageDate;
			});
		}
		
		return sorted;
	},
	
	displayStats: function(stats, userData, sortBy) {
	
		messagesChecked = 0; actionsShown = false;
	
		this.clearContent();
	
		ge('sideBar').style.display = 'none';
		ge('pageBody').style.width = '96%';
		
		var div = ce('div', {className: 'mailbox'});
		div.innerHTML += '<div id="message" class="message" style="visibility:hidden; display:none;"> </div> ';
		
		this.appendContentElement(div);
		
	
		if(user.verbose) {
			SYS.log('Processing complete, rendering results');
		}
		
		var cPane = ce('div', {className: 'bar clearFix actionBar', innerHTML:
			user.lang.thankYou + '<div style="float:right"> &copy; <a href="' + SYS.LINK_TO_CLUB + '" target="_blank">vkontakte-stats</a>, 2010</div>'
		});
		var mActions = ce('div', {id: "message_actions", innerHTML: user.lang.withSelected + ': '}, {visibility: 'hidden'});
		
		mActions.innerHTML += '<a href="#" onclick="statCounter.exportToNote();">' + user.lang.exportToNote + '</a>';
		if(user.plotGraphs) {
			iHTML =  '<span id="plot_graphs_links"> | ';
			iHTML += '<a href="#" onclick="ui.plotGraph(false);" id="plot_msg_graph_link">' + user.lang.plotMessagesGraph + '</a>';
			if(user.kbytes) {
				iHTML += ' | ';
				iHTML += '<a href="#" onclick="ui.plotGraph(true);" id="plot_kb_graph_link">' + user.lang.plotKbytesGraph + '</a>';
			}
			mActions.innerHTML += iHTML + "</span>"
		}
		
		
		cPane.appendChild(ce('div', {id: "graph"}, {display:'none', width: '100%', height: '400px'}) );
		cPane.appendChild(mActions);
		div.appendChild(cPane);
		
		var table = ce('table', {cellspacing: "0", cellpadding: "0", id: 'messages_rows'}, {width: '100%'});
		
		div.appendChild(table);
		
		tableHTML = '<thead>' + '<th class="msg_check" onmouseover="checkOver(this, 0)" onmouseout="checkOut(this, 0)" onclick="myCheckChange(this, 0)"><div class=""></div><input type="hidden" id="post_check_0"></th>' + 
			'<th style="text-align: center, width: 30px"> </th>' + 
			'<th class="messagePicture"> </th>' + 
			'<th class="messageFrom">' + user.lang.nameCol + '</th>' +
			'<th onclick="javascript: ui.sort(\'tot\');" style="cursor: pointer">' + user.lang.numberOfMessagesCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'out\');" style="cursor: pointer">' + user.lang.sentCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'in\');" style="cursor: pointer">' + user.lang.receivedCol + '</th>';
		if(user.kbytes) {
			tableHTML +=
			'<th onclick="javascript: ui.sort(\'tot-size\');" style="cursor: pointer">' + user.lang.symbolsCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'out-size\');" style="cursor: pointer">' + user.lang.sentSymbolsCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'in-size\');" style="cursor: pointer">' + user.lang.receivedSymbolsCol + '</th>';
		}
		
		tableHTML +=
			'<th onclick="javascript: ui.sort(\'date\');" style="cursor: pointer">' + user.lang.lastMsgCol + '</th>' + 
			'</thead>';
			
		table.innerHTML  = tableHTML;

		var tbody = ce('tbody');
		table.appendChild(tbody);
		
		var sorted = [statCounter.ALL_ID].concat(this.sortBy(getKeys(stats), sortBy));

		for(var rank = 0; rank < sorted.length; rank ++) {
			var uid = sorted[rank];
			
			sdata = statCounter.getStatData(uid);
			udata = statCounter.getUserData(uid);
			
			var tr = ce('tr', {id: 'mess' + uid});
			
			var tdR = ce('td', {innerHTML: uid == statCounter.ALL_ID ? '' : rank}, {textAlign: 'center',  width: "30px"});
			var tdS = ce('td', {innerHTML: '<div class=""></div><input type="hidden" id="post_check_' + uid + '">', className: 'msg_check'});
			tdS.setAttribute('onmouseover', "checkOver(this, '" + uid + "')");
			tdS.setAttribute('onmouseout', "checkOut(this, '" + uid + "')");
			tdS.setAttribute('onclick', "myCheckChange(this, '" + uid + "')");
			
			var tdP = ce('td', {innerHTML: uid == statCounter.ALL_ID ? '' : ('<a href="/id' + uid + '" target="_blank"><img src="' + udata.photo + '" /></a>'), className: 'messagePicture'});
			var tdN = ce('td', {innerHTML: (uid == statCounter.ALL_ID ? '' : ('<a href="/id' + uid + '" target="_blank">')) + udata.first_name + ' ' + udata.last_name + (uid == statCounter.ALL_ID ? '' : '</a>'), className: 'messageFrom'});
			var tdT = ce('td', {innerHTML: sdata.inM + sdata.outM});
			var tdO = ce('td', {innerHTML: sdata.outM});
			var tdI = ce('td', {innerHTML: sdata.inM});
			if(user.kbytes) {
				var tdST = ce('td', {innerHTML: sdata.inSize + sdata.outSize});
				var tdSO = ce('td', {innerHTML: sdata.outSize});
				var tdSI = ce('td', {innerHTML: sdata.inSize});
			}
			var tdL = ce('td', {innerHTML: '<a href="mail.php?act=show&id=' + sdata.lastMessageId + '" target="_blank">' + formatDate(new Date(sdata.lastMessageDate * 1000)) + '</a>'});

			tr.appendChild(tdS);
			tr.appendChild(tdR);
			
			tr.appendChild(tdP);
			tr.appendChild(tdN);
			tr.appendChild(tdT);
			tr.appendChild(tdO);
			tr.appendChild(tdI);
			if(user.kbytes) {
				tr.appendChild(tdST);
				tr.appendChild(tdSO);
				tr.appendChild(tdSI);
			}
			tr.appendChild(tdL);
			tbody.appendChild(tr);
		}
	},
	
	sort: function(sortBy) {
		this.displayStats(statCounter.statByUser, statCounter.userData, sortBy);
	},
	
	requestSettings: function() {
	
		this.setHeader(user.lang.appName + ' ' + SYS.VERSION);
		ui.clearContent();
		this.removeLoggerPane();
		
		var mbox = new MessageBox({title: user.lang.settingsText});
		
		mbox.addButton({label: user.lang.startButton, onClick: function() {mbox.hide();messageProcessor.start();}});
		
		html = '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_verbose" /></div>';
		html += '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_kbytes" /></div>';
		html += '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_friends_only" /></div>';
		html += '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_fancy_graphs" /></div>';
		
		mbox.content(html).show();
		
		new Checkbox(ge('param_verbose'), {
			label: user.lang.verbose,
			checked: 0,
			onChange: function() {user.verbose=!user.verbose;}
		});
		
		new Checkbox(ge('param_kbytes'), {
			label: user.lang.kbytes,
			checked: 1,
			onChange: function() {user.kbytes = !user.kbytes;}
		});
		
		new Checkbox(ge('param_friends_only'), {
			label: user.lang.friendsOnly,
			checked: 0,
			onChange: function() {user.friendsOnly = !user.friendsOnly;}
		});
		
		new Checkbox(ge('param_fancy_graphs'), {
			label: user.lang.wantToPlotGraphs,
			checked: 1,
			onChange: function() {user.plotGraphs = !user.plotGraphs;}
		});
	},
	
	addLoggerPane: function(){
		var t = ce('textarea', {'cols': 80, 'rows': 20, id: 'loggerPane'}, {fontFamily: 'Courier new'});
		insertAfter(ge('content'), t);
	},
	
	removeLoggerPane: function() {
		var a = ge('loggerPane');
		if( a != undefined) {
			a.parentNode.removeChild(a);
		}
	},
	
	onNoteNotCreated: function() {
		ge('message').innerHTML = user.lang.noteFailure;
		ge('message').style.display = 'block';
		ge('message').style.visibility = 'visible';
	},
	
	onNoteCreated: function(nid) {
		ge('message').innerHTML = user.lang.noteSuccess + ". <a href=\"/note" + user.uid + '_' + nid + '" target="_blank">' + user.lang.seeNote + '</a>';
		ge('message').style.display = 'block';
		ge('message').style.visibility = 'visible';
	},
	
	sentColors: [0x67dc3e, 0xf3c740, 0xf0483b],
	receivedColors: [0x7fc966, 0xedcb65, 0xf06459],
	
	plotGraph: function(kBytes) {
	
		ge('graph').style.display = '';
		var commonVars = {
			isRTL: window.is_rtl,
			'lang.select_graphs':fixQuot('filter'),
			'lang.months':fixQuot('January,February,March,April,May,June,July,August,September,October,November,December'),
			'lang.dayMonths':fixQuot('January,February,March,April,May,June,July,August,September,October,November,December'),
			'lang.dateFormats.day_fullmon_year_hour':fixQuot('{day} {dayMonth} {year}, {hour12}:00'),
			'lang.dateFormats.day_fullmon_year':fixQuot('{month} {day}, {year}'),
			'lang.dateFormats.day_mon':fixQuot('{day} {month}'),
			'lang.dateFormats.day_fullmon':fixQuot('{day} {month}'),
			'lang.loading': fixQuot('Loading...'),
			'lang.no_data': fixQuot('No input data'),
			'lang.data_empty': fixQuot('Input data is empty'),
			'lang.error_loading': fixQuot('Loading error')
		};
		var params = {
			allowfullscreen: 'true'
		};
		flashVars = clone(commonVars);
		
		var table = ge('messages_rows');
		var graphData = '[';
		var rank = 0;
		for (var i = 0; i < table.rows.length; ++i) {
			var row = table.rows[i];
			var id = row.id ? intval(row.id.replace(/^mess/, '')) : 0;
			if (id) {
				if(intval(ge('post_check_' + id).value)) {
					if(rank > 0) {
						graphData += ',';
					}
					
					if(kBytes) {
						var totBytesSent = 0, totBytesRec = 0;
						var receivedSizes = '{"c": ' + this.receivedColors[rank] + ',"f": 0, "d": [';
						var sentSizes = '{"c": ' + this.sentColors[rank] + ',"f": 0, "d": [';
					} else {
						var totSent = 0, totRec = 0;
						var sentMessages = '{"c": ' + this.sentColors[rank] + ',"f": 0, "d": [';
						var receivedMessages = '{"c": ' + this.receivedColors[rank] + ',"f": 0, "d": [';
					}
					for(var entry in statCounter.getStatData(id).history) {
						var histData = statCounter.getStatData(id).history[entry]
						
						if(kBytes) {
							totBytesSent += histData.outSize;
							totBytesRec += histData.inSize;
							sentSizes += '[' + entry + ',' + totBytesSent + ', "-"],';
							receivedSizes += '[' + entry + ',' + totBytesRec + '],';
						} else {
							totSent += histData.outM;
							totRec += histData.inM;
							sentMessages += '[' + entry + ',' + totSent + ', "-"],';
							receivedMessages += '[' + entry + ',' + totRec + '],';
						}
					}
					
					
					
					if(kBytes) {
						sentSizes += '[' + statCounter.lastMessageTime + ',' + totBytesSent + ', "-"]], "name": "' + statCounter.getUserData(id).first_name + ' ' + statCounter.getUserData(id).last_name + ': ' + user.lang.sentCol + '"}';
						receivedSizes += '[' + statCounter.lastMessageTime + ',' + totBytesRec + ']], "name": "' + statCounter.getUserData(id).first_name + ' ' + statCounter.getUserData(id).last_name + ': ' + user.lang.receivedCol + '"}';
						graphData += sentSizes + ',' + receivedSizes;
					} else {
						sentMessages += '[' + statCounter.lastMessageTime + ',' + totSent + ', "-"]], "name": "' + statCounter.getUserData(id).first_name + ' ' + statCounter.getUserData(id).last_name + ': ' + user.lang.sentCol + '"}';
						receivedMessages += '[' + statCounter.lastMessageTime + ',' + totRec + ']], "name": "' + statCounter.getUserData(id).first_name + ' ' + statCounter.getUserData(id).last_name + ': ' + user.lang.receivedCol + '"}';
						graphData += sentMessages + ',' + receivedMessages;
					}
					
					rank ++;
				}
			}
		}
		flashVars.graphdata = fixQuot(graphData + ']');
		if(user.verbose) {
			SYS.log('plotting: ' + flashVars.graphdata);
		}
		flashVars.div_id = 'graph';
		swfobject.embedSWF("/swf/graph.swf?0.28", "graph", "100%", "400px", "8", "", flashVars, params);
		
	}
};

//TODO: add date statistics
var statCounter = {
	statByUser: {},
	userData: {},
	lastMessageTime: 0,
	overallStats: {
		inM: 0,
		outM: 0,
		lastMessageDate: 0,
		lastMessageId: 0,
		inSize: 0,
		outSize: 0,
		history: {}
	},
	ALL_ID: -1,
	
	createEmptyStatsFor: function(message) {
		var newStats = {
			inM: 0,
			outM: 0,
			lastMessageDate: message.date,
			lastMessageId: message.mid,
			inSize: 0,
			outSize: 0,
			history: {}
			// TODO: add words distribution
		};
		this.statByUser[message.uid] = newStats;
		return newStats;
	},
	
	updateStats: function(message, userStats) {
		if(userStats.lastMessageDate < message.date) {
			userStats.lastMessageDate = message.date;
			userStats.lastMessageId = message.mid;
		}
		
		if(statCounter.lastMessageTime < message.date) {
			statCounter.lastMessageTime = message.date;
		}
		
		if(!message.out) {
			userStats.inM ++;
			userStats.inSize += message.body.length;
		} else {
			userStats.outM ++;
			userStats.outSize += message.body.length;
		}
		if(user.plotGraphs) {
			userStats.history[message.date] = {inM: message.out ? 0 : 1, outM: message.out ? 1 : 0, inSize: message.out ? 0 : message.body.length, outSize: message.out ? message.body.length : 0};
		}
	},
	
	processSingleMessage: function(message) {
		userStats = this.statByUser[message.uid];
		if(userStats == undefined) {
			userStats = this.createEmptyStatsFor(message);
		}
		this.updateStats(message, userStats);
		this.updateStats(message, this.overallStats);
		
	},
	
	getStatData: function(id) {
		if(id == this.ALL_ID) {
			return this.overallStats;
		}
		
		return this.statByUser[id];
	},
	
	getUserData: function(id) {
		if(id == this.ALL_ID) {
			return {first_name: user.lang.totalFirstName, last_name : user.lang.totalLastName};
		}
		
		return (this.userData[id] == undefined ? {first_name: 'DELETED', last_name : 'DELETED'} : this.userData[id]);
	},
	
	generateNoteContents: function() {
		var value = "[[club21792535|vkontakte-stats]]\n\n";
		value += "{|\n";
		value += "|-\n";
		value += "! ";
		value += "!! " + user.lang.nameCol;
		value += "!! " + user.lang.numberOfMessagesCol;
		value += "!! " + user.lang.sentCol;
		value += "!! " + user.lang.receivedCol
		if(user.kbytes) {
			value += "!! " + user.lang.symbolsCol;
			value += "!! " + user.lang.sentSymbolsCol;
			value += "!! " + user.lang.receivedSymbolsCol;
		}
		
		value += "\n";
		
		var rank = 0;
		var table = ge('messages_rows');
		for (var i = 0; i < table.rows.length; ++i) {
			var row = table.rows[i];
			var id = row.id ? row.id.replace(/^mess/, '') : 0;
			if (id != 0) {
				if(id != this.ALL_ID) {
					rank++;
				}
				if(intval(ge('post_check_' + id).value)) {
					
					sdata = this.getStatData(id);
					udata = this.getUserData(id);
					
					value += "|-\n";
					value += "| " + (id != this.ALL_ID ? rank : '') + "\n";
					value += "| [[id" + id + "|" + udata.first_name + ' ' + udata.last_name + "]]\n";
					value += "| " + (sdata.inM + sdata.outM) + "\n";
					value += "| " + sdata.outM + "\n";
					value += "| " + sdata.inM + "\n";
					if(user.kbytes) {
						value += "| " + (sdata.inSize + sdata.outSize) + "\n";
						value += "| " + sdata.outSize + "\n";
						value += "| " + sdata.inSize + "\n";
					}
				}
			}	
		}
		
		value += "|}\n";
		
		return value;
	},
	
	exportToNote: function() {
		apiConnector.createNote(user.lang.appName, this.generateNoteContents(), function(ao, rt) {
			parsedResponse = eval('(' + rt + ')');
			if(parsedResponse.response == undefined) {
				SYS.log('Note creationg failed!' + rt);
				ui.onNoteNotCreated();
			} else {
				var nid = parsedResponse.response.nid;
				if(user.verbose) {
					SYS.log('Note created: ' + nid);
				}
				ui.onNoteCreated(nid);
			}
		})
	}
};

var messageProcessor = {

	incomingMessages: undefined,
	processedIncomingMessages: 0,
	outgoingMessages: undefined,
	processedOutgoingMessages: 0,
	
	onUserProfilesLoaded: function(response) {
		parsedResponse = eval('(' + response + ')');
		if(parsedResponse.response == undefined) {
			SYS.fatal(response);
		}
		
		parsedResponse = parsedResponse.response;
		
		for(var i = 0; i < parsedResponse.length; i ++) {
			statCounter.userData[parsedResponse[i].uid] = parsedResponse[i];
		}
		
		this.pendingUserDataRequests--;
		
		if(user.verbose) {
			SYS.log('Got user profile data, ' + (this.pendingUserDataRequest) + ' goes remaining');
		}
		
		if(this.pendingUserDataRequests <= 0) {
			ui.setHeader(user.lang.done + '!');
			ui.displayStats(statCounter.statByUser, statCounter.userData, user.kbytes ? 'tot-size' : 'tot');
		}
		
	},
	
	onAllMessagesLoaded: function() {
		ui.updateProgressBar(this.processedIncomingMessages, this.incomingMessages, this.processedOutgoingMessages, this.outgoingMessages);
		
		ui.setHeader(user.lang.gettingNames + '...');
		
		if(user.verbose) {
			SYS.log('Got all messages, getting user names');
		}
		
		this.api.getUserNames(getKeys(statCounter.statByUser),function(ao,rt) {messageProcessor.onUserProfilesLoaded(rt);});
	},
	
	onMessagesLoaded: function(parsedResponse, out) {
	
		var offset = 0;
		
		if(parsedResponse.response != undefined) {
		
			parsedResponse = parsedResponse.response;
			var currentMessages = parsedResponse[0];
			
			if(user.verbose) {
				SYS.log('Got ' + (parsedResponse.length - 1) + ' messages');
			}
			
			for(var i = 1; i < parsedResponse.length; i ++) {
				statCounter.processSingleMessage(parsedResponse[i]);
			}
			
			
			if(!out) {
				this.processedIncomingMessages += parsedResponse.length - 1;
				offset = this.processedIncomingMessages + (currentMessages - this.incomingMessages);
				
				if(currentMessages != this.incomingMessages && user.verbose) {
					SYS.log('By the way, the user has received ' + (currentMessages - this.incomingMessages) + ' message(s) after the script was started');
				}
				
				if(offset >= currentMessages || (SYS.DEBUG && offset >= SYS.MESSAGES_TO_PROCESS_IN_DEBUG_MODE)) {
					out = 1;
					offset = 0;
				}
			} else {
				this.processedOutgoingMessages += parsedResponse.length - 1;
				offset = this.processedOutgoingMessages + (currentMessages - this.outgoingMessages);
				
				if(currentMessages != this.outgoingMessages && user.verbose) {
					SYS.log('By the way, the user has sent ' + (currentMessages - this.outgoingMessages) + ' message(s) after the script was started');
				}
				
				if(offset >= currentMessages || (SYS.DEBUG && offset >= SYS.MESSAGES_TO_PROCESS_IN_DEBUG_MODE)) {
					this.onAllMessagesLoaded();
					return;
				}
			}
			
			ui.updateProgressBar(this.processedIncomingMessages, this.incomingMessages, this.processedOutgoingMessages, this.outgoingMessages);
		} else {
			out = this.out;
			offset = this.offset;
		}
		
		
		
		var elapsedTime = (new Date()).getTime() - this.requestStartTime;
		
		if(user.verbose) {
			SYS.log('Elapsed time:  ' + elapsedTime + ' ms');
		}
		
		if(elapsedTime >= SYS.MSEC_BETWEEN_REQUESTS) {
			if(user.verbose) {
				SYS.log('Starting new request...');
			}
			this.requestStartTime = (new Date()).getTime();
			this.api.getMessages(out, offset, SYS.MESSAGES_PER_REQUEST, function(response) {messageProcessor.onMessagesLoaded(response, out)});
		} else {
			this.out = out;
			this.offset = offset;
			if(user.verbose) {
				SYS.log('Scheduling new request in ' + (SYS.MSEC_BETWEEN_REQUESTS - elapsedTime) + 'ms');
			}
			setTimeout("messageProcessor.requestStartTime = (new Date()).getTime(); messageProcessor.api.getMessages(messageProcessor.out, messageProcessor.offset, SYS.MESSAGES_PER_REQUEST, function(response) {messageProcessor.onMessagesLoaded(response, messageProcessor.out)});", SYS.MSEC_BETWEEN_REQUESTS - elapsedTime);
		}
	},
	
	startProcessingMessages: function() {
		ui.setHeader(user.lang.processingMessages + '...');
		ui.createProgressBar();
		ui.updateProgressBar(0, this.incomingMessages, 0, this.outgoingMessages);
		this.requestStartTime = (new Date()).getTime();
		
		this.api.getMessages(0, 0, SYS.MESSAGES_PER_REQUEST, function(response) {messageProcessor.onMessagesLoaded(response, 0)});
	},

	onMessageNumbersLoaded: function(parsedResponse, out) {
		var parsedResponse = parsedResponse.response;
		
		if(user.verbose) {
			SYS.log('Loaded message numbers [' + out + ']: ' + parsedResponse[0]);
		}
		
		if(!out) {
			this.incomingMessages = parsedResponse[0];
		} else {
			this.outgoingMessages = parsedResponse[0];
		}
		
		if(this.incomingMessages != undefined && this.outgoingMessages != undefined) {
			setTimeout(function() {messageProcessor.startProcessingMessages()}, SYS.MSEC_BETWEEN_REQUESTS);
		}
	},

	getNumberOfMessages: function() {
		this.api.getMessages(0, 0, 1, function(response) {messageProcessor.onMessageNumbersLoaded(response, 0)});
		setTimeout(function() {apiConnector.getMessages(1, 0, 1, function(response) {messageProcessor.onMessageNumbersLoaded(response, 1)})}, SYS.MSEC_BETWEEN_REQUESTS * 2);
	},

	start: function() {
	
		this.api = apiConnector;
	
		if(user.verbose) {
			ui.addLoggerPane();
			SYS.log('Started');
		}

		ui.setHeader(user.lang.loadingMessageNumbers);
		this.getNumberOfMessages();
	}
};

var apiConnector = {

	API_ADDRESS: '/api.php',
	API_VERSION: '3.0',
	LOGON_FAIL_STRING: 'login_fail',
	LOGON_SUCCESS_STRING: 'login_success',

	logon: function(appId, settings) {
	
		this.appId = appId;
		
		var logonFrame = ce("iframe", {
			src: '/login.php?app=' + appId + '&layout=popup&type=browser&settings=' + settings
		}, {position: 'relative', width: '100%', height: '500px'});
		logonFrame.setAttribute('onload', "apiConnector.onLogonFrameLoaded(this.contentWindow.location.href)");
		
		ui.setHeader(user.lang.authorizing + '...');
		
		ui.clearContent();
		ui.appendContentElement(logonFrame);
		
		
	},
	
	onLogonFrameLoaded: function(frameLocation) {
		var location = unescape(frameLocation);
		if(location.indexOf(this.LOGON_FAIL_STRING) != -1) {
			SYS.fatal('failed to log on: ' + location);
		}
		
		if(location.indexOf(this.LOGON_SUCCESS_STRING) != -1) {
		
			sessionInfo = eval('(' + location.split('#')[1].split('=')[1] + ')');
			
			user.uid = sessionInfo.mid;
			this.secret = sessionInfo.secret;
			this.sid = sessionInfo.sid;
			
			ui.setHeader(user.lang.authorized);
			ui.clearContent();
			
			ui.requestSettings();
			
		} else {
			//Waiting for the user to hit 'Allow'
		}
	},
	
	getMessages: function(out, offset, count, onDone) {
		if(user.verbose) {
			SYS.log('getMessages invoked: out=' + out + "; offset=" + offset);
		}

		var toMd5 = user.uid;
		
		var previewLength = user.kbytes ? 0 : 1;
		
		toMd5 += 'api_id' + '=' + this.appId;
		toMd5 += 'count=' + count;
		if(user.friendsOnly) {
			toMd5  += 'filters=4';
		}
		toMd5 += 'format=JSON';
		toMd5 += 'method=messages.get';
		toMd5 += 'offset=' + offset;
		toMd5 += 'out=' + out;
		toMd5 += 'preview_length=' + previewLength;
		toMd5 += 'v=' + this.API_VERSION,
		toMd5 += this.secret;
		
		var ajax = new Ajax();
		ajax.onDone = function(ao,rt) {
			var parsedResponse = eval('(' + rt + ')');
			if(parsedResponse.error != undefined) {
				if(parsedResponse.error.error_code == SYS.TOO_MANY_REQUESTS_ERR_CODE) {
					if(user.verbose) {
						SYS.log('too many requests: ' + rt);
					}
					onDone({});
				} else {
					SYS.fatal(rt);
				}
			} else {
				onDone(parsedResponse);
			}
		};
		
		
		params = {
			api_id: apiConnector.appId,
			count: count,
			format: 'JSON',
			method: 'messages.get',
			offset: offset,
			out:out,
			preview_length: previewLength,
			sid: apiConnector.sid,
			sig: md5(toMd5),
			v: this.API_VERSION
		};
		
		if(user.friendsOnly) {
			params.filters = 4;
		}
		
		ajax.post(this.API_ADDRESS, params);
	},
	
	doGetUserData: function(ids, onDone) {
		if(user.verbose) {
			SYS.log('doGetUserData invoked: ids=' + ids);
		}
		var toMd5 = user.uid;
		
		toMd5 += 'api_id' + '=' + this.appId;
		toMd5 += 'fields=photo';
		toMd5 += 'format=JSON';
		toMd5 += 'method=getProfiles';
		
		var uids = ids.join(',');
		toMd5 += 'uids=' + uids;
		
		toMd5 += 'v=' + this.API_VERSION;
		toMd5 += this.secret;
		
		var ajax = new Ajax();
		ajax.onDone = onDone;
		
		ajax.post(this.API_ADDRESS, {
			api_id: apiConnector.appId,
			fields: 'photo',
			format: 'JSON',
			method: 'getProfiles',
			sid: apiConnector.sid,
			sig: md5(toMd5),
			uids: uids,
			v: this.API_VERSION
		});
		
	},
	
	getUserNames: function(ids, onDone) {
		ids = splitArrayToSubArrays(ids, SYS.MAX_USERS_PER_REQUEST);
		this.onDone = onDone;
		messageProcessor.pendingUserDataRequests = ids.length;
		for(var i = 0; i < ids.length; i ++) {
			setTimeout('apiConnector.doGetUserData([' + ids[i] + '], apiConnector.onDone)', (i + 1) * SYS.MSEC_BETWEEN_REQUESTS_FOR_USERDATA);
		}
	},
	
	createNote: function(title, text, onDone) {
		if(user.verbose) {
			SYS.log('createNote invoked: title=' + title + '; text=' + text);
		}
		var toMd5 = user.uid;
		
		toMd5 += 'api_id' + '=' + this.appId;
		toMd5 += 'format=JSON';
		toMd5 += 'method=notes.add';
		
		toMd5 += 'text=' + text;
		toMd5 += 'title=' + title;
		
		toMd5 += 'v=' + this.API_VERSION;
		toMd5 += this.secret;
		
		var ajax = new Ajax();
		ajax.onDone = onDone;
		
		ajax.post(this.API_ADDRESS, {
			api_id: apiConnector.appId,
			format: 'JSON',
			method: 'notes.add',
			sid: apiConnector.sid,
			sig: md5(toMd5),
			text: text,
			title: title,
			v: this.API_VERSION
		});
	}
};

if(/http:\/\/((vk\.com)|(vkontakte.ru))\/mail.php.*/.test(location.href)) {
	apiConnector.logon(SYS.APP_ID, SYS.LOGIN_SETTING);
} else {
	alert(user.lang.wrongPage);
}