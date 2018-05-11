import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	Alert,
	Button,
	TouchableOpacity,
	Image,
	Platform
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import fetch from '../routers/Fetch';
const Fetch=new fetch();


let options = {
	title: '请选择图片来源',
	cancelButtonTitle:'取消',
	takePhotoButtonTitle:'拍照',
	chooseFromLibraryButtonTitle:'相册图片',
  
    storageOptions: {
	    skipBackup: true,
	    path: 'images'
  	}
};

export default class PerfectInformation extends Component{
	constructor(props) {
    	super(props);
	    this.state = {
	        avatarSource: null
	    };
    }
	_ChoosePic=()=> {
    	ImagePicker.showImagePicker(options, (response) => {
    		
      		console.log('Response = ', response);
      		
		    if (response.didCancel) {
		    	
		    	console.log('用户取消了选择！');
		    	
		    }else if (response.error) {
		    	
        		alert("ImagePicker发生错误：" + response.error);
        		
      	}else {
		        let source = { uri: response.uri };
		        console.log(1);
		        
		        this._FetchImage(response);
		        
		        this.setState({
		        	avatarSource: source
		        });
		       
      		}
    	});
   	}
	_FetchImage=(ImageResponse)=>{
	  	console.log(ImageResponse);
	  	/*let url = '';
	    let file = {uri: ImageResponse.path, type: 'multipart/form-data', name:'image.png' };
	
	    let formData = new FormData();
	    formData.append('file', file);
	
	    fetch(url,{
	        method:'POST',
	        headers:{
	            'Content-Type':'multipart/form-data',
	        },
	        body:formData,
	    }).then(function (response) {
	        console.log("response",response);
	        return response.json();
	    })*/
    }
  	render() {
	    return (
	      	<View>
	      		<Text>完善资料页</Text>
	      		<View style={styles.container}>
			        <Text style={styles.item} onPress={this._ChoosePic}>选择照片</Text>
			        <Image source={this.state.avatarSource} style={styles.image} />
	        	</View>
	      	</View>
	    )
  	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		marginTop:25
	},
    item:{
	    margin:15,
	    height:30,
	    borderWidth:1,
	    padding:6,
	    borderColor:'#ddd',
	    textAlign:'center'
    },
    image:{
	   height:198,
	   width:300,
	   alignSelf:'center',
    },
});