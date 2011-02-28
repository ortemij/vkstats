var start = function() {
	apiConnector.logon(SYS.APP_ID, SYS.LOGIN_SETTING);
}

var allFiles = [];

for(var i in SYS.JS_FILES_TO_LOAD) {
	allFiles.push(SYS.JS_FILES_TO_LOAD[i]);
}

for(var i in SYS.CSS_FILES_TO_LOAD) {
	allFiles.push(SYS.CSS_FILES_TO_LOAD[i]);
}

LazyLoader(allFiles, start);
