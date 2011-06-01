if (window.renderFlash){
	stManager.add(['mail.css','mail.js','ui_controls.js','ui_controls.css'], function() {
		apiConnector.logon(SYS.APP_ID, SYS.LOGIN_SETTING);
	});
} else {
	alert(user.lang.wrongPage);
}