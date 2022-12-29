import * as React from 'react';
import 'react-native-gesture-handler';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
  Platform,
} from 'react-native';
import {
    checkMultiple,
    request,
    requestMultiple,
    PERMISSIONS,
    RESULTS,
  } from 'react-native-permissions';
import { 
    useSelector, 
    useDispatch 
} from 'react-redux';
import { 
    propsSetToken
} from '@redux/propsHandler/actions';
import { 
    useNavigation, 
} from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { getLanguagesStore } from '@redux/languages/selectors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '@scenes/LanguagePage/styles';

interface ILanguage{
    id: number;
    name: string;
    type: string
}
const LanguagePage = () => {
    const API_URL = 'https://5153-113-160-172-8.ap.ngrok.io'
    const navigation = useNavigation<GenericNavigationProps>()
    const dispatch = useDispatch()
    const allLanguages = useSelector(getLanguagesStore)
    
    console.log('all languages: ', allLanguages)
    // const delToken = async () => {
    //     try {
    //         await AsyncStorage.clear();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const [propsPayload, setPropsPayload] = React.useState({
    //     isAudioEnabled: true,
    //     isVideoEnabled: true,
    //     status: 'disconnected',
    //     participants: new Map(),
    //     videoTracks: new Map(),
    //     userName: '',
    //     roomName: '',
    //     token: '',
    
    // })
    console.log('url:', API_URL)
    const _checkPermissions = (callback?: any) => {
        const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
        const androidPermissions = [
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        ];
        checkMultiple(
        Platform.OS === 'ios' ? iosPermissions : androidPermissions,
        ).then((statuses) => {
        const [CAMERA, AUDIO] =
            Platform.OS === 'ios' ? iosPermissions : androidPermissions;
        if (
            statuses[CAMERA] === RESULTS.UNAVAILABLE ||
            statuses[AUDIO] === RESULTS.UNAVAILABLE
        ) {
            Alert.alert(
            'Error',
            'Hardware to support video calls is not available',
            );
        } else if (
            statuses[CAMERA] === RESULTS.BLOCKED ||
            statuses[AUDIO] === RESULTS.BLOCKED
        ) {
            Alert.alert(
            'Error',
            'Permission to access hardware was blocked, please grant manually',
            );
        } else {
            if (
            statuses[CAMERA] === RESULTS.DENIED &&
            statuses[AUDIO] === RESULTS.DENIED
            ) {
            requestMultiple(
                Platform.OS === 'ios' ? iosPermissions : androidPermissions,
            ).then((newStatuses) => {
                if (
                newStatuses[CAMERA] === RESULTS.GRANTED &&
                newStatuses[AUDIO] === RESULTS.GRANTED
                ) {
                callback && callback();
                } else {
                Alert.alert('Error', 'One of the permissions was not granted');
                }
            });
            } else if (
            statuses[CAMERA] === RESULTS.DENIED ||
            statuses[AUDIO] === RESULTS.DENIED
            ) {
            request(statuses[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO).then(
                (result) => {
                if (result === RESULTS.GRANTED) {
                    callback && callback();
                } else {
                    Alert.alert('Error', 'Permission not granted');
                }
                },
            );
            } else if (
            statuses[CAMERA] === RESULTS.GRANTED ||
            statuses[AUDIO] === RESULTS.GRANTED
            ) {
            callback && callback();
            }
        }
        });
    };

    React.useEffect(() => {
        _checkPermissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return(
        <View style={styles.languageCont}>
            <View style={styles.containerTitle}>
                <Text style={styles.screenTitle}>Choose a language to call!</Text>
            </View>
            {allLanguages.language?.map((item: ILanguage) => (
                <View key={item.id} style={styles.liItem}>
                    {/* <View> */}
                        <Text>{item.name}</Text>
                    {/* </View> */}
                    <View style={styles.callIcon}>
                        <TouchableOpacity >
                            <Ionicons name='call-sharp' size={22}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.spaceIcon}
                            onPress={() => {
                                // dispatch(propsSetUsername(propsPayload.userName))
                                // dispatch(propsSetRoomname(propsPayload.roomName))
                                _checkPermissions(() => {
                                fetch(`${API_URL}/getToken?userName=mnazz`)
                                    .then((response) => {
                                    if (response.ok) {
                                        // console.log(response.text().then())
                                        response.text().then((jwt) => {
                                        dispatch(propsSetToken(jwt))
                                        // navigation.navigate('Main', {screen: 'VideoCallScreen'});
                                        navigation.navigate('VideoCallScreen');
                                        return true;
                                        });
                                    } else {
                                        response.text().then((error) => {
                                        Alert.alert(error);
                                        });
                                    }
                                    })
                                    .catch((error) => {
                                    console.log('error', error);
                                    Alert.alert('API not available');
                                    });
                                });
                            }}
                        >
                            <Ionicons name='videocam' size={23}/>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    )
}
export default LanguagePage