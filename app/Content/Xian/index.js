import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	Alert,
	Button,
	TouchableOpacity,
	AsyncStorage,
} from 'react-native';
import { MapView } from 'react-native-amap3d';
import fetch from '../../routers/Fetch';

const Fetch=new fetch();
const styles=StyleSheet.create({
	Text:{
		color:'red',
		fontSize:30
	}
})

export default class Xian extends Component{
	constructor(props) {
		super(props);
		
		this.state ={
			showsLocationButton: true,
			longitude:'',
			latitude:'',
			UniqueID:'',
			location:''
		};
	}
	
  	//在网页Debugger  模式下 路由跳转会很慢
  	_Login=()=>{
  		this.props.navigation.navigate('Login')
  	}
  	_Register=()=>{
  		this.props.navigation.navigate('Register')
  	}
  	//完善信息页面
  	_PerfectInformation=()=>{
  		this.props.navigation.navigate('PerfectInformation')
  	}
  	
  	_Map=(nativeEvent)=>{
    	this.setState({
        	longitude: nativeEvent.longitude ,		
        	latitude:nativeEvent.latitude,
        	location:nativeEvent.longitude+','+nativeEvent.latitude,
      	});
      	 	
	}		
	_Position=()=>{
		let that=this;
		let longitude=this.state.longitude;
		let latitude =this.state.latitude;
		let key='389880a06e3f893ea46036f030c94700';

        //逆地址编码
		Fetch.get('http://restapi.amap.com/v3/geocode/regeo?key='+key+'&location='+longitude+','+latitude+'','',function (set) {
		    console.log(set.regeocode);
			let My_location= [
				['province',set.regeocode.addressComponent.province], 	//省
				['city', set.regeocode.addressComponent.city],        	//市
				['district', set.regeocode.addressComponent.district],	//区
				['citycode', set.regeocode.addressComponent.citycode],	//市编号
				['adcode', set.regeocode.addressComponent.adcode],		//区编号
				['location', that.state.location]                     	//经纬度
			]
			//储存
			AsyncStorage.multiSet(My_location).then(  
			    ()=>{   //成功的操作  
			        console.log("My_location保存成功!");  
			    },  
			)
    	}) 
	}

  	componentDidMount(){
  		let that=this;
		this.timer=setTimeout(()=> {
     		 that._Position();
    	},500);
  	}
  
  	componentWillUnmount() {
   		this.timer && clearTimeout(this.timer);
  	}
  	
  	//查看已有的参数
  	_chan=()=>{
	  	AsyncStorage.getAllKeys((err, keys) => {  
			AsyncStorage.multiGet(keys, (err, stores) => {  
			       console.log(stores);
			      
			});  
		});   	
	}
  	//计算最近人坐标
  	_CoordinateCalculation=()=>{
  		
  		let data= [
			{name: '张三',token:123456,longitude:121.644022,latitude:38.9213957},
			{name: '李四',token:654321,longitude:121.644022,latitude:38.9103069},
			{name: '王二麻',token:987654,longitude:121.644022,latitude:38.9103969},
			{name: '赵四',token:456789,longitude:121.643022,latitude:38.9103969}
		];
	
		data.map(function(item,key,ary) {
		    let my_lon = (Math.PI / 180) * 121.642928;
			let my_lat = (Math.PI / 180) * 38.9200639;
			let nearby_lon = (Math.PI / 180) * data[key].longitude;
			let nearby_lat = (Math.PI / 180) * data[key].latitude;
			let R = 6371; //地球半径
			let km = Math.acos(Math.sin(my_lat) * Math.sin(nearby_lat) + Math.cos(my_lat) * Math.cos(nearby_lat) * Math.cos(nearby_lon - my_lon)) * R;
			let m=km * 1000;
			data[key].distance=m;
		});
		
		data.sort(function(a, b){
	        return a.distance > b.distance;
		});
	
		console.log(data);
  	}
	render(){
		
		return (
			<View>
				<Text>仙剑页面</Text>
    			<Button
        			title="获取参数"
        			color="#841584"
        			onPress={this._chan}
    			/>
     			<Button
        			title="登录"
        			color="green"
        			onPress={this._Login}
    			/>
     			<Button
        			title="地址"
        			color="blue"
        			onPress={this._Position}
    			/>
     			<Button
        			title="个人信息"
        			color="orange"
        			onPress={this._PerfectInformation}
    			/>
     			<Button
        			title="坐标计算"
        			color="paleturquoise"
        			onPress={this._CoordinateCalculation}
    			/>
     			<MapView
			        locationEnabled={this.state.showsLocationButton}
			        onLocation={({nativeEvent}) =>
	    				this._Map(nativeEvent)
	    			}
			    />
			</View>
		)
	}
	

}