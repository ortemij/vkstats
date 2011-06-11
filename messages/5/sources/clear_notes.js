
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

