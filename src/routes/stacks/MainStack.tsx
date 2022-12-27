import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginPage from '@scenes/LoginPage'
import Homepage from '@scenes/Homepage';
import UserDetails from '@scenes/UserDetails';
import UsersList from '@scenes/UsersList';
import RegisterPage from '@scenes/RegisterPage';
import MainPage from '@scenes/MainPage';
import HomePreCall from '@scenes/HomePreCall';
import VideoCallScreen from '@scenes/VideoCallScreen';
import RateScreen from '@scenes/RateScreen';
import LanguagePage from '@scenes/LanguagePage';
import customTheme from '@theme';
import { FC } from 'react';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MainStack = createStackNavigator();
import { useDispatch,useSelector } from 'react-redux';
// import { userLoginPayload } from '@redux/loginReq/selectors';
import TabBar from '@scenes/TabBar';
import { getLanguages } from '../../commons/exportFunction';
import { setLanguages } from '@redux/languages/actions';
export const MainStackScreen: FC = () => {
  const dispatch = useDispatch()
  // const user = useSelector(userLoginPayload)
  // const storeToken = async() => {
  //     try{
  //         await AsyncStorage.setItem('@access-token', user.accessToken)
  //     } catch(err){
  //         console.log('err storage token')
  //     }
  // }
  // React.useEffect(() => {
  //     storeToken()
  // })
  const [token, setToken] = React.useState<string | null>(null)
  const getToken = async () => {
    // get Data from Storage
      try {
          const data = await AsyncStorage.getItem('@access-token');
          
          if (data !== null) {
              setToken(data);
              return data;
          }
      } catch (error) {
          console.log(error);
      }
  };
  React.useEffect(() => {
    getToken();
  },[token])
  console.log('token:', token)
  React.useEffect(() => {
        getLanguages().then((data) => {
            dispatch(setLanguages(data))
            // console.log(data);
        }).catch(error => console.log(error));
    })
  return (
    <MainStack.Navigator 
      initialRouteName="TabBar"
    >
      {token === null ? (
        <MainStack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      ) : ( 
        <MainStack.Screen
          name="TabBar"
          component={TabBar}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />
        )} 
      <MainStack.Screen
        name="Register"
        component={RegisterPage}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      
      <MainStack.Screen
        name="RateScreen"
        component={RateScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
        }}
      />
      <MainStack.Screen
        name="HomePreCall"
        component={HomePreCall}
        options={{
          headerShown: false,
          headerTitleAlign: 'center'
        }}
      />
      <MainStack.Screen
        name="VideoCallScreen"
        component={VideoCallScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center'
        }}
      />
      
      <MainStack.Screen
        name="MainPage"
        component={MainPage}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="Home"
        component={Homepage}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="UsersList"
        component={UsersList}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: customTheme.space[5],
          },
          headerRightContainerStyle: {
            paddingRight: customTheme.space[5],
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: customTheme.space[5],
          },
          headerRightContainerStyle: {
            paddingRight: customTheme.space[5],
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </MainStack.Navigator>
  );
};
