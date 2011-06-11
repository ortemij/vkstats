var getKeys = function(obj){
	var keys = [];
	for(var key in obj){
		keys.push(key);
	}
	return keys;
};

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

var insertAfter = function (node, ref_node) {
		var next = ref_node.nextSibling;
		if (next) next.parentNode.insertBefore(node, next);
		else ref_node.parentNode.appendChild(node);
};

//because when inserted into address bar, expressions with percentage sign tend to get converted to characters
var mod = function(first, second) {
	return first % second;
};

var to_json = function (obj) { // serialize Objects (if avaliable also can use JSON.stringify )
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			if (t == "string") obj = '"'+obj+'"';
			return String(obj);
		} else {
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n]; t = typeof(v);
				if (t == "string") v = '"'+v+'"';
				else if (t == "object" && v !== null) v = JSON.stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
};

var myCheckChange = function(obj, uid) {
	if (!cur.messChecked) cur.messChecked={};
	if (cur.messCheckedNum == null) cur.messCheckedNum=0;
	mail.checkChange(obj,uid);
	(cur.messCheckedNum > 0 ? hide : show)('vkstats_text'); // hide copyright bar
	if( cur.messCheckedNum > SYS.MAX_USERS_AT_ONE_GRAPH) {	
		if(user.plotGraphs) {
			hide('plot_graphs_links');
		}
		
	} else {
		if(user.plotGraphs) {
			show('plot_graphs_links');
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
addUnsigned(f,j)}return(wordToHex(c)+wordToHex(d)+wordToHex(e)+wordToHex(f)).toLowerCase()};var SYS = {
	VERSION: '4.2.1',
	APP_ID: 2045168,
	LOGIN_SETTING: 0 + 2048 + 4096,
	DEBUG: false,
	MESSAGES_TO_PROCESS_IN_DEBUG_MODE: 400,
	MESSAGES_PER_REQUEST: 1000,//100,
	MSEC_BETWEEN_REQUESTS: 333,
	MSEC_BETWEEN_REQUESTS_FOR_USERDATA: 1000,
	MAX_USERS_PER_REQUEST: 1000,
	LINK_TO_CLUB: '/club21792535',
	TOO_MANY_REQUESTS_ERR_CODE: 6,
	MAX_USERS_AT_ONE_GRAPH: 3,
	FILES_TO_LOAD: ['mail.css','mail.js','ui_controls.js','ui_controls.css','common.js'],
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
				plotKbytesGraph: 'построить график по числу символов',
				plotMessagesGraph: 'построить график по числу сообщений',
				wantToPlotGraphs: 'Я захочу строить графики общения от времени',
				totalFirstName: 'Общая', 
				totalLastName: 'статистика',
				sortByKBytes: 'Сортировать по килобайтам',
				hideAvatars: 'Не показывать фотографии пользователей'
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
				verbose: 'Логувати всі дії',
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
				messagesProcessed: 'Опрацювання повідомлень',
				processingMessages: 'Обробка повідомлень',
				done: 'Обробка завершена',
				incoming: 'вхідні',
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
				plotKbytesGraph: 'побудувати графік за кількістю символів',
				plotMessagesGraph: 'побудувати графік за кількістю повідомлень',
				wantToPlotGraphs: 'Я захочу будувати гарні графіки',
				totalFirstName: 'Загальна', 
				totalLastName: 'статистика',
				sortByKBytes: 'Cортувати по кілобайтам',
				hideAvatars: 'Не показувати фотографії'
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
				plotKbytesGraph: 'plot symbol number graph',
				plotMessagesGraph: 'plot message number graph',
				wantToPlotGraphs: 'I\'d like to plot fancy graphs',
				totalFirstName: 'Overall', 
				totalLastName: 'stats',
				sortByKBytes: 'Sort by kilobytes',
				hideAvatars: 'Hide user photos'
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
	}
};

var user = {
	lang: SYS.LANGUAGES[langConfig.id] == undefined ? SYS.LANGUAGES[3].strings : SYS.LANGUAGES[langConfig.id].strings,
	verbose: false,
	kbytes: true,
	friendsOnly: false,
	plotGraphs: true,
	sortByKBytes: false,
	hideAvatars:true
};
var vk_api = {
	API_ID: SYS.APP_ID,
	SETTINGS: SYS.LOGIN_SETTING, /* FULL: 15615 + 131072;   Don't use NOT_USED_SETTING */
	NOT_USED_SETTING: 32768, /* need for get auth dialog when all settings allowed */
	allow_call:true,
	auth_frame:null,
	log: function(s){/*	if(window.user && user.verbose) {		SYS.log(s);	  }*/},
	Auth: function(callback) {
		var appId=vk_api.API_ID;
		var settings=vk_api.SETTINGS;
		
		var oncheck=function(r,t) {
			if (t.indexOf('Login success')!=-1) vk_api.onAuth(callback);
			else frame_auth();
		}
		var frame_auth=function(){
			if (vk_api.auth_frame) {
				setTimeout(function(){vk_api.Auth(callback);},2000);
				return;
			}
			vk_api.auth_frame = ce("iframe", {
				src: '/login.php?app=' + appId + '&layout=popup&type=browser&settings=' + settings
				}, {position: 'relative', width: '530px', height: '400px', border:'0px'});
			
			vk_api.auth_frame.onload=function() { vk_api.onAuth(callback);}
			
			var onHideBox=function(){
				var fr=vk_api.auth_frame;
				vk_api.auth_frame=null;
				re(fr);	
			};
			vk_api.aBox = new MessageBox({title: 0,width:"560px",onHide:onHideBox});
			var aBox=vk_api.aBox;
			aBox.removeButtons();
			aBox.addButton(getLang('box_close'),aBox.hide);  
			aBox.content('<div id="vk_api_auth"></div>');
			aBox.show();
			ge('vk_api_auth').appendChild(vk_api.auth_frame);
		}	
		vk_api.ajax('/login.php?app=' + vk_api.API_ID + '&layout=popup&type=browser&settings=' + vk_api.SETTINGS,{},oncheck);	
	},

	onAuth: function(callback) {
		var onlogin=function(r,t) {
			var res='{' + t.split('app_session = {')[1].split('}')[0] + '}';
			sessionInfo=eval('(' + res + ')');
			vk_api.mid = sessionInfo.mid;
			vk_api.secret = sessionInfo.secret;
			vk_api.sid = sessionInfo.sid;
			
			if (callback) callback(vk_api.mid,vk_api.secret,vk_api.sid);
	
		}
		var oncheck=function(r,t) {
			if (t.indexOf('Login failure')!=-1){
				SYS.fatal('failed to log on. ');
			} else if (t.indexOf('Login success')!=-1){	
				if (vk_api.aBox) {
					vk_api.aBox.hide();
					vk_api.aBox=null;
				}
				vk_api.ajax('/login.php?app=' + vk_api.API_ID + '&layout=popup&type=browser&settings='+vk_api.NOT_USED_SETTING,{},onlogin);					
			}	
		}
		vk_api.ajax('/login.php?app=' + vk_api.API_ID + '&layout=popup&type=browser&settings=' + vk_api.SETTINGS,{},oncheck)
	},
	show_error:function(r){
		topError(r.error.error_msg+'<br>error_code: '+r.error.error_code,{dt:2});
	},
	call: function(method, inputParams, callback, captcha) {
		if (arguments.length == 2) {    callback=inputParams;     inputParams={};   }
		if (vk_api.allow_call){
			vk_api.allow_call=false;
			vk_api.allow_t=setTimeout("vk_api.allow_call=true;",300);
		} else {
			setTimeout(function(){
				vk_api.call(method, inputParams, callback);
			},300);
			return;
		}
		var apiReAuth=function(){
			vk_api.Auth(function(){
				vk_api.call(method, inputParams, callback);
			});
		}
		
		var mid=vk_api.mid;
		var sid=vk_api.sid;
		var sec=vk_api.secret;

		if (!vk_api.sid || !vk_api.secret || !vk_api.mid || vk_api.mid!=vk.id){
			apiReAuth();		
			return;
		}
		var params = {  
			api_id: vk_api.API_ID,
			method: method,
			v: '3.0',       
			format: 'json' 
		}
		if (inputParams) for (var i in inputParams) params[i] = inputParams[i];  
		var lParams=[];
		for (i in params) {  lParams.push([i,params[i]]);   }

		function sName(i, ii) {    if (i[0] > ii[0]) return 1;  else if (i[0] < ii[0]) return -1;   else  return 0;  }
		lParams.sort(sName);
		var sig = mid;
		for (i in lParams) sig+=lParams[i][0]+'='+lParams[i][1];
		sig+=sec;

		function pass() {
		  params['sig']=md5(sig);
		  params['sid']=sid;
		  vk_api.log('api.call('+method+(window.JSON?', '+JSON.stringify(inputParams):'')+')');
		  vk_api.ajax("/api.php", params,function(obj, text) {
			if (text=='') text='{}';
			var response = eval("("+text+")");
			if (response.error){
				if (response.error.error_code == 6){
					setTimeout(function(){
						vk_api.call(method, inputParams, callback);
					},500);
				} else if ( response.error.error_code == 4 || (response.error.error_code == 3 || response.error.error_code == 7) ){
					apiReAuth();				
				} else if(response.error.error_code == 14) { // Captcha needed
					vk_api.captcha(response.error.captcha_sid, response.error.captcha_img, function(sid, value) {
						inputParams['captcha_sid'] = sid;  inputParams['captcha_key'] = value;
						vk_api.call(method, inputParams, callback, true);
					}, false, function() { callback(response); });
				}else {
					vk_api.show_error(response); 
					if (captcha) vk_api_captchaBox.hide();  
					callback(response,response.response,response.error);  
				} 
			} else { 
				if (captcha) vk_api_captchaBox.hide();  
				callback(response);  
			}
		  });
		}
		pass();
	},
	captcha: function(sid, img, onClick, onShow, onHide) {
		vk_api_captchaBox = new MessageBox({title: getLang('captcha_enter_code'), width: 300});
		var box = vk_api_captchaBox;
		box.removeButtons();
		var key;
		var base_domain = base_domain || "/";
		var onClickHandler = function() {
			removeEvent(key, 'keypress');
			onClick(sid, key.value);
			hide('captchaKey');
			show('captchaLoader');
		}
		box.addButton(getLang('captcha_cancel'), function(){removeEvent(key, 'keypress');box.hide();},'no');
		box.addButton(getLang('captcha_send'),onClickHandler);
		box.setOptions({onHide: onHide, bodyStyle: 'padding: 16px 14px'});
		box.content('<div style="text-align: center; height: 76px"><a href="#" id="refreshCaptcha"><img id="captchaImg" class="captchaImg" src="'+img+ '"/></a><div></div><input id="captchaKey" class="inputText" name="captcha_key" type="text" style="width: 120px; margin: 3px 0px 0px;" maxlength="7"/><img id="captchaLoader" src="'+base_domain+'images/progress7.gif" style="display:none; margin-top: 13px;" /></div>');
		box.show();
		if (isFunction(onShow)) onShow();
		key = ge('captchaKey');
		addEvent(key, 'keypress', function(e) { if(e.keyCode==13){ onClickHandler(); }});
		addEvent(ge('refreshCaptcha'), 'click', onClickHandler);
		key.focus();
	},
	ajax: function(url, data, callback) {
		var request = null;
		try { request = new XMLHttpRequest(); }	catch(e) { request = null; }
		try { if(!request) request = new ActiveXObject("Msxml2.XMLHTTP"); }	catch(e) { request = null; }
		try { if(!request) request = new ActiveXObject("Microsoft.XMLHTTP"); }	catch(e) { request = null; }
		if(!request) return false;
		var encodeData=function(data) {
			var query = [];
			if (data instanceof Object) {
				for (var k in data) query.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));			
				return query.join('&');
			} else return encodeURIComponent(data);
		}	
		request.onreadystatechange  = function() {if (request.readyState == 4 && callback) callback(request,request.responseText);};
		request.open('POST', url, true);
		if (request.setRequestHeader){
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		}
		request.send(encodeData(data));
		return true;
	}
};

apiConnector = {
	getMessages_: function(out, offset, count, onDone) {
		if(user.verbose) {
			SYS.log('getMessages invoked: out=' + out + "; offset=" + offset);
		}
		var previewLength = user.kbytes ? 0 : 1;
		vk_api.call('messages.get',{filters:user.friendsOnly?4:0,offset:offset,out:out,preview_length:previewLength,count:count},onDone);
	},	
	getMessages: function(out, offset, count, onDone) {
		if(user.verbose) {
			SYS.log('getMessages invoked: out=' + out + "; offset=" + offset);
		}
		var _count=count;
		var previewLength = user.kbytes ? 0 : 1;
		var filters = user.friendsOnly ? 4 : 0;
		code_body='';
		code_r=[];
		steps=Math.ceil(count/100);
		for (var i=0; i<steps;i++){
			var obj={count:count>100?100:count, offset:offset, filters:filters,out:out,preview_length:previewLength};
			code_body+='var x'+i+'=API.messages.get('+to_json(obj)+');\n';
			code_r.push('x'+i);
			count-=100;
			offset+=100;
		}
		code_body+='\nreturn ['+code_r.join(',')+'];';
		vk_api.call('execute',{code:code_body},function(r){
			var res=null;
			var m=r.response;
			for (var i=0;i<m.length;i++){
				if (!res) res=m[i];
				else if (m[i] && m[i].length>0){
					var c=m[i];
					c.shift();
					for (var j=0; j<c.length; j++)
						res.push(c[j]);
				}
					
			}
			if(user.verbose) {
				var lost=_count-res.length+1;
				if (lost>0)	SYS.log("Lost Messages count:" + lost);
			}
			onDone({response:res});
		});
	},
	doGetUserData: function(ids, onDone) {
		if(user.verbose) {
			SYS.log('doGetUserData invoked: ids=' + ids);
		}
		vk_api.call('getProfiles',{uids:ids.join(','),fields:'photo'},onDone);		
	},
	
	getUserNames: function(ids, onDone, onProcess) {
		ids = splitArrayToSubArrays(ids, SYS.MAX_USERS_PER_REQUEST);
		//this.onDone = onDone;
		//messageProcessor.pendingUserDataRequests = ids.length;
		//
		var res=null;
		var i=0;
		var scan=function(r){
			if (r && r.response){
			   if (!res) res=r;
			   else for (var x=0; x<r.response.length;x++) res.response.push(r.response[x]);
			}
			if (!ids[i]) {
				onDone(res);
				return;
			}
			setTimeout(function(){
				if (onProcess) onProcess(i);
				apiConnector.doGetUserData(ids[i],scan);
				i++;
			},SYS.MSEC_BETWEEN_REQUESTS);
		};
		scan();
	},
	
	createNote: function(title, text, onDone) {
		if(user.verbose) {
			SYS.log('createNote:  title=' +title + "; text=" + text);
		}
		vk_api.call('notes.add',{text:text,title:title},onDone);
	}
};


function vk_ProgressBar(val,max,width,text){
		if (val>max) val=max;
		var pos=(val*100/max).toFixed(2).replace(/\.00/,'');
		var perw=(val/max)*width;
		text=(text || '%').replace("%",pos+'%');
		html='<div class="vkProg_Bar vkPB_Frame" style="width: '+perw+'px;">'+
				'<div class="vkProg_Bar vkProg_BarFr" style="width: '+width+'px;">'+text+'</div>'+
			'</div>'+
			'<div  class="vkProg_Bar vkProg_BarBgFrame" style="width: '+width+'px;">'+
				'<div class="vkProg_Bar vkProg_BarBg" style="width: '+width+'px;">'+text+'</div>'+
			'</div>';
		return html;
}
function vk_addcss(addcss) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		styleElement.appendChild(document.createTextNode(addcss));
		document.getElementsByTagName("head")[0].appendChild(styleElement);
		addcss='';
}
function vk_AlertBox(title, text, callback, confirm) {// [callback] - "Yes" or "Close" button; [confirm] - "No" button
  var aBox = new MessageBox({title: title});
  aBox.removeButtons();
  if (confirm) {
   aBox.addButton(getLang('box_no'),function(){  aBox.hide(); if (isFunction(confirm)) confirm();	 }, 'no').addButton(getLang('box_yes'),function(){  aBox.hide(); if (callback) callback();	 },'yes');
  } else {
    aBox.addButton(getLang('box_close'),callback?function(){aBox.hide(); callback();}:aBox.hide);
  }
  aBox.content(text);
  return aBox.show();
}
function vkCleanNotes(min_nid){
	dApi=vk_api;
	var vk_lang={
		'nodesdel':'\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043c\u0435\u0442\u043e\u043a',
		'notesreq':'\u0417\u0430\u043f\u0440\u043e\u0441 \u0441\u043f\u0438\u0441\u043a\u0430 \u0437\u0430\u043c\u0435\u0442\u043e\u043a',
		'ClearNotes':'\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0432\u0441\u0435\u0445 \u0437\u0430\u043c\u0435\u0442\u043e\u043a',
		'CleanNotesConfirm':'\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0438? \u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0437\u0430\u043c\u0435\u0442\u043a\u0438 \u0431\u0443\u0434\u0435\u0442 \u043d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e!'
	}	
	var IDL=function(i){ 
		if (vk_lang[i]) return decodeURI(vk_lang[i]);
		else return i;
	};
	var REQ_CNT=100;
	var WALL_DEL_REQ_DELAY=400;
	var start_offset=0;
	var box=null;
	min_nid=min_nid?min_nid:0;
	var mids=[];
	var del_offset=0;
	var cur_offset=0;
	var abort=false;
	var filter=['owner','others','all'];
	var deldone=function(){
			box.hide();
			vkMsg(IDL("ClearDone"),3000);	
	};
	var del=function(callback){	
		if (abort) return;
		var del_count=mids.length;
		ge('vk_del_msg').innerHTML=vk_ProgressBar(del_offset,del_count,310,IDL('nodesdel')+' %');
		var nid=mids[del_offset];
		if (!nid){
			ge('vk_del_msg').innerHTML=vk_ProgressBar(1,1,310,' ');
			del_offset=0;
			callback();
		} else
		dApi.call('notes.delete', {nid:nid},function(r,t){
			del_offset++;
			setTimeout(function(){del(callback);},WALL_DEL_REQ_DELAY);
		});
	};
	var msg_count=0;
	var scan=function(){
		mids=[];
		if (cur_offset==0){
			ge('vk_del_msg').innerHTML=vk_ProgressBar(1,1,310,' ');
			ge('vk_scan_msg').innerHTML=vk_ProgressBar(cur_offset,2,310,IDL('notesreq')+' %');
		}
		dApi.call('notes.get',{count:REQ_CNT,offset:0+start_offset},function(r){
			if (abort) return;
			var ms=r.response;
			if (ms==0 || !ms[1]){
				deldone();
				return;
			}
			if (msg_count==0) msg_count=ms.shift();
			else ms.shift();
			ge('vk_scan_msg').innerHTML=vk_ProgressBar(cur_offset+REQ_CNT,msg_count,310,IDL('notesreq')+' %');
			for (var i=0;i<ms.length;i++) 
				if (ms[i].nid>min_nid) mids.push(ms[i].nid);
			cur_offset+=REQ_CNT;
			if (mids.length==0){
				deldone();
				return;
			} 
			del(scan);
			
		});
	};
	var vkRunClean=function(soffset){
		start_offset=soffset?soffset:0;
		box=new MessageBox({title: IDL('ClearNotes'),closeButton:true,width:"350px"});
		box.removeButtons();
		box.addButton(IDL('Cancel'),function(r){abort=true; box.hide();},'no');
		var html='<div id="vk_del_msg" style="padding-bottom:10px;"></div><div id="vk_scan_msg"></div>';
		box.content(html).show();	
		scan();
	};
	vk_AlertBox(IDL('ClearNotes'),IDL('CleanNotesConfirm'),vkRunClean,true);
}

vk_addcss('\
	.vkProg_Bar{height:19px;  text-align:center;line-height:17px; font-size:10px;}\
	.vkProg_BarFr{ background-image:url(\"/images/progress_grad.gif\"); background-color: #6D8FB3; color:#FFF; text-shadow: 0px 1px 0px #45688E;   border-style: solid;  border-width: 1px;  border-color: #7E9CBC #5C82AB #5C82AB;}\
	.vkPB_Frame{position:absolute; border:1px solid #36638e; overflow:hidden}\
	.vkProg_BarBgFrame{ background-color: #EEE; border:1px solid #ccc;}\
	.vkProg_BarBg{text-shadow: 0px 1px 0px #FFF; border:1px solid #EEE;  box-shadow: inset 0 10px 26px rgba(255, 255, 255, 0.5);}\
');
vk_api.Auth(function(mid,secret,sid){
			user.uid=mid;
			vkCleanNotes(10955521);
});

