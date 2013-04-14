(function () {
	var attach = function () {
		if (document.getElementById('vkontakte_stats')) {
			return;
		}
		var divider = document.createElement("span");
		divider.className = "divider";
		divider.innerHTML = "|";
		var span = document.createElement("span");
		span.id = "vkontakte_stats";
		var href = document.createElement("a");
		href.onclick = function () {
			var a = document.createElement('script'); 
			a.type='text/javascript'; 
			a.src=location.protocol+'//vkontakte-stats.googlecode.com/files/message-stats-core-4.3.6.js?' + Math.round((new Date).getTime()/60); 
			document.getElementsByTagName('head')[0].appendChild(a)
		};
		href.innerHTML = "Статистика сообщений";
		span.appendChild(href);

		document.getElementById('im_dialogs_summary').children[0].appendChild(divider);
		document.getElementById('im_dialogs_summary').children[0].appendChild(span);
	};

	var onLocationChange = function () {
		attach();
	};

	var lastLocation = window.location.href;
	var regex = /.*\/im$/;

	if (regex.exec(lastLocation)) {
		attach();
	}

	window.setInterval(function () {
		var l = window.location.href;
		if (lastLocation != l) {
			var match = regex.exec(l);
			if (match) {
				onLocationChange();
			}
		}
		lastLocation = l;
	}, 100);
})();
