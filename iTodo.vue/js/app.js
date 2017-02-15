!function(){
	//自定义过滤器   由于组件中使用到过滤器，所以必须提前声明过滤器
	Vue.filter("time",function(message){//格式化时间
		//将时间从时间戳格式转成 yyyy-mm-dd:hh:ii:ss的格式
		let date = new Date(message);
		let Y = date.getFullYear(),
		m = date.getMonth() + 1,
		d = date.getDate(),
		H = date.getHours(),
		i = date.getMinutes(),
		s = date.getSeconds();
		if (m < 10) { m = '0' + m; }
		if (d < 10) { d = '0' + d; }
		if (H < 10) { H = '0' + H; }
		if (i < 10) { i = '0' + i; }
		if (s < 10) { s = '0' + s; }
		return Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
	});
	
	Vue.filter("checkClass",function(weight){
		//通过按照数据权重值的不同，设置不同的背景色
		return "checkbox bgc"+weight;//checkbox bgc1
	});
	//自定义组件
	//第一个参数是组件使用的标签名，不是组件的ID
	var component_todoitem = Vue.component("todoitem",{
		template:"#todoitem1",
		props:{
			/****逐渐内使用对象数据时，必须设置该属性的数据类型为对象****/
			i:{ type: Object },
		},
		methods:{
			//组件的事件方法
			//删除数据项
			removeItem:function(){
				//vm获取全局vue对象，this是点击的那块
				let index = vm.items.indexOf(this.i);
				vm.items.splice(index,1);//从vue的数据中删除当前项
				//移除本地存储的数据
				localStorage.removeItem(this.i.id);
			},
			//修改属性
			changeProp:function(prop,value){
				//根据prop参数修改对应的属性
				this.i[prop] = value;
				//修改本地存储中的属性
				localStorage.setItem(this.i.id,JSON.stringify(this.i));
			}
		}
	})
	var vm = new Vue({
		el:"#app",
		data:{
			app:{
				appName:"Itodo List",
				version:"1.0.0"
			},
			cont:"",		//输入框输入的内容
			items:[],		//todo项的数据
			query:'',		//数据过滤（是否完成）,''代表全部，true为完成，false未完成
			order:"time",	//数据排序的根据，默认根据时间
			desc:true,		//是否降序排序，默认降序
		},
		
		computed:{
			//获取排序的方式
			sc:function(){
				return this.desc?'desc':'asc';
			},
			//获取过滤排序后的数据项
			itemsByCalu:function(){
				//_.orderBy 排序
				return _.orderBy(this.items.filter(function(item){
					//根据数据进行过滤
					return vm.query === ''? true : item.done === vm.query;
				}),[this.order],[this.sc]);//this.order 排序的根据， this.sc 排序的方式(升降序)
			},
			itemsDoneCount:function(){
				//返回当前未完成项的数量
				return this.items.filter(function(item){
					return !item.done;
				}).length;
			},
		},
		methods:{
			//添加数据
			submitItem:function(){
				//检测是否为空
				if(this.cont.trim() === "") return;
				//
				let d = new Date().getTime();
				let msg = {
					id:"vtodo_" + d,
					cont:this.cont,
					time: d,
					weight:1,
					done:false,
				};
				this.items.unshift(msg);//将数据添加到数据项中
				this.cont = "";			//清空输入框
				//将数据格式从对象转成字符串，再保存在本地存储中
				localStorage.setItem(msg.id,JSON.stringify(msg));
			},
			checkAll:function(){
				//把所有的数据设置为 已完成
				this.items.forEach(function(item){
					item.done = true;
				})
			}
		},
		mounted:function(){//数据初始化
			let items = [];
			//从本地存储中获取数据
			let len = localStorage.length;//本地存储数据的长度
			//遍历数据
			for (let i =0;i<len;i++) {
				//获取数据的key
				let key = localStorage.key(i);
				//过滤数据，如果不是
				if(key.indexOf("vtodo_")===0){
					items.push(JSON.parse(localStorage.getItem(key)));
				}
			}
			//this 指代 Vue
			this.items = items;
		},
		
	});
}();
