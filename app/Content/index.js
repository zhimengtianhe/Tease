import React, { Component } from 'react';
import { 
	StyleSheet,
	Text ,
	View
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import Xian from './Xian';
import Jian from './Jian';
import Qi from './Qi';
import Xia from './Xia';
import Zhuan from './Zhuan';


const activeTabColor = '#42c02e';
const defaultTabColor = '#949494';

const styles = StyleSheet.create({
  underline: {
    height: 3,
    backgroundColor: '#42c02e',
    alignItems: 'center',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#fcfcfc',
    backgroundColor: 'white',
    marginBottom: -0.5,
  },
  constructor:{
  	flex:1,
  	backgroundColor: 'pink',
  	height: 100,
  	overflow:"hidden"
  },
  Hidden:{
  	overflow:"hidden"
  }
});



export default class Content extends Component {
  render() {
    const { navigation } = this.props;
    return (
    	<View style={styles.constructor}>
    		<ScrollableTabView
		        scrollWithoutAnimation={false}
		        locked={false}
		        initialPage={0}
		        tabBarUnderlineStyle={styles.underline}
		        tabBarInactiveTextColor={defaultTabColor}
		        tabBarActiveTextColor={activeTabColor}
		        renderTabBar={() => <DefaultTabBar style={styles.border} />}
      		>
		      <Xian tabLabel='仙' navigation={navigation} />
		      <Jian tabLabel='剑' navigation={navigation} />
		      <Qi tabLabel='奇' navigation={navigation} />
		      <Xia tabLabel='侠' navigation={navigation} />
		      <Zhuan tabLabel='传' navigation={navigation} />
    		</ScrollableTabView>
    	</View>
    	
    	
    );
  }
}
