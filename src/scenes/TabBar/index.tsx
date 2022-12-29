import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomePreCall from '@scenes/HomePreCall';
import LanguagePage from '@scenes/LanguagePage';
import SettingPage from '@scenes/SettingPage'
import { 
    getAcceptStatus,
    isReject
} from '../../commons/exportFunction';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabBar(){
    const Tab = createBottomTabNavigator()
    const [accepted, setAccepted] = React.useState(false)
    React.useEffect(() =>{
        getAcceptStatus().then(json => {
            console.log('isAccepted: ', json.isAccepted)
            if(json.isAccepted === "accepted"){
                setAccepted(true)
            }
        })
        .catch(error => console.log(error))
        isReject()
    },[])
    return (
        <Tab.Navigator 
            initialRouteName={accepted ? 'LanguagePage' : 'HomePreCall'}
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#c5c5c5',
                tabBarStyle: {
                    backgroundColor: '#da0000'
                }
            }}
        >
                <Tab.Screen 
                    name="Languages" 
                    component={LanguagePage} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Ionicons size={18} name='earth' color={focused ? 'white' : '#c5c5c5'}/>
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Call" 
                    component={HomePreCall} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Ionicons size={18} name='call' color={focused ? 'white' : '#c5c5c5'}/>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Settings" 
                    component={SettingPage} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Ionicons size={18} name='settings-sharp' color={focused ? 'white' : '#c5c5c5'}/>
                        )
                    }}
                />
            </Tab.Navigator>
        )
    
}