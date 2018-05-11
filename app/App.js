import React, { Component } from 'react';
import { 
	StyleSheet,
	Text ,
	View,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import SplashScreen from 'react-native-splash-screen';
import App from './routers/app.js';

const styles=StyleSheet.create({
	constructor:{
		flex:1,
		overflow:"hidden"
	}
})

export default class Xianjian extends Component {
	componentDidMount() {
    	SplashScreen.hide(); // 隐藏启动屏
 	}
  	render() {
	    const { navigation } = this.props;
	    return (
	    	<View style={styles.constructor}>
	    		<App  />
	    	</View>
	    	
	    );
  	}
  
}
