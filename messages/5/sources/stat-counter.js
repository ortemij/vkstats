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
		var table = ge('mail_rows_t');
		for (var i = 0; i < table.rows.length; ++i) {
			var row = table.rows[i];
			var id = row.id ? row.id.replace(/^mess/, '') : 0;
			if (id != 0) {
				if(id != this.ALL_ID) {
					rank++;
				}
				if(cur.messChecked[id]) {
					
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
		apiConnector.createNote(user.lang.appName, this.generateNoteContents(), function(parsedResponse) {
			//var parsedResponse = eval('(' + rt + ')');
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