var time = document.getElementById("time");
var score = document.getElementById("score");
var btn = document.getElementById("btn");
var show = document.getElementById("show");
var finish = document.getElementById("finish");
var tips = document.getElementById("tips");
var rbtn = document.getElementById("restart");
var level = 1,
	clock = 60.00,
	_score = 0;
var acolor= ["#339966","#0099FF","#6600FF","#993366","#FF3399","#FFCC99","#CCCC99","#66FFCC","#CC3300"];

function setshow() {
	var height = document.documentElement.clientHeight - (btn.offsetTop + btn.offsetHeight) - 60;
	var width = document.documentElement.clientWidth;
	var value = height < width ? height : width - 10;
	show.style.width = value + "px";
	show.style.height = value + "px";
	finish.style.paddingTop = (value / 2 - 50) + "px";
}

setshow();


btn.onclick = function() {
	this.style.visibility = "collapse";
	level = 1;
	setgame();
	startgame();
}

rbtn.onclick = function() {
	finish.style.display = "none";
}

function startgame() {
	var timer = setInterval(function() {
		clock -= 0.05;
		time.innerText = "剩余时间 " + clock.toFixed(2) + " 秒";
		if (clock <= 0) {
			clearInterval(timer);
			time.innerText = "剩余时间 0.00  秒";
			finish.style.display = "block";
			tips.innerHTML = "时间到，游戏结束<br/>你的游戏得分为：" + _score;
			endgame();
		}
	}, 50);
}

function setgame() {
	if (level < 10) {
		level++;
	}
	show.innerHTML = "";
	var rnd = rndnum(0, level * level);
	for (var i = 0; i < level * level; i++) {
		var dw = show.offsetWidth / level - 4;
		var od = document.createElement("div");
		od.style.width = dw + "px";
		od.style.height = dw + "px";
		od.style.backgroundColor = acolor[rndnum(0, 9)];
		od.className = "img1";
		if (i == rnd) {
			od.onclick = function() {
				addscore();
				setgame();
			}
			od.className = "img2";
		}
		show.appendChild(od);
	}
}

function addscore() {
	_score++;
	score.innerText = "得分 ：" + _score;
}

function endgame() {
	btn.style.visibility = "visible";
	level = 1;
	clock = 60.00;
	_score = 0;
	time.innerText = "剩余时间 60.00 秒";
	score.innerText = "得分 ：0";
	show.innerHTML = "";
}

function rndnum(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}