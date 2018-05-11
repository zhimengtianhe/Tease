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
	AsyncStorage,
	Button
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import fetch from '../../routers/Fetch';
const Fetch=new fetch();
export default class Zhuan extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
			username:'',
			password:'',
			showsLocationButton: true,
			longitude:'',
			latitude:'',
			UniqueID:'',
			province:'',
			city:'',
			district:'',
			citycode:'',
			adcode:'',
			location:'',
			is_line:'true',
    	};
  	}
	
	componentDidMount(){ 
		//设备ID
		const UniqueID = DeviceInfo.getUniqueID();
		let that=this;
		this.setState({
        	UniqueID: UniqueID ,			
      	});
      	
		//默认登录账号
        AsyncStorage.getItem("username").then(json => {
		    try {
		      		const username = JSON.parse(json);
		      		if(username!=null){
		   				username=String(username);
		      			this.setState({
        					username: username ,			
      					});
      					//console.log(this.state.text);
		      		}else{
		      			this.setState({
        					username: '',			
      					});
		      		}
					
		    } catch (e) {
	
	    	}
		    
	  	});
	  	
	  	let keys = ['province','city','district','citycode','adcode','location'];
	  	AsyncStorage.multiGet(keys, function(errs, result){
            if(errs){
                return;
            }
            console.log(result);
            // console.log(result[0][1]);
            that.setState({
        		province: result[0][1] ,
        		city:result[1][1],
        		district:result[2][1],
        		citycode:result[3][1],
        		adcode:result[4][1],
        		location:result[5][1],
      		});
            
            
        });
	  	
    }
	//登录
	_Login=()=>{
		let that=this;
		//存储账号
		let keyValuePairs = [
			['username', this.state.username], 
			['password', this.state.password],
			['UniqueID', this.state.UniqueID]
		]
		//储存
		AsyncStorage.multiSet(keyValuePairs).then(  
            ()=>{   //成功的操作  
                console.log("username保存成功!");  
            },  
      	);
		

		//登录	is_line
		let params = new FormData();
 			params.append("username",this.state.username);   //账号
 			params.append("password",this.state.password);   //密码
 			params.append("device_id",this.state.UniqueID);  //手机id
 			params.append("province",this.state.province);   //省
 			params.append("city",this.state.city);			 //市
 			params.append("district",this.state.district);   //区
 			params.append("location",this.state.location);   //经度 纬度
 			params.append("citycode",this.state.citycode);   //城市编号adcode
 			params.append("adcode",this.state.adcode);   	 //区编号
		Fetch.post('http://192.168.199.83/phalapi/public/?r=User/Login',params,'',function (set) {
        	if(set.data.code==0){
        		that.props.navigation.navigate('PerfectInformation');
        	}else{
        		if(set.data.code=='-3'){
        			Alert.alert('错误提示',set.data.info,
						[
						   {text:"确认", onPress:that._NewLogin},
						   {text:"取消"},
						]
					);
        			
        			
        		}else{
        			alert(set.data.info)
        		}
        	}
        	console.log(params);
        	console.log(set);
    	})
	}
	//注册
	_Register=()=>{
  		this.props.navigation.navigate('Register')
  	}
	//重新登录
	_NewLogin=()=>{
		let params = new FormData();
		params.append("username",this.state.username);   //账号
 			params.append("password",this.state.password);   //密码
 			params.append("device_id",this.state.UniqueID);  //手机id
 			params.append("province",this.state.province);   //省
 			params.append("city",this.state.city);			 //市
 			params.append("district",this.state.district);   //区
 			params.append("location",this.state.location);   //经度 纬度
 			params.append("citycode",this.state.citycode);   //城市编号adcode
 			params.append("adcode",this.state.adcode);   	 //区编号
			params.append("is_line",this.state.is_line);
		Fetch.post('http://192.168.199.83/phalapi/public/?r=User/Login',params,'',function (set) {
        	console.log(params);
        	console.log(set);
    	})
	}
	
	_chan=()=>{
		console.log(this.state)
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
			                onChangeText={(username) => this.setState({username})}
			               	value={this.state.username}
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
			              onPress={this._Login}
			            >
			              <Text style={styles.buttonText}>登 录</Text>
			            </TouchableOpacity>
			            <TouchableOpacity
			              style={styles.Rbutton}
			              onPress={this._Register}
			            >
			              <Text style={styles.buttonText}>注册</Text>
			            </TouchableOpacity>
			            <Button 
			            	onPress={this._chan}
			            	title='获取参数'
			            	color='red'
			            />
			       
		          	</View> 
	        	</View>
	      	</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#03a9f4'
	},
	flex: {
		flex: 1
	},
	buttonView: {
		flex: 2
	},
	title: {
		textAlign: 'center',
		color: 'white',
		fontSize: 25,
		marginTop: 60,
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
	Rbutton: {
		marginTop: 30,
		marginLeft: 10,
		marginRight: 10,
		height: 44,
		borderRadius: 2,
		backgroundColor: 'blue',
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