if (window.renderFlash){
	stManager.add(SYS.FILES_TO_LOAD, function() {
		vk_api.Auth(function(mid,secret,sid){
			//alert(mid+'\n'+secret+'\n'+sid);
			user.uid=mid;
			ui.requestSettings();
		});	
	});
} else {
	alert(user.lang.wrongPage);
}