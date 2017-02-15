/**
 * 设置Cookie
 * @param {关键字_string} key
 * @param {值} value
 * @param {天数_Date} day
 * */
function setCookie(key, value, day) {
	var d = new Date();
	d.setDate((d.getDate() + day))
	document.cookie = key + "=" + value + "; expires=" + d;
}

/**
 * 获取Cookie列表
 * @return {JSON}
 * */
function getCookieJson() {
	var cookie = document.cookie;
	var arr = cookie.split("; "); //PS：Cookie中间隔是分号(';')加空格(' ');
	var json = {};
	for (var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split("=");
		json[arr2[0]] = arr2[1];
	}
	return json;
}

/**
 * 根据关键字获取对应的值，若不存在返回 false
 * @param {关键字_string} key
 * 
 * */
function getCookieByKey(key) {
	var cookie = document.cookie;
	var arr = cookie.split(";");
	for (var i = 0; i < arr.length; i++) {
		var a2 = arr[i].split("=");
		if (a2[0] == key) {
			return a2[1];
		}
	}
	return false;
}

/**
 * 移除cookie,关闭浏览器之后移除
 * @param {移除项_string} key
 * */
function removeCookie(key) {
	if(getCookieByKey(key)){
		setCookie(key, "", -1);
	}
}