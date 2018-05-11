import React, { Component } from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	Button,
	ListView
} from 'react-native';

import fetch from '../../routers/Fetch';
const Fetch=new fetch();

export default class Xia extends Component{
	constructor(props) {
		super(props);
		
		this.state ={
			dataSource: new ListView.DataSource({  
                rowHasChanged: (row1, row2) => row1 !== row2,  
            }),  
            loaded: false,  
		};
		
	}
	componentDidMount(){ 
        this.fetchData();  
    }
	fetchData = () => {
		let that=this;
    	Fetch.get('https://facebook.github.io/react-native/movies.json','',function (set) {
      		that.setState({  
                dataSource: that.state.dataSource.cloneWithRows(set.movies),  
                loaded: true,  
            });  
    	})
	}
	render(){
		if (!this.state.loaded) {  
            return this.renderLoadingView();  
        }
		return (  
            <ListView  
                dataSource={this.state.dataSource}  
                renderRow={this.renderMovie}  
                style={styles.listView}  
            />  
          
        );  
	}
	renderLoadingView(){  
        return (
        	<View style={styles.container} >
                <Text>Loading movies......</Text>  
            </View>  
        );  
    } 
    renderMovie(movie) {  
        return (  
            <View style={styles.container}>  
                <View style={styles.rightContainer}>  
                    <Text style={styles.title}>{movie.title}</Text>  
                    <Text style={styles.year}>{movie.releaseYear}</Text>  
                </View>  
            </View>  
         );  
    }  
}
var styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        flexDirection: 'row',  
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: '#F5FCFF',  
    },  
    rightContainer: {  
        flex: 1,  
    },  
    title: {  
        fontSize: 20,  
        marginBottom: 8,  
        textAlign: 'center',  
    },  
    year: {  
        textAlign: 'center',  
    },  
    thumbnail: {  
        width: 53,  
        height: 81,  
    },  
    listView: {  
        paddingTop: 20,  
        backgroundColor: '#F5FCFF',  
    },  
});  


