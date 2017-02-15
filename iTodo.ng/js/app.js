//初始化angular
var app = angular.module("todoApp",["ngAnimate"]);
app.controller("todoCtrl",function($scope){
	//数据初始化
	$scope.app = {
		name:"Todo List",
		version:"1.0.0",
	}
	$scope.desc = false;//数据排序默认正序
	$scope.content = "";
	$scope.datas = loadData();
	
	//设置所有数据为已完成
	$scope.checkAll = function(){
		var datas = $scope.datas;
		var len = datas.length;
		for (var i=0; i<len; i++) {
			datas[i].done = $scope.ckall;
			$scope.refreshData(datas[i]);//刷新数据
		}
	}
	//提交数据
	$scope.submitData = function(){
		//获取输入框数据     console.log($scope.content);
		//将数据放到变量中，显示到页面列表中
		//$scope.datas.push($scope.content);//放在最后一个
		var cont = $scope.content.trim();//左右空格清空处理
		if(cont){//非空判断
			var data = formatData(cont);
			$scope.datas.unshift(data);//放在第一个
			$scope.content = "";//情空变量，清空输入框
			savaData(data);//保存数据
		}
	};
	//删除数据
	$scope.removeData = function(data){
		//从数据数组中查找对应的数据索引值
		var index = $scope.datas.indexOf(data);
		//从数组删除指定位置的数据
		$scope.datas.splice(index,1);
		//从本地中删除
		removeData(data)
	};
	//刷新数据
	$scope.refreshData = function(data){
		delete data.$$hashKey;//处理掉angular数据标识属性
		savaData(data);
	}
	
	//获取未完成项
	$scope.getNofinish = function(){
		var len = $scope.datas.length;
		var datas = $scope.datas;
		var count = 0;
		for (var i=0;i<len;i++) {
			if(!datas[i].done){
				count++;
			}
		}
		return count;
	}
	
	
	
});
//格式化数据
function formatData(content){
	var t = new Date().getTime();
	return {
		'id':"Todo"+t,		//数据识别ID
		'content':content,	//内容
		'done':false,		//完成
		'time':t,			//时间
		'weight':1,			//权重
	}
}
//保存数据
function savaData(data){
	//把对象转成字符串
	var str = JSON.stringify(data);
	localStorage.setItem(data.id,str);
}

//获取数据
function loadData(){
	var datas = [];//数据数组
	//遍历本地存储，获取所有数据
	var len = localStorage.length;
	for (var i =0;i<len;i++) {
		var key = localStorage.key(i);
		if(key.indexOf("Todo") > -1){//key中包含"Todo"字符串
			var data = localStorage.getItem(key);
			//将字符串转成对象json
			data = JSON.parse(data);
			datas.unshift(data);//将获取的数据放入数据数组
		}
	}
	return datas;
}

//移除数据
function removeData(data){
	localStorage.removeItem(data.id);//移除本地存储对应的数据
}


