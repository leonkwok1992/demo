var game = document.getElementById("gamebg");
var loading = document.getElementById("loading");
var div = document.getElementById("show");
var oDiv = div.getElementsByTagName("div");
var sbtn = document.getElementById("start");
var time = document.getElementById("time");
var score = document.getElementById("score");
var finish = document.getElementById("finish");
var rbtn = document.getElementById("restart");

var arrimg = ["img/h.png", "img/x.png", "img/game_bg.jpg"];
var countimg = 0;


for (var i = 0; i < arrimg.length; i++) {
	var img = new Image();
	img.src = arrimg[i];
	img.onload = function() {
		countimg++;
		loading.innerText += ".";
		if (countimg == arrimg.length - 1) {
			game.style.display = "block";
			loading.style.display = "none";
			score.style.fontSize = parseInt(document.documentElement.clientHeight * 0.0365) + "px";
			sbtn.style.lineHeight = sbtn.clientHeight + "px";
			sbtn.style.fontSize = (sbtn.clientHeight > 42 ? (sbtn.clientHeight - 30) : 12) + "px"
			time.children[0].style.width = time.offsetWidth + "px";
			timelong = time.clientWidth;
		}
	}
}

var _score = 0,
	_time = 20,
	s = 60 * _time,
	level = 1,
	levelnum = 1,
	timelong = 0, //屏幕宽度
	hitcount = 0;
var holdarr = new Array(9);

sbtn.onclick = function() {
	this.style.display = "none";
	timestart();
}

rbtn.onclick = function() { //重新开始，初始化
	sbtn.style.display = "block";
	finish.style.display = "none";
	time.style.width = timelong + "px";
	score.innerText = 0;
	_score = 0;
	level = 1;
	levelnum = 1;
	hitcount = 0;
	s = 60 * _time;
}

function initdiv() {
	for (var i = 0; i < 9; i++) {
		holdarr[i] = false;
		oDiv[i].name = "";
		oDiv[i].index = i;
		oDiv[i].style.display = "none";
		oDiv[i].onclick = function() {
			if (this.name === "") {
				return;
			}
			if (this.name === "h") {
				addscore(10);
				hitplay(this);
				hitcount++;
				console.log(hitcount);
				if (hitcount == 30 || hitcount == 55 || hitcount == 75 || hitcount == 90) {
					hitNum();
				}
				return;
			}
			if (this.name === "x") {
				hitplay(this);
				addscore(-10);
				hitcount = 0;
			}
		}
	}
}


function timestart() {
	var sl = timelong / s;
	console.log(sl);
	gamestart(this);
	var obj = this;
	var timer = setInterval(function() {
		s--;
		time.style.width = (s * sl) + "px";
		if (s <= 0) {
			clearInterval(timer);
			clearInterval(obj.gametimer);
			timeend();
		}
	}, 1000 / _time);
}

function gamestart(obj) {
	var num;
	obj.gametimer = setInterval(function() {
		num = rndNum(1, levelnum + 1);
		for (var i = 0; i < num; i++) {
			var h = rndNum(0, 9);
			if (holdarr[h]) {
				continue;
			}
			holdarr[h] = true;
			if (!oDiv[h].style.backgroundImage) {
				var pic = rndNum(0, (10 + level)) >= (1 + level) ? "h" : "x";
				oDiv[h].style.backgroundImage = "url(img/" + pic + ".png)";
				oDiv[h].name = pic;
				createUp(oDiv[h]);
			}
		}
	}, 500 - (level * level * 4.5));
}


function createUp(obj) {
	var i = 0;
	obj.style.display = "block";
	clearInterval(obj.amtplay);
	obj.amtplay = setInterval(function() {
		obj.style.backgroundPosition = (-obj.offsetWidth * i) + "px 0px";
		if (i++ >= 5) {
			clearInterval(obj.amtplay);
			obj.amtplay = setTimeout(function() {
				createDown(obj, 70);
			}, 500 - (level * 50));
		}
	}, 100 - (level * 5));
}

function createDown(obj, t) {
	var i = 5;
	clearInterval(obj.amtplay);
	obj.amtplay = setInterval(function() {
		i--
		obj.style.backgroundPosition = (-obj.offsetWidth * i) + "px 0px";
		if (i <= 0) {
			clearInterval(obj.amtplay);
			clearobj(obj);
		}
	}, t);
}

function hitplay(obj) {
	var i = 6;
	obj.name = "";
	clearInterval(obj.amtplay);
	obj.amtplay = setInterval(function() {
		obj.style.backgroundPosition = (-obj.offsetWidth * i) + "px 0px";
		if (i++ >= 9) {
			clearInterval(obj.amtplay);
			obj.amtplay = setTimeout(function() {
				createDown(obj, 30)
			}, 100);
		}
	}, 200);
}

function timeend() {
	finish.style.display = "block";
	finish.children[1].innerText = "你的得分：" + _score;
	rbtn.style.lineHeight = rbtn.clientHeight + "px";
	finish.style.fontSize = (rbtn.clientHeight > 37 ? (rbtn.clientHeight - 25) : 12) + "px";
}

function hitNum() {
	console.log("time up");
	s = s < (40 * _time) ? s + 20 * _time : 60 * _time;
}

function addscore(num) {
	_score += num;
	score.innerText = _score;
	if (num > 0 && level < 10) {
		levelup();
	}
}

function levelup() {
	console.log("level:" + level);
	level = parseInt(_score / 60) + 1;
	if ((level == 3 || level == 8) && (_score % 60 == 0)) {
		console.log("level up");
		levelnum++;
	}
}

function rndNum(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}

function clearobj(obj) {
	obj.style.background = "";
	obj.style.display = "none";
	obj.name = "";
	holdarr[obj.index] = false;
}

initdiv();