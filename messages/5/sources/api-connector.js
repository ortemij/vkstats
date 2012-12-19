
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
			
         var on_auth=function() { vk_api.onAuth(callback);};
         
			vk_api.auth_frame.onload=on_auth;
			
			var onHideBox=function(){
				var fr=vk_api.auth_frame;
				vk_api.auth_frame=null;
				re(fr);	
			};
			vk_api.aBox = new MessageBox({title: 0,width:"560px",onHide:onHideBox});
			var aBox=vk_api.aBox;
			aBox.removeButtons();
			aBox.addButton(getLang('box_close'),aBox.hide); 
         //aBox.addButton('Login success',on_auth); 
         
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
			} else if (t.indexOf('Login success')!=-1 || t==''){	
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

