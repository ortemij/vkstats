var getKeys = function(obj){
	var keys = [];
	for(var key in obj){
		keys.push(key);
	}
	return keys;
}

var nKeys = function(obj){
	var keys = 0;
	for(var key in obj){
		keys ++;
	}
	return keys;
}

var splitArrayToSubArrays = function(arr, maxPieceSize) {
	var result = [];
	for(var i = 0; i < arr.length / maxPieceSize; i ++) {
		result.push(arr.slice(maxPieceSize * i, maxPieceSize * (i + 1)));
	}
	return result;
}

var formatDate = function(date) {
	var year = date.getFullYear();
	var month = date.getMonth();
	if(month < 10) month = '0' + month;
	var day = date.getDay();
	if(day < 10) day = '0' + day;
	
	var hours = date.getHours();
	if(hours < 10) hours = '0' + hours;
	
	var minutes = date.getMinutes();
	if(minutes < 10) minutes = '0' + minutes;
	
	var seconds = date.getSeconds();
	if(seconds < 10) seconds = '0' + seconds;
	
	return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}


//Here goest the google code closure-compressed md5 calculating function
var rotateLeft=function(a,b){return a<<b|a>>>32-b},addUnsigned=function(a,b){var g,h,i,j,c;i=a&2147483648;j=b&2147483648;g=a&1073741824;h=b&1073741824;c=(a&1073741823)+(b&1073741823);if(g&h)return c^2147483648^i^j;return g|h?c&1073741824?c^3221225472^i^j:c^1073741824^i^j:c^i^j},F=function(a,b,g){return a&b|~a&g},G=function(a,b,g){return a&g|b&~g},H=function(a,b,g){return a^b^g},I=function(a,b,g){return b^(a|~g)},FF=function(a,b,g,h,i,j,c){a=addUnsigned(a,addUnsigned(addUnsigned(F(b,g,h),i),c));return addUnsigned(rotateLeft(a,
j),b)},GG=function(a,b,g,h,i,j,c){a=addUnsigned(a,addUnsigned(addUnsigned(G(b,g,h),i),c));return addUnsigned(rotateLeft(a,j),b)},HH=function(a,b,g,h,i,j,c){a=addUnsigned(a,addUnsigned(addUnsigned(H(b,g,h),i),c));return addUnsigned(rotateLeft(a,j),b)},II=function(a,b,g,h,i,j,c){a=addUnsigned(a,addUnsigned(addUnsigned(I(b,g,h),i),c));return addUnsigned(rotateLeft(a,j),b)},convertToWordArray=function(a){var b,g=a.length;b=g+8;for(var h=((b-b%64)/64+1)*16,i=Array(h-1),j=0,c=0;c<g;){b=(c-c%4)/4;j=c%4*
8;i[b]|=a.charCodeAt(c)<<j;c++}b=(c-c%4)/4;j=c%4*8;i[b]|=128<<j;i[h-2]=g<<3;i[h-1]=g>>>29;return i},wordToHex=function(a){var b="",g="",h;for(h=0;h<=3;h++){g=a>>>h*8&255;g="0"+g.toString(16);b+=g.substr(g.length-2,2)}return b},uTF8Encode=function(a){a=a.replace(/\x0d\x0a/g,"\n");for(var b="",g=0;g<a.length;g++){var h=a.charCodeAt(g);if(h<128)b+=String.fromCharCode(h);else{if(h>127&&h<2048)b+=String.fromCharCode(h>>6|192);else{b+=String.fromCharCode(h>>12|224);b+=String.fromCharCode(h>>6&63|128)}b+=
String.fromCharCode(h&63|128)}}return b},md5=function(a){var b=[],g,h,i,j,c,d,e,f;a=uTF8Encode(a);b=convertToWordArray(a);c=1732584193;d=4023233417;e=2562383102;f=271733878;for(a=0;a<b.length;a+=16){g=c;h=d;i=e;j=f;c=FF(c,d,e,f,b[a+0],7,3614090360);f=FF(f,c,d,e,b[a+1],12,3905402710);e=FF(e,f,c,d,b[a+2],17,606105819);d=FF(d,e,f,c,b[a+3],22,3250441966);c=FF(c,d,e,f,b[a+4],7,4118548399);f=FF(f,c,d,e,b[a+5],12,1200080426);e=FF(e,f,c,d,b[a+6],17,2821735955);d=FF(d,e,f,c,b[a+7],22,4249261313);c=FF(c,d,
e,f,b[a+8],7,1770035416);f=FF(f,c,d,e,b[a+9],12,2336552879);e=FF(e,f,c,d,b[a+10],17,4294925233);d=FF(d,e,f,c,b[a+11],22,2304563134);c=FF(c,d,e,f,b[a+12],7,1804603682);f=FF(f,c,d,e,b[a+13],12,4254626195);e=FF(e,f,c,d,b[a+14],17,2792965006);d=FF(d,e,f,c,b[a+15],22,1236535329);c=GG(c,d,e,f,b[a+1],5,4129170786);f=GG(f,c,d,e,b[a+6],9,3225465664);e=GG(e,f,c,d,b[a+11],14,643717713);d=GG(d,e,f,c,b[a+0],20,3921069994);c=GG(c,d,e,f,b[a+5],5,3593408605);f=GG(f,c,d,e,b[a+10],9,38016083);e=GG(e,f,c,d,b[a+15],
14,3634488961);d=GG(d,e,f,c,b[a+4],20,3889429448);c=GG(c,d,e,f,b[a+9],5,568446438);f=GG(f,c,d,e,b[a+14],9,3275163606);e=GG(e,f,c,d,b[a+3],14,4107603335);d=GG(d,e,f,c,b[a+8],20,1163531501);c=GG(c,d,e,f,b[a+13],5,2850285829);f=GG(f,c,d,e,b[a+2],9,4243563512);e=GG(e,f,c,d,b[a+7],14,1735328473);d=GG(d,e,f,c,b[a+12],20,2368359562);c=HH(c,d,e,f,b[a+5],4,4294588738);f=HH(f,c,d,e,b[a+8],11,2272392833);e=HH(e,f,c,d,b[a+11],16,1839030562);d=HH(d,e,f,c,b[a+14],23,4259657740);c=HH(c,d,e,f,b[a+1],4,2763975236);
f=HH(f,c,d,e,b[a+4],11,1272893353);e=HH(e,f,c,d,b[a+7],16,4139469664);d=HH(d,e,f,c,b[a+10],23,3200236656);c=HH(c,d,e,f,b[a+13],4,681279174);f=HH(f,c,d,e,b[a+0],11,3936430074);e=HH(e,f,c,d,b[a+3],16,3572445317);d=HH(d,e,f,c,b[a+6],23,76029189);c=HH(c,d,e,f,b[a+9],4,3654602809);f=HH(f,c,d,e,b[a+12],11,3873151461);e=HH(e,f,c,d,b[a+15],16,530742520);d=HH(d,e,f,c,b[a+2],23,3299628645);c=II(c,d,e,f,b[a+0],6,4096336452);f=II(f,c,d,e,b[a+7],10,1126891415);e=II(e,f,c,d,b[a+14],15,2878612391);d=II(d,e,f,c,
b[a+5],21,4237533241);c=II(c,d,e,f,b[a+12],6,1700485571);f=II(f,c,d,e,b[a+3],10,2399980690);e=II(e,f,c,d,b[a+10],15,4293915773);d=II(d,e,f,c,b[a+1],21,2240044497);c=II(c,d,e,f,b[a+8],6,1873313359);f=II(f,c,d,e,b[a+15],10,4264355552);e=II(e,f,c,d,b[a+6],15,2734768916);d=II(d,e,f,c,b[a+13],21,1309151649);c=II(c,d,e,f,b[a+4],6,4149444226);f=II(f,c,d,e,b[a+11],10,3174756917);e=II(e,f,c,d,b[a+2],15,718787259);d=II(d,e,f,c,b[a+9],21,3951481745);c=addUnsigned(c,g);d=addUnsigned(d,h);e=addUnsigned(e,i);f=
addUnsigned(f,j)}return(wordToHex(c)+wordToHex(d)+wordToHex(e)+wordToHex(f)).toLowerCase()};


var SYS = {
	VERSION: '4.0.0b',
	APP_ID: 2045168,
	LOGIN_SETTING: 0 + 4096,
	DEBUG: false,
	MESSAGES_TO_PROCESS_IN_DEBUG_MODE: 200,
	MESSAGES_PER_REQUEST: 100,
	MSEC_BETWEEN_REQUESTS: 1000,
	MAX_USERS_PER_REQUEST: 1000,
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
				gettingNames: 'Загрузка имён пользователей',
				numberOfMessagesCol: 'Всего сообщений',
				sentCol: 'Вы отправили',
				receivedCol: 'Вы получили',
				symbolsCol: 'Всего символов',
				sentSymbolsCol: 'Вы отправили символов',
				receivedSymbolsCol: 'Вы получили символов',
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
				warning: 'Внимание! Не удалось обработать сообщений'
			}
		},
		1: {
			name: 'ukrainian',
			strings: {
				authorizing: 'Авторизация',
				authorized: 'Авторизация завершена',
				loadingMessageNumbers: 'Определение числа сообщений',
				fatal: 'Критическая ошибка. Пожалуйста, сообщите приведённые ниже данные разработчику.',
				appName: 'Статистика приватні переписки',
				nameCol: "Ім'я",
				numberOfMessagesCol: 'Усього повідомлень',
				gettingNames: 'Загрузка имён пользователей',
				symbolsCol: 'Всего символов',
				sentSymbolsCol: 'Вы отправили символов',
				receivedSymbolsCol: 'Вы получили символов',
				sentCol: 'Ви відправили',
				receivedCol: 'Ви одержали',
				lastMsgCol: 'Останнє повідомлення',
				messagesProcessed: 'Оброблене повідомлень',
				processingMessages: 'Обработка сообщений',
				done: 'Обработка завершена',
				incoming: 'входящих',
				outgoing: 'исходящих',
				dayWithMostMessages: 'Найбільше повідомлень було',
				timeWithMostMessages: 'Найбільше повідомлень',
				thankYou: 'Спасибі, що дочекалися, сподіваємося, воно того коштувало!',
				exportByTime: 'Експорт статистики за часом',
				exportByMessages: 'Експорт статистики за повідомленням',
				warning: 'Увага! Не вдалося обробити повідомлень'
			}
		},
		3: {
			name: 'english',
			strings: {
				authorizing: 'Authorizing',
				authorized: 'Authorization complete',
				loadingMessageNumbers: 'Getting message numbers...',
				fatal: 'Fatal error. Please, send the info below to the developers',
				appName: 'Private messages statistics',
				nameCol: 'Name',
				numberOfMessagesCol: 'Number of messages',
				gettingNames: 'Loading user names',
				sentCol: 'Sent',
				receivedCol: 'Received',
				symbolsCol: 'Total symbols',
				sentSymbolsCol: 'Sent symbols',
				receivedSymbolsCol: 'ReceivedSymbols',
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
				warning: 'Warning! Failed to process messages'
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
	}
}

var user = {
	lang: SYS.LANGUAGES[langConfig.id] == undefined ? SYS.LANGUAGES[3].strings : SYS.LANGUAGES[langConfig.id].strings
}


var ui = {
	setHeader: function(string) {
		ge('header').innerHTML = string;
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
		var processed = processedIncoming + processedOutgoing;
		var total = totalIncoming + totalOutgoing;
		ge('progressbarbg').style.width = (100 * processed / total) + '%';
		ge('progresstext').innerHTML = user.lang.messagesProcessed + ': ' +
			user.lang.incoming + ': ' + processedIncoming + '/' + totalIncoming + '; ' +
			user.lang.outgoing + ': ' + processedOutgoing + '/' + totalOutgoing;
	},
	
	displayStats: function(stats, userData, sortBy) {
		var table = ce('table', {className: 'wikiTable'});
		table.innerHTML += '<thead><th>#</th>' + 
			'<th>' + user.lang.nameCol + '</th>' +
			'<th onclick="javascript: ui.sort(\'tot\');" style="cursor: pointer">' + user.lang.numberOfMessagesCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'out\');" style="cursor: pointer">' + user.lang.sentCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'in\');" style="cursor: pointer">' + user.lang.receivedCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'tot-size\');" style="cursor: pointer">' + user.lang.symbolsCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'out-size\');" style="cursor: pointer">' + user.lang.sentSymbolsCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'in-size\');" style="cursor: pointer">' + user.lang.receivedSymbolsCol + '</th>' + 
			'<th onclick="javascript: ui.sort(\'date\');" style="cursor: pointer">' + user.lang.lastMsgCol + '</th>' + 
			'</thead>';

		var tbody = ce('tbody');
		table.appendChild(tbody);
		
		var sorted = getKeys(stats);
		
		
		//FIXME: write a simple and generic way of sorting by fields
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
				return b.in + b.out - (a.in + a.out);
			});
		}
		
		if(sortBy == 'in') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.in - a.in;
			});
		}
		
		if(sortBy == 'out') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.out - a.out;
			});
		}
		
		if(sortBy == 'date') {
			sorted.sort(function(a,b) {
				a = statCounter.statByUser[a];
				b = statCounter.statByUser[b];
				return b.lastMessageDate - a.lastMessageDate;
			});
		}
		
		
		
		for(var rank = 0; rank < sorted.length; rank ++) {
			var uid = sorted[rank];
			
			data = stats[uid];
			udata = (userData[uid] == undefined ? {first_name: 'DELETED', last_name : 'DELETED'} : userData[uid]);
			
			var tr = ce('tr');
			var tdR = ce('td', {innerHTML: rank + 1});
			var tdN = ce('td', {innerHTML: '<a href="/id' + uid + '">' + udata.first_name + ' ' + udata.last_name + '</a>'});
			var tdT = ce('td', {innerHTML: data.in + data.out});
			var tdO = ce('td', {innerHTML: data.out});
			var tdI = ce('td', {innerHTML: data.in});
			var tdST = ce('td', {innerHTML: data.inSize + data.outSize});
			var tdSO = ce('td', {innerHTML: data.outSize});
			var tdSI = ce('td', {innerHTML: data.inSize});
			var tdL = ce('td', {innerHTML: '<a href="mail.php?act=show&id=' + data.lastMessageId + '">' + formatDate(new Date(data.lastMessageDate * 1000)) + '</a>'});

			tr.appendChild(tdR);
			tr.appendChild(tdN);
			tr.appendChild(tdT);
			tr.appendChild(tdO);
			tr.appendChild(tdI);
			tr.appendChild(tdST);
			tr.appendChild(tdSO);
			tr.appendChild(tdSI);
			tr.appendChild(tdL);
			tbody.appendChild(tr);
		}
		
		var div = ce('div');
		div.appendChild(table);
		this.clearContent();
		this.appendContentElement(div);
	},
	
	sort: function(sortBy) {
		this.displayStats(statCounter.statByUser, statCounter.userData, sortBy);
	}
};


var statCounter = {
	statByUser: {},
	userData: {},
	
	createEmptyStatsFor: function(message) {
		var newStats = {
			in: 0,
			out: 0,
			lastMessageDate: message.date,
			lastMessageId: message.mid,
			inSize: 0,
			outSize: 0
			// TODO: add words distribution
		};
		this.statByUser[message.uid] = newStats;
		return newStats;
	},
	
	processSingleMessage: function(message) {
		userStats = this.statByUser[message.uid];
		if(userStats == undefined) {
			userStats = this.createEmptyStatsFor(message);
		}
		if(!message.out) {
			userStats.in ++;
			userStats.inSize += message.body.length;
		} else {
			userStats.out ++;
			userStats.outSize += message.body.length;
		}
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
		
		if(--(this.pendingUserDataRequests) <= 0) {
			ui.setHeader(user.lang.done + '!');
			ui.displayStats(statCounter.statByUser, statCounter.userData, 'tot-size');
		}
		
	},
	
	onAllMessagesLoaded: function() {
		ui.updateProgressBar(this.processedIncomingMessages, this.incomingMessages, this.processedOutgoingMessages, this.outgoingMessages);
		
		ui.setHeader(user.lang.gettingNames + '...');
		
		this.api.getUserNames(getKeys(statCounter.statByUser),function(ao,rt) {messageProcessor.onUserProfilesLoaded(rt);});
	},
	
	onMessagesLoaded: function(response, out) {
	
		var parsedResponse = eval('(' + response + ')');
		
		if(parsedResponse.error != undefined) {
			SYS.fatal(response);
		}
		
		parsedResponse = parsedResponse.response;
		var currentMessages = parsedResponse[0];
		
		for(var i = 1; i < parsedResponse.length; i ++) {
			statCounter.processSingleMessage(parsedResponse[i]);
		}
		
		var offset = 0;
		if(!out) {
			this.processedIncomingMessages += parsedResponse.length - 1;
			offset = this.processedIncomingMessages + (currentMessages - this.incomingMessages);
			if(offset >= currentMessages || (SYS.DEBUG && offset >= SYS.MESSAGES_TO_PROCESS_IN_DEBUG_MODE)) {
				out = 1;
				offset = 0;
			}
		} else {
			this.processedOutgoingMessages += parsedResponse.length - 1;
			offset = this.processedOutgoingMessages + (currentMessages - this.outgoingMessages);
			if(offset >= currentMessages || (SYS.DEBUG && offset >= SYS.MESSAGES_TO_PROCESS_IN_DEBUG_MODE)) {
				this.onAllMessagesLoaded();
				return;
			}
		}
		
		ui.updateProgressBar(this.processedIncomingMessages, this.incomingMessages, this.processedOutgoingMessages, this.outgoingMessages);
		
		var elapsedTime = (new Date()).getTime() - this.requestStartTime;
		if(elapsedTime >= SYS.MSEC_BETWEEN_REQUESTS) {
			this.requestStartTime = (new Date()).getTime();
			this.api.getMessages(out, offset, SYS.MESSAGES_PER_REQUEST, function(ao, rt) {messageProcessor.onMessagesLoaded(rt, out)});
		} else {
			this.out = out;
			this.offset = offset;
			setTimeout("messageProcessor.requestStartTime = (new Date()).getTime(); messageProcessor.api.getMessages(messageProcessor.out, messageProcessor.offset, SYS.MESSAGES_PER_REQUEST, function(ao, rt) {messageProcessor.onMessagesLoaded(rt, messageProcessor.out)});", SYS.MSEC_BETWEEN_REQUESTS - elapsedTime);
		}
	},
	
	startProcessingMessages: function() {
		ui.createProgressBar();
		ui.updateProgressBar(0, this.incomingMessages, 0, this.outgoingMessages);
		this.requestStartTime = (new Date()).getTime();
		this.api.getMessages(0, 0, SYS.MESSAGES_PER_REQUEST, function(ao, rt) {messageProcessor.onMessagesLoaded(rt, 0)});
	},

	onMessageNumbersLoaded: function(response, out) {
		try {
			var parsedResponse = eval('(' + response + ')').response;
			if(!out) {
				this.incomingMessages = parsedResponse[0];
			} else {
				this.outgoingMessages = parsedResponse[0];
			}
			
			if(this.incomingMessages != undefined && this.outgoingMessages != undefined) {
				ui.setHeader(user.lang.processingMessages + '...');
				this.startProcessingMessages();
			}
		} catch(e) {
			SYS.fatal(response);
		}
	},

	getNumberOfMessages: function() {
		this.api.getMessages(0, 0, 1, function(ao, rt) {messageProcessor.onMessageNumbersLoaded(rt, 0)});
		this.api.getMessages(1, 0, 1, function(ao, rt) {messageProcessor.onMessageNumbersLoaded(rt, 1)});
	},

	start: function(api) {
		this.api = api;
		this.getNumberOfMessages();
		ui.setHeader(user.lang.loadingMessageNumbers);
	}
}

var apiConnector = {

	API_ADDRESS: '/api.php',
	LOGON_FAIL_STRING: 'login_fail',
	LOGON_SUCCESS_STRING: 'login_success',

	logon: function(appId, settings) {
	
		this.appId = appId;
		
		var logonFrame = ce("iframe", {
			src: '/login.php?app=' + appId + '&layout=popup&type=browser&settings=' + settings
		}, {position: 'relative', width: '100%'});
		logonFrame.setAttribute('onload', "apiConnector.onLogonFrameLoaded(this.contentWindow.location.href)");
		
		ui.setHeader(user.lang.authorizing + '...');
		
		ui.clearContent();
		ui.appendContentElement(logonFrame);
		
		
	},
	
	onLogonFrameLoaded: function(frameLocation) {
		var location = unescape(frameLocation);
		//alert(location);
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
			
			messageProcessor.start(this);
		} else {
			//...
		}
	},
	
	getMessages: function(out, offset, count, onDone) {
		var request = this.API_ADDRESS + '?';
		var toMd5 = user.uid;
		
		request += 'api_id' + '=' + this.appId + '&';
		toMd5 += 'api_id' + '=' + this.appId;
		
		request += 'count=' + count + '&';
		toMd5 += 'count=' + count;
		
		request += 'format=JSON&';
		toMd5 += 'format=JSON';
		
		request += 'method=messages.get&';
		toMd5 += 'method=messages.get';
		
		request += 'offset=' + offset + '&';
		toMd5 += 'offset=' + offset;
		
		request += 'out=' + out + '&';
		toMd5 += 'out=' + out;
		
		request += 'preview_length=0&';
		toMd5 += 'preview_length=0';
		
		request += 'sid=' + this.sid + '&';
		
		toMd5 += 'v=3.0';
		toMd5 += this.secret;
		
		request += 'sig=' + md5(toMd5) + '&v=3.0';
		
		Ajax.Get({
			url: request,
			onDone: onDone
		});
	},
	
	doGetUserData: function(ids, onDone) {
		var request = this.API_ADDRESS + '?';
		var toMd5 = user.uid;
		
		request += 'api_id' + '=' + this.appId + '&';
		toMd5 += 'api_id' + '=' + this.appId;
		
		//request += 'method=getProfiles&';
		//toMd5 += 'method=getProfiles';
		
		request += 'format=JSON&';
		toMd5 += 'format=JSON';
		
		request += 'method=getProfiles&';
		toMd5 += 'method=getProfiles';
		
		request += 'sid=' + this.sid + '&';
		
		var uids = ids.join(',');
		
		request += 'uids=' + uids + '&';
		toMd5 += 'uids=' + uids;
		
		toMd5 += 'v=3.0';
		toMd5 += this.secret;
		
		request += 'sig=' + md5(toMd5) + '&v=3.0';
		
		Ajax.Get({
			url: request,
			onDone: onDone
		});
	},
	
	getUserNames: function(ids, onDone) {
		ids = splitArrayToSubArrays(ids, SYS.MAX_USERS_PER_REQUEST);
		this.onDone = onDone;
		messageProcessor.pendingUserDataRequests = ids.length;
		for(var i = 0; i < ids.length; i ++) {
			if(i == 0) {
				this.doGetUserData(ids[i], onDone);
			} else {
				setTimeout('apiConnector.doGetUserData([' + ids[i] + '], apiConnector.onDone)', i * SYS.MSEC_BETWEEN_REQUESTS);
			}
		}
	}
}

apiConnector.logon(SYS.APP_ID, SYS.LOGIN_SETTING);