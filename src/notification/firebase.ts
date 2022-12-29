import { handleCallNotification } from './callKeep';

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNCallKeep from 'react-native-callkeep';


export const requestUserPermission = async () => {
    try {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        console.log('Authorization status:', enabled);
        getToken();

    }
    catch (error) {
            console.log('Authorization error:', error);
        }

    }

const getToken = async () => {
    const devicesToken = await AsyncStorage.getItem('@devicesToken');
    console.log("dd", devicesToken)
    if (!devicesToken)
        try {
            const devicesToken = await messaging().getToken();
            await AsyncStorage.setItem('devicesToken', devicesToken)
            console.log(devicesToken)
        } catch (e) {
            console.log("error:", e)
        }

}

RNCallKeep.setup({
    ios: {
        appName: 'CallKeepDemo',
    },
    android: {
        alertTitle: 'Permissions required',
        alertDescription: 'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok',
        imageName: 'phone_account_icon',
        // additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
        // Required to get audio in background when using Android 11
        //   foregroundService: {
        //     channelId: 'com.company.my',
        //     channelName: 'Foreground service for my app',
        //     notificationTitle: 'My app is running on background',
        //     notificationIcon: 'Path to the resource icon of the notification',
        // },
}
});

// RNCallKeep.setup(options);
    RNCallKeep.setAvailable(true);


export const NotificationListner = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        // navigation.navigate(remoteMessage.data.type);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        // navigation.navigate(remoteMessage.data.type);
    });

    messaging().onMessage(async remoteMessage => {
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // RNCallKeep.displayIncomingCall("67389", "dhuduad");
        handleCallNotification();

    });
    // messaging().onMe
}




