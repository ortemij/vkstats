if(/http:\/\/((vk\.com)|(vkontakte.ru))\/mail.php.*/.test(location.href)) {
	apiConnector.logon(SYS.APP_ID, SYS.LOGIN_SETTING);
} else {
	alert(user.lang.wrongPage);
}