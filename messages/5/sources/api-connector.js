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