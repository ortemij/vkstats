function Ajax(onDone, onFail, eval_res){// From old common.js
 var _t = this;
 this.onDone = onDone;
 this.onFail = onFail;
 var tram = null;
 try { tram = new XMLHttpRequest(); }
 catch(e) { tram = null; }
 if (!tram) {
  try { if(!tram) tram = new ActiveXObject("Msxml2.XMLHTTP"); }
  catch(e) { tram = null; }
 }
 if (!tram) {
  try { if(!tram) tram = new ActiveXObject("Microsoft.XMLHTTP"); }
  catch(e) { tram = null; }
 }

 var readystatechange = function(url, data) {
    if(tram.readyState == 4 ) {
     if(tram.status >= 200 && tram.status < 300) {
       if(eval_res) parseRes();
       if( _t.onDone ) _t.onDone(extend(_t, {url: url, data: data}), tram.responseText);
     } else {
       _t.status = tram.status;
       _t.readyState = tram.readyState;
       if( _t.onFail ) _t.onFail(extend(_t, {url: url, data: data}), tram.responseText);
     }
   }
 };

 var parseRes = function(){
   if(!tram || !tram.responseText)return;
   var res = tram.responseText.replace(/^[\s\n]+/g, '');

   if(res.substr(0,10)=="<noscript>")
   {
     try{
       var arr = res.substr(10).split("</noscript>");
       eval(arr[0]);
       tram.responseText = arr[1];
     }catch(e){
       debugLog('eval ajax script:' + e.message);
     }
   }else{}
  };
  this.get = function(u, d, f){
   tram.onreadystatechange = function(){ readystatechange(u, d); };
   f = f || false;
   var q = (typeof(d) != 'string') ? ajx2q(d) : d;
   u = u + (q ? ('?'+q) : '');
   tram.open('GET', u, !f);

   tram.setRequestHeader("X-Requested-With", "XMLHttpRequest");
   tram.send('');
  };
  this.post = function(u, d, f){
   tram.onreadystatechange = function(){ readystatechange(u, d); };
   f = f || false;
   var q = (typeof(d) != 'string') ? ajx2q(d) : d;
   try {
     tram.open('POST', u, !f);
   } catch(e) {
     debugLog('ajax post error: '+e.message);
   }
   tram.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   tram.setRequestHeader("X-Requested-With", "XMLHttpRequest");
   tram.send(q);
  };
}

var apiConnector = {

	API_ADDRESS: '/api.php',
	API_VERSION: '3.0',
	LOGON_FAIL_STRING: 'login_fail',
	LOGON_SUCCESS_STRING: 'login_success',
	NOT_USED_SETTING:32768,
	
	logon: function(appId, settings) {
	
		this.appId = appId;
		this.settings = settings;
		
		var logonFrame = ce("iframe", {
			src: '/login.php?app=' + appId + '&layout=popup&type=browser&settings=' + settings
		}, {position: 'relative', width: '100%', height: '500px'});
		logonFrame.setAttribute('onload', "apiConnector.onLogonFrameLoaded()");//this.contentWindow.location.href
		
		ui.setHeader(user.lang.authorizing + '...');
		
		ui.clearContent();
		ui.appendContentElement(logonFrame);
		
		
	},
	
	onLogonFrameLoaded: function(frameLocation) {
		var ajax = new Ajax();
		
		var onlogin=function(r,t) {
			var res='{' + t.split('app_session = {')[1].split('}')[0] + '}';
			sessionInfo=eval('(' + res + ')');
			user.uid = sessionInfo.mid;
			apiConnector.secret = sessionInfo.secret;
			apiConnector.sid = sessionInfo.sid;
			
			ui.setHeader(user.lang.authorized);
			ui.clearContent();
			
			ui.requestSettings();			
		}
		var oncheck=function(r,t) {
			if (t.indexOf('Login failure')!=-1){
				SYS.fatal('failed to log on. ');
			} else if (t.indexOf('Login success')!=-1){	
				ajax.onDone = onlogin;
				ajax.get('/login.php?app=' + apiConnector.appId + '&layout=popup&type=browser&settings='+apiConnector.NOT_USED_SETTING);					
			}	
		}
		ajax.onDone = oncheck;
		ajax.get('/login.php?app=' + apiConnector.appId + '&layout=popup&type=browser&settings=' + apiConnector.settings);
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
			var parsedResponse;
			try {
				parsedResponse = eval('(' + rt + ')');
			} catch (e) {
				SYS.log("Failed to parse JSON response: [" + e + "] " + rt);
			}

			if (parsedResponse == undefined) {
				onDone();
			} else if (parsedResponse.error != undefined) {
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