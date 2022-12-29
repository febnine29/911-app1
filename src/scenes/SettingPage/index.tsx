import * as React from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadingReset } from "@redux/loading/actions";
import { useSelector } from "react-redux";
import { userLoginPayload } from "@redux/loginReq/selectors";

export default function SettingPage(){
    const userInfor =  useSelector(userLoginPayload)
    console.log(userInfor)
    const removeToken = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log(error);
        } 
    }
    const handleLogout = () => {
        removeToken();
        loadingReset();
    }
    return (
        <View>
            <Text>Setting Page</Text>
            <TouchableOpacity
                onPress={handleLogout}
            >
                <Text>log out</Text>
            </TouchableOpacity>
        </View>
    )
}