import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput ,
	AsyncStorage,
	ListView,
	TouchableOpacity,
	WebView 
} from 'react-native';

import fetch from '../../routers/Fetch';
const Fetch=new fetch();

export default class Qi extends Component {
	constructor(props) {
		super(props);
		
		this.state ={
			
		};
		
	}
	//自定义函数
	_data = () => {
		//作用域问题 这里 this 必须声明一次 改变 作用域 
		let that=this;
    	Fetch.get('https://facebook.github.io/react-native/movies.json','',function (set) {
        	console.log(set.movies[2])
        	console.log(set);
			that.setState({
        		_data: set.movies,
      		});
    	})
	}
	
	_AsyncStorage=()=>{
		//console.log(AsyncStorage.getItem("username", this.handleResult) );
		AsyncStorage.getItem("username").then(json => {
		    try {
		      		const username = JSON.parse(json);
					this.setState({
        				username: username,			
      				});
      				console.log(this.state.username);
		    } catch (e) {
	
	    	}
		    
	  	});
	}
	_b=()=>{
		console.log(this.state)
	}
	render() {
		return(
			<View>
				<Text>奇页面</Text>
				<Button
					title='获取数据'
					onPress={this._data}
				/>
				<Button
					title='获取Storage值'
					color='red'
					onPress={this._AsyncStorage}
				/>
				<Button
					title='获取state'
					color='orange'
					onPress={this._b}
				/>
				
			</View>
		)
	}
}