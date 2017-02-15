var snake = document.getElementById("snake");
var apple = document.getElementById("apple");
var shead, stail;
var box = 15,
	speed = 15,
	lm = 15,
	tm = 0,
	cq = false;//穿墙控制，true:允许穿墙
var dec = "";
var docright = (parseInt(document.documentElement.clientWidth / box) - 1) * box,
	docbottom = (parseInt(document.documentElement.clientHeight / box) - 1) * box;
var timer;

function initsnake() {
	shead = document.createElement("div");
	shead.id = "shead";
	shead.className = "p3";
	shead.style.left = 7 * box + "px";
	shead.style.top = 4 * box + "px";
	dec = "p3";
	snake.appendChild(shead);
	stail = document.createElement("div");
	stail.id = "stail";
	stail.className = "p3";
	stail.style.left = 6 * box + "px";
	stail.style.top = 4 * box + "px";
	snake.appendChild(stail);
	addbody("h", 4, 5);
	addbody("h", 4, 4);
	addbody("h", 4, 3);
	rndApple();
}

function addbody(body, top, left) {
	stail.id = "";
	stail.className = body + "body";
	stail = document.createElement("div");
	stail.id = "stail";
	stail.className = "p3";
	stail.style.top = top * box + "px";
	stail.style.left = left * box + "px";
	snake.appendChild(stail);
}

function gamestart() {

}

function snaketime() {
	timer = setInterval(function() {
		snakemove()
	}, 150);
}

function changebody(obj1, obj2) {
	//身体转折的图片改变
	var sl = parseInt(shead.style.left),
		st = parseInt(shead.style.top),
		bl = parseInt(obj2.style.left),
		bt = parseInt(obj2.style.top);
	if (sl != bl && st != bt) {
		obj1.className = "tbody p";
		var headClassName = shead.className;
		switch (headClassName) {
			case "p1":
				//snake的头在水平向左方向
				obj1.className += (bt > st) ? "1" : "2";
				break;
			case "p2":
				//snake的头在垂直向上方向
				obj1.className += (bl > sl) ? "4" : "2";
				break;
			case "p3":
				//snake的头在水平向右方向
				obj1.className += (bt > st) ? "3" : "4";
				break;
			case "p4":
				//snake的头在垂直向下方向
				obj1.className += (bl > sl) ? "3" : "1";
				break;
			default:
				break;
		}
	} else {
		obj1.className = sl == bl ? "vbody" : "hbody";
	}

}

function changetail() {
	var body = snake.getElementsByTagName("div");
	var mbody = body[body.length - 2];
	var st = parseInt(stail.style.top),
		sl = parseInt(stail.style.left);
	var mt = parseInt(mbody.style.top),
		ml = parseInt(mbody.style.left);
	if (stail.style.left == mbody.style.left) {
		if (st > mt) {
			stail.className = (st - mt) == box ? "p2" : "p4";
		} else {
			stail.className = (mt - st) == box ? "p4" : "p2";
		}
	} else {
		if (sl > ml) {
			stail.className = (sl - ml) == box ? "p1" : "p3";
		} else {
			stail.className = (ml - sl) == box ? "p3" : "p1";
		}
	}
}

function checkbody(top, left, num) {
	var body = snake.getElementsByTagName("div");
	for (var i = num; i < body.length; i++) {
		if (body[i].style.top == top && body[i].style.left == left) {
			return true;
		}
	}
	return false;
}

function checkeat(top, left) {
	if (left == apple.style.left && top == apple.style.top) {
		rndApple();
		return true;
	}
	return false;
}

function rndApple() {
	var l, t;
	do {
		l = Math.floor(rndNum(0, document.documentElement.clientWidth - box) / box) * box + "px";
		t = Math.floor(rndNum(0, document.documentElement.clientHeight - box) / box) * box + "px";
	} while (checkbody(t, l, 0))
	apple.style.left = l;
	apple.style.top = t;
}

function rndNum(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}

document.onkeydown = function(e) {
	var e = e || window.event;
	keymove(e.keyCode);
}

touch.on(document, "swipeleft swiperight swipeup swipedown", function(e) {
	keymove(e.type);
});

function keymove(sw) {
	switch (sw) {
		case 37: //left
		case 'swipeleft': //left
			if (lm != 0) {
				break;
			}
			lm = -speed;
			tm = 0;
			dec = "p1";
			break;
		case 38: //up
		case 'swipeup': //up
			if (tm != 0) {
				break;
			}
			lm = 0;
			tm = -speed;
			dec = "p2";
			break;
		case 39: //right
		case 'swiperight': //right
			if (lm != 0) {
				break;
			}
			lm = speed;
			tm = 0;
			dec = "p3";
			break;
		case 40: //down
		case 'swipedown': //down
			if (tm != 0) {
				break;
			}
			lm = 0;
			tm = speed;
			dec = "p4";
			break;
		case 32:
			clearInterval(timer);
			break;
		default:
			break;
	}
	setTimeout(snakemove(), 50);
}

function snakemove() {
	var movel = shead.offsetLeft + lm + "px",
		movet = shead.offsetTop + tm + "px";
	if (cq) {
		if (shead.offsetLeft + lm < 0) {
			movel = docright + "px";
		} else if (shead.offsetLeft + lm > docright) {
			movel = "0px";
		}
		if (shead.offsetTop + tm < 0) {
			movet = docbottom + "px"
		} else if (shead.offsetTop + tm > docbottom) {
			movet = "0px";
		}
	} else {
		if (shead.offsetLeft + lm < 0 || shead.offsetLeft + lm > docright || shead.offsetTop + tm < 0 || shead.offsetTop + tm > docbottom) {
			clearInterval(timer);
			alert("你撞死了！");
			return;
		}
	}


	var body = snake.getElementsByTagName("div");
	var mbody = body[body.length - 2];

	if (checkeat(movet, movel)) {
		var div = document.createElement("div");
		div.style.left = shead.style.left;
		div.style.top = shead.style.top;
		snake.insertBefore(div, body[1]);

	} else {
		stail.style.left = mbody.style.left;
		stail.style.top = mbody.style.top;
		mbody.style.left = shead.style.left;
		mbody.style.top = shead.style.top;
		snake.insertBefore(mbody, body[1]);
	}

	shead.style.left = movel;
	shead.style.top = movet;
	shead.className = dec;
	changebody(body[1], body[2]);
	changetail();
	if (checkbody(movet, movel, 1)) {
		clearInterval(timer);
		alert("你吃了你自己了！");
		return;
	}
}


initsnake();
snaketime();