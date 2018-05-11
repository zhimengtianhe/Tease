import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	PixelRatio,
	ScrollView,
	View,
	TextInput,
	Alert,
	AsyncStorage
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#03a9f4'
	},
	flex: {
		flex: 2
	},
	buttonView: {
		flex: 3
	},
	title: {
		textAlign: 'center',
		color: 'white',
		fontSize: 25,
		marginTop: 80,
		fontWeight: 'bold'
	},
	inputView: {
		padding: 5,
		backgroundColor: '#fff'
	},
	lineBottom: {
		borderBottomWidth: 5 / PixelRatio.get(),
		borderColor: 'rgb(208,208,208)'
	},
	button: {
		marginTop: 30,
		marginLeft: 10,
		marginRight: 10,
		height: 44,
		borderRadius: 2,
		backgroundColor: 'rgb(255, 64, 129)',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	buttonText: {
		fontSize: 22,
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold'
	},
	text: {
		flex: 1,
		lineHeight: 44,
		fontSize: 18,
		justifyContent: 'center',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	view: {
		flexDirection: 'row',
		height: 44
	},
	textInputStyle: {
		flex: 5,
		marginRight: 10,
		fontSize: 18,
		marginTop: 4
	},
	lineTopBottom: {
		borderBottomWidth: 3 / PixelRatio.get(),
		borderColor: 'rgb(208,208,208)'
	},
	centering: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});

import fetch from '../routers/Fetch';
const Fetch=new fetch();
export default class Zhuan extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
			phone:'',
			password:'',
    	};
  }
	//注册
	_Register=()=>{
		let that=this;
		//注册
		let params = new FormData();
 			params.append("phone",this.state.phone);
 			params.append("password",this.state.password);
		Fetch.post('http://192.168.199.83/phalapi/public/?r=User/RegisterWithPhone',params,'',function (set) {
        	/*if(set.data.code==0){
        		that.props.navigation.navigate('Login');
        	}else{
        		alert(set.data.info)
        	}
        	console.log(params);*/
        	console.log(set);
    	})
	}
	render() { 
		return(
			<ScrollView
	        	contentContainerStyle={{ flex: 1 }} 
	        	keyboardDismissMode="on-drag" 
	        	scrollEnabled={false} 
	      	>
		        <View
		          style={styles.container}
		        >
		          	<View style={styles.flex}>
		            	<Text style={styles.title}>仙剑奇侠传</Text>
		          	</View>
		          	<View style={styles.inputView}>
			            <View style={[styles.view, styles.lineTopBottom]}>
			              <Text style={styles.text}>账号:</Text>
			              <TextInput
			              	
			                style={styles.textInputStyle}
			                placeholder="请输入账号"
			                clearButtonMode="while-editing"
			                secureTextEntry={false}
			                onChangeText={(phone) => this.setState({phone})}
			               	value={this.state.phone}
			              />
			            </View>
			            <View style={[styles.view, styles.lineTopBottom]}>
			              <Text style={styles.text}>密码:</Text>
			              <TextInput
			                style={styles.textInputStyle}
			                placeholder="请输入密码"
			                clearButtonMode="while-editing"
			                secureTextEntry={true}
			                onChangeText={(password) => this.setState({password})}
			               	value={this.state.password}
			              />
			            </View>
		          	</View>
		          	<View style={styles.buttonView}>
			            <TouchableOpacity
			              style={styles.button}
			              onPress={this._Register}
			            >
			              <Text style={styles.buttonText}>注册</Text>
			            </TouchableOpacity>
		          	</View>
	
	        	</View>
	      	</ScrollView>
		)
	}
}