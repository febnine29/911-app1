import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '@scenes/Homepage';
import HomePreCall from '@scenes/HomePreCall';
import LanguagePage from '@scenes/LanguagePage';
import { 
    getAcceptStatus,
    isReject
} from '../../commons/exportFunction';
import { GenericNavigationProps } from '@routes/types';
import { useNavigation } from '@react-navigation/native';
export default function TabBar(){
    const navigation = useNavigation<GenericNavigationProps>()
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
        <Tab.Navigator initialRouteName={accepted ? 'LanguagePage' : 'HomePreCall'}>
                <Tab.Screen 
                    name="Languages" 
                    component={LanguagePage} 
                    options={{
                        headerShown: false
                    }}
                />
                <Tab.Screen 
                    name="Call" 
                    component={HomePreCall} 
                    options={{
                        headerShown: false
                    }}
                />
                <Tab.Screen 
                    name="Home" 
                    component={Homepage} 
                    options={{
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
        )
    
}