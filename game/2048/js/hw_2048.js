
var box = document.getElementById("box");
var div = box.getElementsByClassName("div");

var bgc = rndNum(0,15);//设随机背景颜色
var num_ = rndNum(0,7);//设随机数字
var num = ["2","2","4","2","2","2","2","2"];

//随机数
function rndNum(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

//随机生成数字
function rndDivFn(){
	div[bgc].className = "div num";
	div[bgc].innerText = num[num_];
	var bgc_2 = rndNum(0,15);
	num_ = rndNum(0,7);
	if(div[bgc_2] == div[bgc]){
		bgc_2 = rndNum(0,15);
	}
	div[bgc_2].className = "div num";
	div[bgc_2].innerText = num[num_];
}
rndDivFn();

function rndDiv(){
	var rnd = rndNum(0,15);
	while(div[rnd].className == "div num"){
		rnd = rndNum(0,15);
	}
	num_ = rndNum(0,7);
	div[rnd].className = "div num";
	div[rnd].innerText = num[num_];
	
}

//方向键控制
document.onkeydown = function(event){
	var event = event || window.event;//兼容
	switch(event.keyCode){
		//left
		case 37:
			leftFn();
			break;
		//top
		case 38:
			break;
		//right
		case 39:
			rightFn();
			break;
		//bottom
		case 40:
			bottomFn();
			rndDiv();
			break;
		default:
			return;	
	}
}

//块的运动
function runFn(){
	for(var k=0;k<divNum.length;k++){
		divNum[k].style.left = divNum[k].offsetLeft + lspeed + "px";
		divNum[k].style.top = divNum[k].offsetTop + tspeed + "px";
	}
}

//类名转换
var divNum = document.getElementsByClassName("num");
var box_1 = document.getElementById("div1");
var div_1 = box_1.getElementsByTagName("div");

var box_2 = document.getElementById("div2");
var div_2 = box_2.getElementsByTagName("div");

var box_3 = document.getElementById("div3");
var div_3 = box_3.getElementsByTagName("div");

var box_4 = document.getElementById("div4");
var div_4 = box_4.getElementsByTagName("div");

//块的移动
/*function findFn(){
	for(var i=15;i>0;i--){
		if(div[i].className == "div num" && i!=0 && i!=4 && i!=8 && i!=12){
			div[i-1].className = "div num";
			div[i-1].innerText = Number(div[i].innerText) + Number(div[i-1].innerText);
			div[i].className = "div";
			div[i].innerText = "";
		}
	}
}
*/

//左键判断
function leftFn(){
	for(var s=3;s>0;s--){
		//第一行
		if(div_1[s].className == "div num" && s!=0){
			div_1[s-1].className = "div num";
			div_1[s-1].innerText = Number(div_1[s].innerText) + Number(div_1[s-1].innerText);
			div_1[s].className = "div";
			div_1[s].innerText = "";
		}
		//第二行
		if(div_2[s].className == "div num" && s!=4){
			div_2[s-1].className = "div num";
			div_2[s-1].innerText = Number(div_2[s].innerText) + Number(div_2[s-1].innerText);
			div_2[s].className = "div";
			div_2[s].innerText = "";
		}
		//第三行
		if(div_3[s].className == "div num" && s!=8){
			div_3[s-1].className = "div num";
			div_3[s-1].innerText = Number(div_3[s].innerText) + Number(div_3[s-1].innerText);
			div_3[s].className = "div";
			div_3[s].innerText = "";
		}
		//第四行
		if(div_4[s].className == "div num" && s!=12){
			div_4[s-1].className = "div num";
			div_4[s-1].innerText = Number(div_4[s].innerText) + Number(div_4[s-1].innerText);
			div_4[s].className = "div";
			div_4[s].innerText = "";
		}
	}
}

//右键判断
function rightFn(){
	for(var d=0;d<4;d++){
		//第一行
		if(div_1[d].className == "div num" && d!=3){
			div_1[d+1].className = "div num";
			div_1[d+1].innerText = Number(div_1[d].innerText) + Number(div_1[d+1].innerText);
			div_1[d].className = "div";
			div_1[d].innerText = "";
		}
		//第二行
		if(div_2[d].className == "div num" && d!=7){
			div_2[d+1].className = "div num";
			div_2[d+1].innerText = Number(div_2[d].innerText) + Number(div_2[d+1].innerText);
			div_2[d].className = "div";
			div_2[d].innerText = "";
		}
		//第三行
		if(div_3[d].className == "div num" && d!=11){
			div_3[d+1].className = "div num";
			div_3[d+1].innerText = Number(div_3[d].innerText) + Number(div_3[d+1].innerText);
			div_3[d].className = "div";
			div_3[d].innerText = "";
		}
		//第四行
		if(div_4[d].className == "div num" && d!=15){
			div_4[d+1].className = "div num";
			div_4[d+1].innerText = Number(div_4[d].innerText) + Number(div_4[d+1].innerText);
			div_4[d].className = "div";
			div_4[d].innerText = "";
		}
	}
}

//上键判断
function topFn(){
	/*
	for(var e=15;e>11;e--){
		for(var r=e-4;r>=0;r-4){
			if(div[e].className == "div num"){
				div[e-4].className = "div num";
				div[e-4].innerText = Number(div[e].innerText) + Number(div[e-4].innerText);
				div[e].className = "div";
				div[e].innerText = "";
			}
		}
	}
	*/
	
	//第一列
	for(var f=12;f>0;f-4){
		if(div[f].className == "div num"){
			div[f-4].className = "div num";
			div[f-4].innerText = Number(div[f].innerText) + Number(div[f-4].innerText);
			div[f].className = "div";
			div[f].innerText = "";
		}
	}
	
	/*
	//第二列
	for(var g=13;g>=0;g-4){
		if(divTop[g].className == "div num" && g!=1){
			divTop[g-4].className = "div num";
			divTop[g-4].innerText = Number(divTop[g].innerText) + Number(divTop[g-4].innerText);
			divTop[g].className = "div";
			divTop[g].innerText = "";
		}
	}
	
	//第三列
	for(var h=14;h>=0;h-4){
		if(divTop[h].className == "div num" && h!=2){
			divTop[h-4].className = "div num";
			divTop[h-4].innerText = Number(divTop[h].innerText) + Number(divTop[h-4].innerText);
			divTop[h].className = "div";
			divTop[h].innerText = "";
		}
	}
	
	//第四列
	for(var w=15;w>=0;w-4){
		if(divTop[w].className == "div num" && w!=3){
			divTop[w-4].className = "div num";
			divTop[w-4].innerText = Number(divTop[w].innerText) + Number(divTop[w-4].innerText);
			divTop[w].className = "div";
			divTop[w].innerText = "";
		}
	}
	*/
}

//按下判断
function bottomFn(){
	
	//第一列
	for(var t=0;t<9;t+=4){
		if(div[t].className == "div num"){
			div[t+4].className = "div num";
			if(div[t].innerText == div[t+4].innerText){
				div[t+4].innerText = Number(div[t].innerText) + Number(div[t+4].innerText);
			}else{
				div[t+4].innerText = div[t].innerText;
			}
			div[t].className = "div";
			div[t].innerText = "";
		}
	}
}



























