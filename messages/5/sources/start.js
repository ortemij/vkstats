if (window.renderFlash){
	stManager.add(SYS.FILES_TO_LOAD, function() {
		apiConnector.logon(SYS.APP_ID, SYS.LOGIN_SETTING);
	});
} else {
	alert(user.lang.wrongPage);
}