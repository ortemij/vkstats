(function () {
	var divider = document.createElement("span");
	divider.className = "divider";
	divider.innerHTML = "|";
	var span = document.createElement("span");
	var href = document.createElement("a");
	href.onclick = function () {
		var a = document.createElement('script'); 
		a.type='text/javascript'; 
		a.src=location.protocol+'//vkontakte-stats.googlecode.com/files/message-stats-core-4.3.4.js?' + Math.round((new Date).getTime()/60); 
		document.getElementsByTagName('head')[0].appendChild(a)
	};
	href.innerHTML = "Статистика сообщений";
	span.appendChild(href);

	document.getElementById('im_dialogs_summary').children[0].appendChild(divider);
	document.getElementById('im_dialogs_summary').children[0].appendChild(span);
})();
