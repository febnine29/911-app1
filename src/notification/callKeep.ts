import RNCallKeep from 'react-native-callkeep';
import { Platform } from 'react-native'
// import { isAccept } from '@redux/testHandler/types';
import { 
    isAccept,
    isReject
} from '../commons/exportFunction';
export const handleCallNotification = async () => {
    console.log("Trting to call");
    if (Platform.OS === "android") await RegisterCallKeep();
    // notificationContent = data;
    const uid = "ddd"
    // currentUid = uid;
    RNCallKeep.displayIncomingCall(
        uid,
        "kdkkd",
        "kdkdk",
        "generic",
        true
    );

}

const callKeepConfig = {
    ios: {
        appName: "appname",
    },

    android: {
        alertTitle: "Permissions required",
        additionalPermissions: [],
        alertDescription: "This application needs to access your phone accounts",
        cancelButton: "Cancel",
        //   additionalPermissions: [],
        okButton: "ok",
    },
};
const answerCall = async () => {
    RNCallKeep.endAllCalls()
    RNCallKeep.backToForeground();
    await isAccept().then((json) => {
        console.log(json);
    }).catch((err) => {
        console.log(err);
    })
}
const endCall = () => {
    RNCallKeep.endAllCalls();
    isReject()
}

const RegisterCallKeep = async () => {
    // RNCallKeep.removeEventListener("answerCall", answerCall);
    // RNCallKeep.removeEventListener("endCall", endCall);
    // await RNCallKeep.registerPhoneAccount(configSetup);
    await RNCallKeep.registerAndroidEvents();
    await RNCallKeep.setAvailable(true);
    RNCallKeep.addEventListener("answerCall", answerCall);
    RNCallKeep.addEventListener("endCall", endCall);
};