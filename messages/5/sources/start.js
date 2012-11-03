if (window.renderFlash){
	stManager.add(SYS.FILES_TO_LOAD, function() {
		if (window.dApi){ /*Use VkOpt API Module */
			vk_api=dApi;
         user.uid=vk.id;
			ui.requestSettings();      
      } else {
         vk_api.Auth(function(mid,secret,sid){
            user.uid=mid;
            ui.requestSettings();
         });	
      }
	});
} else {
	alert(user.lang.wrongPage);
}