
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
function vk_Msg(text,show_timeout){
vk_addcss("/* Box notify */\
.vk_top_result_baloon_wrap { padding-top: 50px;  z-index: 1000;}\
.vk_top_result_baloon {\
  text-align:center;\
  color: #FFF;  cursor: pointer;  background: url('/images/mv_bg.png');  background: rgba(0, 0, 0, 0.75);\
  -moz-border-radius: 5px;  -webkit-border-radius: 5px;  border-radius: 5px;\
  -moz-box-shadow: 0 2px 15px #888;   -webkit-box-shadow: 0 2px 15px #888;   box-shadow: 0 2px 15px #888;\
  padding: 15px 15px;  width: 380px;  text-shadow: 0px 1px 0px #262626;\
}\
div.vk_top_result_header {  font-weight: bold;  font-size: 12px;  padding-bottom: 5px;}\
div.vk_top_result_baloon a {  color: #B1DAFF;  font-weight: bold;}\
"); 
 if (!show_timeout) show_timeout=1000;
  text = text.replace('<b>', '<div class="vk_top_result_header">').replace('</b>', '</div>');
  var pageW = bodyNode.offsetWidth,
      resEl = ce('div', {
        className: 'vk_top_result_baloon_wrap fixed',
        innerHTML: '<div class="vk_top_result_baloon">' + text + '</div>'
      } , {left: (pageW - 400) / 2});
  bodyNode.insertBefore(resEl, ge('page_wrap'));
  boxRefreshCoords(resEl);
  setTimeout(function () {
    fadeOut(resEl.firstChild, 500, function () {
      re(resEl);
    });
  }, show_timeout);
}

function vkCleanNotes(min_nid){
	dApi=vk_api;
	var vk_lang={
		'nodesdel':'\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043c\u0435\u0442\u043e\u043a',
		'notesreq':'\u0417\u0430\u043f\u0440\u043e\u0441 \u0441\u043f\u0438\u0441\u043a\u0430 \u0437\u0430\u043c\u0435\u0442\u043e\u043a',
		'ClearNotes':'\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u0432\u0441\u0435\u0445 \u0437\u0430\u043c\u0435\u0442\u043e\u043a',
		'CleanNotesConfirm':'\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0438? \u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0437\u0430\u043c\u0435\u0442\u043a\u0438 \u0431\u0443\u0434\u0435\u0442 \u043d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e!',
		'DelCreatedAfterTime':'\u0423\u0434\u0430\u043b\u044f\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0437\u0430\u043c\u0435\u0442\u043a\u0438 \u0441\u043e\u0437\u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u043e\u0441\u043b\u0435:'
	}	
	var IDL=function(i){ 
		if (vk_lang[i]) return decodeURI(vk_lang[i]);
		else return i;
	};
	
	var REQ_CNT=100;
	var WALL_DEL_REQ_DELAY=400;
	var start_offset=0;
	var box=null;
	var by_time=false;
	var mids=[];
	var del_offset=0;
	var cur_offset=0;
	var abort=false;
	var filter=['owner','others','all'];
	var deldone=function(){
			box.hide();
			vk_Msg(IDL("ClearDone"),3000);	
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
			for (var i=0;i<ms.length;i++){ 
				if ((ms[i].date>del_time && by_time) || !by_time) mids.push(ms[i].nid);
			}
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
	var showLoader=function(){
		loader_box=new MessageBox({title:''});
		loader_box.setOptions({title: false, hideButtons: true}).show(); 
		hide(loader_box.bodyNode); 
		show(boxLoader);
		boxRefreshCoords(boxLoader);	
	};
	var hideLoader=function(){
		loader_box.hide();
		hide(boxLoader);
	}
	
	showLoader();
	stManager.add(['ui_controls.js','ui_controls.css','datepicker.js','datepicker.css','events.css'], function() {
		hideLoader();
		html='<div class="clear_fix info_table page_add_event_info public_add_event_box"><div class="clear_fix">\
		  <div style="padding-top:10px;" id="notes_del_by_time"></div>\
		  <div class="labeled fl_l">\
			<div class="fl_l"><input type="hidden" id="notes_del_after_date" name="notes_del_after_date"/></div>\
			<div class="fl_l" style="padding:4px 4px 0"></div>\
			<div class="fl_l"><input type="hidden" id="notes_del_after_time"/></div>\
		  </div>\
		</div></div>';		
		var aBox = new MessageBox({title: IDL('ClearNotes'),width: "285px"});
		aBox.removeButtons();
		aBox.addButton(getLang('box_no'),aBox.hide, 'no');
		aBox.addButton(getLang('box_yes'),function(){  
			del_time = ge('notes_del_after_date').value;
			aBox.hide(); 
			vkRunClean();	 
		},'yes');
		  
		aBox.content(IDL('CleanNotesConfirm')+html);
		aBox.show();
		var delTime = new Datepicker(ge('notes_del_after_date'), {time:'notes_del_after_time', width:140});
		var cb = new Checkbox(ge("notes_del_by_time"), {  width: 270,  
														  checked:by_time,  
														  label: IDL('DelCreatedAfterTime'),
														  onChange: function(state) { by_time = (state == 1)?true:false; } 
														})
	});	
}

vk_addcss('\
	.vkProg_Bar{height:19px;  text-align:center;line-height:17px; font-size:10px;}\
	.vkProg_BarFr{ background-image:url(\"/images/progress_grad.gif\"); background-color: #6D8FB3; color:#FFF; text-shadow: 0px 1px 0px #45688E;   border-style: solid;  border-width: 1px;  border-color: #7E9CBC #5C82AB #5C82AB;}\
	.vkPB_Frame{position:absolute; border:1px solid #36638e; overflow:hidden}\
	.vkProg_BarBgFrame{ background-color: #EEE; border:1px solid #ccc;}\
	.vkProg_BarBg{text-shadow: 0px 1px 0px #FFF; border:1px solid #EEE;  box-shadow: inset 0 10px 26px rgba(255, 255, 255, 0.5);}\
');
stManager.add(['ui_controls.js','ui_controls.css','datepicker.js','datepicker.css'], function() {
	vk_api.Auth(function(mid,secret,sid){
		user.uid=mid;
		vkCleanNotes(10955521);
	});
});



/*
(function floodNode(){
	if (!window.nnw) nnw=0;	nnw++;
	dApi.call('notes.add',{title:'[Test]',text:'notes flood'},function(){document.title=nnw;setTimeout(floodNode,400);});
})();
*/