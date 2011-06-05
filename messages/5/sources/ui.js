var ui = {
	progress_bar_width:600,//px
	setTitle: function(string) {
		document.title = string;
	},

	setHeader: function(string) {
		show('header');
		ge('title').innerHTML = string;
		this.setTitle(string);
	},
	
	setContent: function(content) {
		ge('content').innerHTML = content;
	},
	
	clearContent: function() {
		this.setContent('');
	},
	
	addcss: function(css){
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		styleElement.appendChild(document.createTextNode(css));
		document.getElementsByTagName("head")[0].appendChild(styleElement);
	},
	appendContentElement: function(element) {
		ge('content').appendChild(element);
	},
	ProgressBar: function(val,max,width,text){
			if (val>max) val=max;
		var pos=(val*100/max).toFixed(2);;
			var perw=(val/max)*width;
			text=(text || '%').replace("%",pos+'%');
			html='<div class="vkprogbar_container" style="width:'+(width+4)+'px;">\
					<div class="vkprogbar vkpbframe" style="width: '+perw+'px;">\
						<div class="vkprogbar vkprogbarfr" style="width: '+width+'px;">'+text+'</div>\
					</div>\
					<div  class="vkprogbar vkprogbarbgframe" style="width: '+width+'px;">\
						<div class="vkprogbar vkprogbarbg" style="width: '+width+'px;">'+text+'</div>\
					</div>\
				</div>';
			return html;
	},
	createProgressBar: function(text) {
		ui.addcss('\
			.vkprogbar_container{margin:0 auto;}\
			/*\
			.vkprogbar{height:30px;  text-align:center;line-height:30px;}\
			.vkprogbarfr{ box-shadow: inset 0 10px 26px rgba(255, 255, 255, 0.5); background-color: #6d8fb3; color:#fff; text-shadow: 0px 1px 0px #45688e;   border-style: solid;  border-width: 1px;  border-color: #7e9cbc #5c82ab #5c82ab;}\
			.vkpbframe{position:absolute; border:1px solid #36638e; overflow:hidden}\
			.vkprogbarbgframe{ box-shadow: inset 0 10px 26px rgba(255, 255, 255, 0.5); background-color: #eee; border:1px solid #ccc;}\
			.vkprogbarbg{text-shadow: 0px 1px 0px #fff; border:1px solid #eee;}\
			*/\
			.vkprogbar{height:19px;  text-align:center;line-height:17px; font-size:10px;}\
			.vkprogbarfr{ background-image:url(\"/images/progress_grad.gif\"); background-color: #6D8FB3; color:#FFF; text-shadow: 0px 1px 0px #45688E;   border-style: solid;  border-width: 1px;  border-color: #7E9CBC #5C82AB #5C82AB;}\
			.vkpbframe{position:absolute; border:1px solid #36638e; overflow:hidden}\
			.vkprogbarbgframe{ background-color: #EEE; border:1px solid #ccc;}\
			.vkprogbarbg{text-shadow: 0px 1px 0px #FFF; border:1px solid #EEE; box-shadow: inset 0 10px 26px rgba(255, 255, 255, 0.5); }\
		');
		var pr = ce('div',
			{id: 'progressbar',innerHTML:ui.ProgressBar(0,1,this.progress_bar_width,text || ' ')},{padding: '10px'}
		);
		this.clearContent();
		this.appendContentElement(pr);
	},
	
	updateProgressBar: function(processedIncoming, totalIncoming, processedOutgoing, totalOutgoing) {
		var processed = processedIncoming + processedOutgoing,
			total = totalIncoming + totalOutgoing,
			percentage = (100 * processed / total),
			text = user.lang.messagesProcessed + ': ' +
			user.lang.incoming + ': ' + processedIncoming + '/' + totalIncoming + '; ' +
			user.lang.outgoing + ': ' + processedOutgoing + '/' + totalOutgoing;
		ge('progressbar').innerHTML=ui.ProgressBar(processed, total, this.progress_bar_width, text);
		/*
		ge('progressbarbg').style.width = percentage + '%';
		ge('progresstext').innerHTML = text;
		*/
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
	
		 cur.messCheckedNum = 0; actionsShown = false;
	
		this.clearContent();
		handlePageView({width:950});

		var div = ce('div', {className: 'mailbox'});
		div.innerHTML += '<div id="mail_top_msg" class="message" style="display:none;"> </div> ';
		
		this.appendContentElement(div);
		
	
		if(user.verbose) {
			SYS.log('Processing complete, rendering results');
		}
		
		var cPane = ce('div', {id:"mail_bar", className: 'clear_fix bar bar clearFix actionBar', innerHTML:
			'<div id="vkstats_text"><span>' + user.lang.thankYou + '</span>' + (messageProcessor.failed > 0 ? ' ' + user.lang.warning + ': ' + messageProcessor.failed : '') + '<div style="float:right"> &copy; <a href="' + SYS.LINK_TO_CLUB + '" target="_blank">vkontakte-stats</a>, 2010 &ndash; 2011</div></div>'
		});
		var mActions = ce('div', {id: "mail_bar_act", innerHTML: '<span class="fl_l" style="padding-top:4px;">' + user.lang.withSelected + ': </span>',"class":"fl_l"}, {display: 'none', paddingTop:"5px"});
		/*
		mActions.innerHTML += '<span id="mail_summary" style="display:none;"></span><a href="#" onclick="statCounter.exportToNote();">' + user.lang.exportToNote + '</a>';
		if(user.plotGraphs) {
			iHTML =  '<span id="plot_graphs_links"> | ';
			iHTML += '<a href="#" onclick="ui.plotGraph(false);" id="plot_msg_graph_link">' + user.lang.plotMessagesGraph + '</a>';
			if(user.kbytes) {
				iHTML += ' | ';
				iHTML += '<a href="#" onclick="ui.plotGraph(true);" id="plot_kb_graph_link">' + user.lang.plotKbytesGraph + '</a>';
			}
			mActions.innerHTML += iHTML + "</span>"
		}*/
		
		mActions.innerHTML += '<span id="mail_summary" style="display:none;"></span>';
		mActions.innerHTML += '<div class="button_gray fl_l"><button onclick="statCounter.exportToNote();">' + user.lang.exportToNote + '</button></div>';
		if(user.plotGraphs) {
			iHTML =  '<span id="plot_graphs_links">';
			iHTML += '<div class="button_gray fl_l" id="plot_msg_graph_link"><button onclick="ui.plotGraph(false);">' + user.lang.plotMessagesGraph + '</button></div>';
			if(user.kbytes) {
				iHTML += '<div class="button_gray fl_l" id="plot_kb_graph_link"><button onclick="ui.plotGraph(true);">' + user.lang.plotKbytesGraph + '</button></div>';
			}
			mActions.innerHTML += iHTML + "</span>"
		}		
		
		cPane.appendChild(ce('div', {id: "graph"}, {display:'none', width: '100%', height: '400px'}) );
		cPane.appendChild(mActions);
		div.appendChild(cPane);
		
		var tdiv = ce('div',{id:'mail_rows'});
		var table = ce('table', {cellspacing: "0", cellpadding: "0", id: 'mail_rows_t'}, {width: '100%'});
		tdiv.appendChild(table);
		div.appendChild(tdiv);
		//<td class="mail_check" onmouseover="mail.checkOver(this, '1767')" onmouseout="mail.checkOut(this, '1767')" onclick="mail.checkChange(this, '1767')" onmousedown="event.cancelBubble = true;">  <div class=""></div></td>
		tableHTML = '<thead>' + '<th class="mail_check" onmouseover="mail.checkOver(this, 0)" onmouseout="mail.checkOut(this, 0)" onclick="myCheckChange(this, 0)"><div class=""></div><input type="hidden" id="post_check_0"></th>' + 
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
			//class="mail_check" onmouseover="mail.checkOver(this, 0)" onmouseout="mail.checkOut(this, 0)"
			var tdR = ce('td', {innerHTML: uid == statCounter.ALL_ID ? '' : rank}, {textAlign: 'center',  width: "30px"});
			var tdS = ce('td', {innerHTML: '<div class=""></div><input type="hidden" id="post_check_' + uid + '">', className: 'mail_check'});
			tdS.setAttribute('onmouseover', "mail.checkOver(this, '" + uid + "')");
			tdS.setAttribute('onmouseout', "mail.checkOut(this, '" + uid + "')");
			tdS.setAttribute('onclick', "myCheckChange(this, '" + uid + "')");
			
			var tdP = ce('td', {innerHTML: uid == statCounter.ALL_ID ? '' : (!user.hideAvatars ? '<a href="/id' + uid + '" target="_blank"><img src="' + (udata.photo?udata.photo:'/images/question_c.gif') + '" /></a>':''), className: 'messagePicture'});
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
		
		mbox.addButton(user.lang.startButton,function() {mbox.hide();messageProcessor.start()});
		
		var html = '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_verbose" /></div>';
		html += '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_kbytes" /></div>';
		html += '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_sort_kbytes" /></div>';
		html += '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_friends_only" /></div>';
		html += '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_fancy_graphs" /></div>';
		html += '<div style="width: 300px; height: 30px;"><input type="hidden" id="param_hide_avatars" /></div>';
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

		new Checkbox(ge('param_sort_kbytes'), {
			label: user.lang.sortByKBytes,
			checked: 0,
			onChange: function() {user.sortByKBytes = !user.sortByKBytes;}
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
		new Checkbox(ge('param_hide_avatars'), {
			label: user.lang.hideAvatars,
			checked: 1,
			onChange: function() {user.hideAvatars = !user.hideAvatars;}
		});		
	},
	
	addLoggerPane: function(){
		var t = ce('textarea', {'cols': 80, 'rows': 20, id: 'loggerPane'}, {fontFamily: 'Courier new'});
		insertAfter(t ,ge('content'));
	},
	
	removeLoggerPane: function() {
		var a = ge('loggerPane');
		if( a != undefined) {
			a.parentNode.removeChild(a);
		}
	},
	
	onNoteNotCreated: function() {
		ge('mail_top_msg').innerHTML = '<div>'+user.lang.noteFailure+'</div>';
		show('mail_top_msg');
		//ge('mail_top_msg').style.display = 'block';
		//ge('mail_top_msg').style.visibility = 'visible';
	},
	
	onNoteCreated: function(nid) {
		ge('mail_top_msg').innerHTML = '<div>'+user.lang.noteSuccess + ". <a href=\"/note" + user.uid + '_' + nid + '" target="_blank">' + user.lang.seeNote + '</a></div>';
		show('mail_top_msg');
		//ge('mail_top_msg').style.display = 'block';
		//ge('mail_top_msg').style.visibility = 'visible';
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
		
		var table = ge('mail_rows_t');
		var graphData = '[';
		var rank = 0;
		for (var i = 0; i < table.rows.length; ++i) {
			var row = table.rows[i];
			var id = row.id ? intval(row.id.replace(/^mess/, '')) : 0;
			if (id) {
				if(cur.messChecked[id]) {
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
							sentSizes += '[' + entry + ',' + totBytesSent + '],';
							receivedSizes += '[' + entry + ',' + totBytesRec + '],';
						} else {
							totSent += histData.outM;
							totRec += histData.inM;
							sentMessages += '[' + entry + ',' + totSent + '],';
							receivedMessages += '[' + entry + ',' + totRec + '],';
						}
					}
					
					
					
					if(kBytes) {
						sentSizes += '[' + statCounter.lastMessageTime + ',' + totBytesSent + ']], "name": "' + statCounter.getUserData(id).first_name + ' ' + statCounter.getUserData(id).last_name + ': ' + user.lang.sentCol + '"}';
						receivedSizes += '[' + statCounter.lastMessageTime + ',' + totBytesRec + ']], "name": "' + statCounter.getUserData(id).first_name + ' ' + statCounter.getUserData(id).last_name + ': ' + user.lang.receivedCol + '"}';
						graphData += sentSizes + ',' + receivedSizes;
					} else {
						sentMessages += '[' + statCounter.lastMessageTime + ',' + totSent + ']], "name": "' + statCounter.getUserData(id).first_name + ' ' + statCounter.getUserData(id).last_name + ': ' + user.lang.sentCol + '"}';
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
		
		var opts = {
		  url: '/swf/graph.swf?0.28',
		  id: 'graph',
		  width: "100%",
		  height: 400,
		  version: 8
		}
		renderFlash('graph', opts, params, flashVars);		
	}
};