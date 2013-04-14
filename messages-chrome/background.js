(function () {

	chrome.tabs.create(
		{
			url: "http://oauth.vk.com/authorize?client_id=2045168&scope=6144&redirect_uri=http://oauth.vk.com/blank.html&display=popup&response_type=token"
		},
		function (tab) {
			var intervalId = window.setInterval(function () {
				chrome.tabs.get(tab.id, function (tab) {
					if (tab.url.match(/oauth\.vk\.com\/blank\.html/)) {
						window.clearInterval(intervalId);
						chrome.tabs.remove(tab.id);
					}
				});
			}, 100);
		}
	);

})();
