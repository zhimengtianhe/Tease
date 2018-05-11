import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	Button,
} from 'react-native';
import fetch from '../../routers/Fetch';
import DeviceInfo from 'react-native-device-info';
const Fetch=new fetch();
export default class Jian extends Component{
	_data = () => {
    	Fetch.post('http://jspang.com/DemoApi/oftenGoods.php','','hanchao',function (set) {
        	console.log(set)
    	})
	}
	_Ip=()=>{
		const UniqueID = DeviceInfo.getUniqueID();
		console.log(UniqueID);
	}
	constructor(props){
    	super(props);

	    this.state = {
	      data: null,
	    };
  	}
	render(){
		return (
			<View>	
				<Text>剑页面</Text>
				<Button
					title="获取数据POST"
					onPress={this._data}
				/>
				<Button
					title="获取设备信息"
					color='orange'
					onPress={this._Ip}
				/>
			</View>
		)
	}
}
