function createBlock() {
	setTimeout(function(){
	do{
	   var pos = rndNum(0,15);
	}while(div[pos].className == "div num");
		div[pos].className = "div num"
		div[pos].innerText = (Math.random()<0.93)?"2":"4";
	},500);
}


function downMove(){
	var movebol = false;
	for (var i=0;i<4;i++) {
		for (var j=12+i;j>i;j=j+(-4)) {
			for (var k=j+(-4);k>=i;k=k+(-4)) {
				if(div[k].innerText){
					if(!div[j].innerText){
						//没有数字
						moveToSpace(j,k);
						j = j - (-4);
						movebol = true;
					}else{
						//有数字
						if(div[k].innerText == div[j].innerText){
							moveToCom(j,k);
							movebol = true;
						}	
					}
					break;
				}
			}
		}
	}
	movebol && createBlock();
}



function upMove(){
	var movebol = false;//记录是否有移动
	for (var i=0;i<4;i++) {
		for (var j=i;j<i+12;j=j+(4)) {
			for (var k=j+(4);k<i+16;k=k+(4)) {
				if(div[k].innerText){
					if(!div[j].innerText){
						//没有数字
						moveToSpace(j,k);
						j = j - (4);
						movebol = true;
					}else{
						//有数字
						if(div[k].innerText == div[j].innerText){
							moveToCom(j,k);
							movebol = true;
						}	
					}
					break;
				}
			}
		}
	}
	movebol && createBlock();
}

function leftMove(){
	var movebol = false;//记录是否有移动
	for (var i=0;i<4;i++) {
		for (var j=i*4;j<(i+1)*4;j=j+(1)) {
			for (var k=j+(1);k<(i+1)*4;k=k+(1)) {  
				if(div[k].innerText){
					if(!div[j].innerText){
						//没有数字
						moveToSpace(j,k);
						j = j - (1);
						movebol = true;
					}else{
						//有数字
						if(div[k].innerText == div[j].innerText){
							moveToCom(j,k);
							movebol = true;
						}	
					}
					break;
				}
			}
		}
	}
	movebol && createBlock();
}


function rightMove(){
	var movebol = false;//记录是否有移动
	for (var i=0;i<4;i++) {
		for (var j=(i*4+3);j>i*4;j=j+(-1)) {
			for (var k=j+(-1);k>=i*4;k=k+(-1)) {  
				if(div[k].innerText){
					if(!div[j].innerText){
						//没有数字
						moveToSpace(j,k);
						j = j - (-1);
						movebol = true;
					}else{
						//有数字
						if(div[k].innerText == div[j].innerText){
							moveToCom(j,k);
							movebol = true;
						}	
					}
					break;
				}
			}
		}
	}
	movebol && createBlock();
}







function moveToSpace(j,k){
	div[j].innerText = div[k].innerText;
	div[j].className = "div num"
	div[k].innerText = "";	
	div[k].className = "div";
}

function moveToCom(j,k){
	div[j].innerText = 2 * parseInt(div[j].innerText);
	div[k].innerText = "";	
	div[k].className = "div";
}




