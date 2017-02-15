var box = document.getElementById("box");
var div = box.getElementsByClassName("div");
var blockcount = 0;
//方向键控制
document.onkeydown = function(event){
	var event = event || window.event;//兼容
	switch(event.keyCode){
		case 37:
		//left
			leftMove();
			break;
		case 38:
		//up
			upMove();
			break;
		case 39:
		//right
			rightMove();
			break;
		case 40:
		//down
			downMove();
			break;
		default:
			break;
	}
}

function init(){
	createBlock();
	createBlock();
}
















