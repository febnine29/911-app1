/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import React from 'react';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { onDisplayNotification } from "./src/notification/notiffe";
import { handleCallNotification, setupCallKeepWithCheck } from "./src/notification/callKeep";
import RNCallKeep from 'react-native-callkeep';
import { useNavigation } from '@react-navigation/native';

messaging().setBackgroundMessageHandler(async (e) => {
  console.log(e)
  handleCallNotification()
});

LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);


