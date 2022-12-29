import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { FC } from 'react';
import { routeOverlayOption } from './routeOptions';
import { MainStackScreen } from './stacks/MainStack';
import LoginPage from '@scenes/LoginPage'
import RegisterPage from '@scenes/RegisterPage';
import HomePreCall from '@scenes/HomePreCall';
import VideoCallScreen from '@scenes/VideoCallScreen';
import CallWaiting from '@scenes/CallWaiting';
import TabBar from '@scenes/TabBar';
import LoadingScreen from '@components/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import { loadingGetStatus } from '@redux/loading/selectors';
import { getLanguages } from '../commons/exportFunction';
import { setLanguages } from '@redux/languages/actions';
import { ILoading } from '@redux/loading/reducers';
const RootStack = createStackNavigator();

export const RootStackScreen: FC = () => {
  const rootLogged = useSelector(loadingGetStatus)
  console.log('rootLogged', rootLogged);
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(loadingGetStatus)
  const [logged, setLogged] = React.useState<ILoading>()
  const [token, setToken] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
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
      } finally {
        setLoading(false);
      }
  };

  React.useEffect(() => {
    setLoading(true)
    getToken(); 
    console.log('access: ', token)
  },[token])
  React.useEffect(() => {
    getLanguages().then((data) => {
        dispatch(setLanguages(data))
    }).catch(error => console.log(error));
  })
  React.useEffect(() => {
    setLogged(isLoggedIn)
  },[isLoggedIn])
  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <RootStack.Navigator screenOptions={{ presentation: 'modal', ...routeOverlayOption }}>
      {token === null ? (
        <RootStack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      ) : ( 
        <RootStack.Screen
          name="TabBar"
          component={TabBar}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
          }}
        />
        )} 
      <RootStack.Screen
        name="Register"
        component={RegisterPage}
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS
        }}
      />
      <RootStack.Screen
        name="HomePreCall"
        component={HomePreCall}
        options={{
          headerShown: false,
          headerTitleAlign: 'center'
        }}
      />
      <RootStack.Screen
        name="VideoCallScreen"
        component={VideoCallScreen}
        options={{
          headerShown: false,
          headerTitleAlign: 'center'
        }}
      />
       <RootStack.Screen
        name="CallWaiting"
        component={CallWaiting}
        options={{
          headerShown: false,
          headerTitleAlign: 'center'
        }}
      />
    </RootStack.Navigator>
  );
};
