import notifee, { AndroidImportance,  AndroidCategory,
  EventType,AndroidVisibility,AndroidLaunchActivityFlag } from '@notifee/react-native';




export const onDisplayNotification = async() => {

    const channelId = await notifee.createChannel({
      id: 'full-screen',
      name: 'Important Notifica',
      importance: AndroidImportance.HIGH,
      sound: 'hollow',
    });

    


    await notifee.displayNotification({
      // title: 'full-screen',
    body: 'notification',
    android: {
      channelId: 'full-screen',
       // Recommended to set a category
      category: AndroidCategory.CALL,
      // Recommended to set importance to high
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      sound: 'default',
      fullScreenAction: {
        id: 'default',
        // mainComponent: 'full-screen-main-component'
        launchActivity: 'com.example.CustomActivity',
        launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
      },
    },
    ios: {
      sound: 'default',
    },
  
    });

  }