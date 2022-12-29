import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginPage from '@scenes/LoginPage'
import RegisterPage from '@scenes/RegisterPage';
import HomePreCall from '@scenes/HomePreCall';
import VideoCallScreen from '@scenes/VideoCallScreen';
import CallWaiting from '@scenes/CallWaiting';
import TabBar from '@scenes/TabBar';
import { FC } from 'react';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguages } from '../../commons/exportFunction';
import { setLanguages } from '@redux/languages/actions';
import { loadingGetStatus } from '@redux/loading/selectors';
import LoadingScreen from '@components/LoadingScreen';
import { ILoading } from '@redux/loading/reducers';
const MainStack = createStackNavigator();

export const MainStackScreen: FC = () => {
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
  },[token])
  React.useEffect(() => {
    getLanguages().then((data) => {
        dispatch(setLanguages(data))
    }).catch(error => console.log(error));
  })
  React.useEffect(() => {
    setLogged(isLoggedIn)
    getToken()
  },[isLoggedIn])
  
  if(loading){
    return <LoadingScreen />
  }
  return (
    <MainStack.Navigator>
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
        name="CallWaiting"
        component={CallWaiting}
        options={{
          headerShown: false,
          headerTitleAlign: 'center'
        }}
      />
    </MainStack.Navigator>
  );
};
