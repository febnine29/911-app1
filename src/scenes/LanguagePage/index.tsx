import * as React from 'react'
import {
    Text,
    View,
    // BackHandler
} from 'react-native'
import { Button } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { 
    // useSelector, 
    useDispatch 
} from 'react-redux'
// import { userLoginPayload } from '@redux/loginReq/selectors'
import { 
    NavigationContainer, 
    useNavigation 
} from '@react-navigation/native'
import { GenericNavigationProps } from '@routes/types'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePreCall from '@scenes/HomePreCall'
import Homepage from '@scenes/Homepage'
// import { loadingSet } from '../../redux/loading/actions'
// import { removeAccessToken } from '@redux/loginReq/actions'

const LanguagePage = () => {
    const navigation = useNavigation<GenericNavigationProps>()
    const dispatch = useDispatch()
    // useFocusEffect(
    //     React.useCallback(() => {
    //         const onBackPress = () => {
    //             return true;
    //         };
        
    //         BackHandler.addEventListener('hardwareBackPress', onBackPress);
            
    //         return () =>
    //             BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //     }, []),
    // );
    const delToken = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log(error);
        }
    }
    const [set, reset] = React.useState<boolean>(false)
    const handleLogout = () => {
        delToken();
        reset(true)
        // dispatch(removeAccessToken())
        // navigation.navigate('Main', {screen: 'Login'})
    }
    const Tab = createBottomTabNavigator()
    return(
        <View>
            <Text>Language Page</Text>
        </View>
    )
}
export default LanguagePage