import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput ,
	AsyncStorage,
	Alert
} from 'react-native';

export default class Login extends Component{
	_a=()=>{
		var that=this;
		let params = new FormData();
 			params.append("username",'21312321');  
		
		
		_b=()=>{
			params.append("passworld",'zzzzzzz');  
			console.log(params);
		}
		Alert.alert('错误提示','看看行不行',
			[
				{text:"确认", onPress:_b},
				{text:"取消"},
			]
		);
	}
	render(){
		return (
			<View>
				<Text>登录</Text>
				<Button
					title="AsyncStorage"
					color='red'
					onPress={this._a}
				/>
			</View>
		)
	}
}
