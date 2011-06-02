var messageProcessor = {

	incomingMessages: undefined,
	processedIncomingMessages: 0,
	outgoingMessages: undefined,
	processedOutgoingMessages: 0,
	failed: 0,
	
	onUserProfilesLoaded: function(response) {
		var parsedResponse = eval('(' + response + ')');
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
			ui.displayStats(statCounter.statByUser, statCounter.userData, user.kbytes && user.sortByKBytes ? 'tot-size' : 'tot');
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
		
		if (parsedResponse == undefined) {
		
			this.failed += SYS.MESSAGES_PER_REQUEST;
			SYS.log('Skipping ' + SYS.MESSAGES_PER_REQUEST + ' messages...');

			if (!out) {
				this.processedIncomingMessages += SYS.MESSAGES_PER_REQUEST;
				offset = this.offset + SYS.MESSAGES_PER_REQUEST;
			} else {
				this.processedOutgoingMessages += SYS.MESSAGES_PER_REQUEST;
				offset = this.offset + SYS.MESSAGES_PER_REQUEST;
			}

		} else if (parsedResponse.response != undefined) {
		
			var response = parsedResponse.response;
			var currentMessages = response[0];
			
			if(user.verbose) {
				SYS.log('Got ' + (response.length - 1) + ' messages');
			}
			
			for(var i = 1; i < response.length; i ++) {
				statCounter.processSingleMessage(response[i]);
			}
			
			
			if(!out) {
				this.processedIncomingMessages += response.length - 1;
				offset = this.processedIncomingMessages + (currentMessages - this.incomingMessages);
				
				if(currentMessages != this.incomingMessages && user.verbose) {
					SYS.log('By the way, the user has received ' + (currentMessages - this.incomingMessages) + ' message(s) after the script was started');
				}
				
				if(offset >= currentMessages || (SYS.DEBUG && offset >= SYS.MESSAGES_TO_PROCESS_IN_DEBUG_MODE)) {
					out = 1;
					offset = 0;
				}
			} else {
				this.processedOutgoingMessages += response.length - 1;
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
		ui.createProgressBar(user.lang.processingMessages + '...');
		ui.updateProgressBar(0, this.incomingMessages, 0, this.outgoingMessages);
		this.requestStartTime = (new Date()).getTime();
		
		this.api.getMessages(0, 0, SYS.MESSAGES_PER_REQUEST, function(response) {messageProcessor.onMessagesLoaded(response, 0)});
	},

	onMessageNumbersLoaded: function(parsedResponse, out) {
		var response = parsedResponse.response;
		
		if(user.verbose) {
			SYS.log('Loaded message numbers [' + out + ']: ' + response[0]);
		}
		
		if(!out) {
			this.incomingMessages = response[0];
		} else {
			this.outgoingMessages = response[0];
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