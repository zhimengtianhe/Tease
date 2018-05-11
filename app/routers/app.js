import { 
	StackNavigator, TabNavigator ,DrawerNavigator
} from "react-navigation"

//路由引入
import {Content,Login,Register,PerfectInformation} from "./router"

const Routers = StackNavigator(
	{
		Content:{
			screen: Content,
			navigationOptions:({navigation}) => ({  
        		header:null,  
      		}),
		},
		Login: {
			screen: Login
		},
		Register: {
			screen: Register
		},
		PerfectInformation:{
			screen:PerfectInformation
		}
	}
)

export default Routers