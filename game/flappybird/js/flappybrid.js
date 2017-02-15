var bimgw = 26,
	cimgw = 151;
var bwidth, cwidth;
var step = 3,
	cstep = 1,
	dstep = 2,
	rstep = 1;
var pipeheight = 0,
	space = 120,
	scoreline = 0;
var score = 0,
	birdro = 0,
	game = {},
	gameover = false;
var $div_banner = $(".footer_banner>div"),
	$div_city = $(".footer_city>div");

$("#startbtn").on("touchstart", function(e) {
	$("#start").css("display", "none");
	$("#game").css("display", "block");
	e.stopPropagation();
	gameStart();
});


function gameinit() {

	bwidth = Math.ceil($(".footer_banner").width() / bimgw) * bimgw + bimgw;
	$(".footer_banner").width(bwidth);
	$div_banner.eq(0).css("left", "0px");
	$div_banner.eq(1).css("left", bwidth + "px");

	cwidth = Math.ceil($(".footer_city").width() / cimgw) * cimgw + cimgw;
	$(".footer_city").width(cwidth);
	$div_city.eq(0).css("left", "0px");
	$div_city.eq(1).css("left", cwidth + "px");

	pipeheight = $(window).height() - 62; //获得管子高度
	move();
}


function gameStart() {
	score = 0;
	birdro = 0;
	game = {};
	gameover = false;
	createScore();
	createBird();
	createPipe();
	$(document).on("touchstart", function(e) {
		birdMoveUp();
	});
	$("#okbtn").off("touchstart")
}

function gameOver() {
	gameover = true;
	clearInterval(game.movetimer);
	$(document).off("touchstart");
	showScoreBar();
	$(".bar").addClass("baranimate");
	$("#okbtn").addClass("btnanimate");
	$("#okbtn").on("touchstart", function() {
		$(".bar").removeClass("baranimate");
		$("#okbtn").removeClass("btnanimate");
		$("#game").empty();
		$("#over").hide(500);
		$("#start").show(400);
	})
}

function createScore() {
	$score = $('<div id="score"><img src="img/0.png"/></div>');
	$("#game").append($score);
}

function createBird() {
	var birdimg = rndNum(1, 4);
	$bird = $('<div id="bird"></div>');
	$bird.css("background-image", "url(img/b" + birdimg + ".gif)")
	$("#game").append($bird);
	game.$bird = $bird;
	scoreline = $bird.position().left + 4;
	birdro = 0;
	birdMoveDown();
}

function createPipe() {
	var pipe = '<div class="pipe" style="height: ' + pipeheight + 'px;left: ' + bwidth + 'px;' + '"><div class="up"></div><img src="img/pipe_up.png"/><img src="img/pipe_down.png" /><div class="dp"></div></div>';
	$pipe = $(pipe);
	changePipe($pipe);
	$("#game").append($pipe);
	$("#game").append(pipe);
	$("#game").append(pipe);
}

function changePipe($pipe) {
	var h = pipeheight - 120 - space; // 可变长度
	var h0 = ($pipe.children().eq(0).height(rndNum(1, h))).height();
	$pipe.children().eq(1).css("top", h0);
	$pipe.children().eq(2).css("top", h0 + 60 + space);
	$pipe.children().eq(3).css({
		height: h - h0,
		top: h0 + 60 + space + 60
	});
	pipeMove($pipe, h0);
}

function pipeMove($pipe, h0) {
	var scorebol = true,
		createbol = true;
	var dist = 180;
	var timer = setInterval(function() {
		if (gameover) {
			clearInterval(timer);
			return;
		}
		var l = $pipe.position().left;
		l -= step;
		$pipe.css("left", l);

		var bw = game.$bird.width();
		var bh = game.$bird.height();
		var bt = game.$bird.position().top;
		var bl = game.$bird.position().left;

		//bt = birdro > 20 || birdro < -20 ? bt + 5 : bt; //高度偏转调整
		if (l < bl + bw && l + 60 > bl) {
			if (bt + 5 < h0 + 60 || bt + bh > h0 + 60 + space) {
				gameOver();
			}
		}

		if (l + 60 < scoreline + 5 && scorebol) {
			addScore();
			scorebol = false;
		}

		if (createbol && $(window).width() - l >= dist) {
			var pipeobj = $pipe.next().length > 0 ? $pipe.next() : $pipe.prev().prev();
			changePipe(pipeobj);
			createbol = false;
		}

		if (l < -60) {
			clearInterval(timer);
			$pipe.css("left", $(window).width());
		}

	}, 30);
}


function birdMoveUp() {
	var t = game.$bird.position().top;
	game.$bird.get(0).className = "birdUp";
	setTimeout(function() {
		game.$bird.removeClass("birdUp").addClass("birdMove");
	}, 200);
	tweenFn(-50, 20, "easeOut", function() {
		birdMoveDown();
	})
}

function birdMoveDown() {
	game.$bird.removeClass("birdMove").addClass("birdDown")
	var change = $(window).height() - 65 - ($bird.offset().top + $bird.height());
	tweenFn(change, 30, "easeIn", function() {
		if (!gameover) {
			gameOver();
		}
	});
}

var birdtimer = null;

function tweenFn(change, endt, attr, cb) {
	var start = $bird.offset().top;
	var change = change;
	var t = 0;
	var endT = endt;
	clearInterval(birdtimer);
	birdtimer = setInterval(function() {
		t++;
		if (t >= endT) {
			clearInterval(birdtimer);
			cb && cb();
		};
		var birdT = Tween.Cubic[attr](t, start, change, endT);
		game.$bird.css("top", birdT);
	}, 30)
}


function move() {
	game.movetimer = setInterval(function() {
		cityMove();
		bannerMove();
	}, 30);
}

function bannerMove() {
	var l1 = $div_banner.eq(0).position().left,
		l2 = $div_banner.eq(1).position().left;
	l1 = l1 - step <= -bwidth ? l2 - step + bwidth : l1 - step;
	l2 = l2 - step <= -bwidth ? l1 + bwidth : l2 - step;
	$div_banner.eq(0).css("left", l1);
	$div_banner.eq(1).css("left", l2);
}


function cityMove() {
	var l1 = $div_city.eq(0).position().left,
		l2 = $div_city.eq(1).position().left;
	l1 = l1 - cstep <= -cwidth ? l2 - cstep + cwidth : l1 - cstep;
	l2 = l2 - cstep <= -cwidth ? l1 + cwidth : l2 - cstep;
	$div_city.eq(0).css("left", l1);
	$div_city.eq(1).css("left", l2);
}

function addScore() {
	score++;
	_s = score.toString();
	$("#score").empty();
	var imgDom = '';
	for (var i = 0; i < _s.length; i++) {
		imgDom += '<img src="img/' + _s[i] + '.png"/>';
	}
	$("#score").append(imgDom);
}

function showScoreBar() {
	$("#over").show();
	$(".bar>.now").text(score);
	var s = 0;
	if(localStorage){
		if(localStorage.getItem("score")!=undefined){
			s = localStorage.getItem("score");
		}
		localStorage.setItem("score",Math.max(s, score));
		$(".bar>.best").text(localStorage.getItem("score"));
	}else{
		$(".bar>.best").text(score);
	}
//	if (getCookieByKey("bestScore")) {
//		s = getCookieByKey("bestScore");
//	}
//	setCookie("bestScore", Math.max(s, score), 14);
//	$(".bar>.best").text(getCookieByKey("bestScore"));
}