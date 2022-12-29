import 'react-native-gesture-handler';
import React, {
    useRef,
    useEffect,
} from 'react';
import {
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { propsHandlerFullInfo } from '@redux/propsHandler/selectors';
import { useSelector, useDispatch } from 'react-redux';
import {
    propsHandlerReset,
    propsSetStatus,
    propsEnableAudio,
    propsEnableVideo,
    propsSetTrack,
} from '@redux/propsHandler/actions';
import styles from './styles'

import MateriaLicons from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'native-base';
import CallWaiting from '@scenes/CallWaiting';

const VideoCallScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<GenericNavigationProps>()
    const twilioVideo = useRef<any>(null);
    const { props} = useSelector(propsHandlerFullInfo)
    console.log("porp", props.videoTracks)
    console.log("porp2", props.status)

    useEffect(() => {
        //Kết nối vào phòng
        twilioVideo.current.connect({
            roomName: props.roomName,
            accessToken: props.token,
            // enableVideo:videoLocal

        });

        dispatch(propsSetStatus('connecting'))
        return () => {
            _onEndButtonPress();
        };

    }, []);

    //Tắt cuộc gọi
    const _onEndButtonPress = () => {
        twilioVideo.current.disconnect();
        dispatch(propsHandlerReset)
    };


    // Tắt tiếng
    const _onMuteButtonPress = () => {
        twilioVideo.current
            .setLocalAudioEnabled(!props.isAudioEnabled)
            .then((isEnabled: any) =>
                dispatch(propsEnableAudio(isEnabled))
            );
    };

    //ĐỔi camera
    const _onFlipButtonPress = () => {
        twilioVideo.current.flipCamera();
    };

    //Tắt camera ng dunng
    const _onDisableVideoButtonPress = async () => {
        twilioVideo.current
            .setLocalVideoEnabled(!props.isVideoEnabled)
            .then((isEnabled: any) => {
                // setProps({ ...props, isVideoEnabled: isEnabled })
                dispatch(propsEnableVideo(isEnabled))
                console.log('props', isEnabled)
            })
    }

    return (
        <View style={styles.callContainer}>

            {props.status === "connected" ?
                <View style={{ flex: 1, marginBottom: '10%' }}>
                    {(
                        <View style={styles.callWrapper}>
                            {(
                                <View style={styles.remoteGrid}>
                                    {Array.from(props.videoTracks, ([trackSid, trackIdentifier]) => (
                                        <TwilioVideoParticipantView
                                            style={styles.remoteVideo}
                                            key={trackSid}
                                            trackIdentifier={trackIdentifier}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
                    )}
                    {
                        props.isVideoEnabled ? <TwilioVideoLocalView
                            enabled={props.status === 'connected'}
                            applyZOrder={true}
                            style={styles.localVideo}
                        /> :
                            <View style={styles.disableLocalVideo}>
                                <Image style={styles.imageLocalVideo} source={require('../../assets/images/user.png')} />

                            </View>
                    }
                </View>
                : <CallWaiting />
            }

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ed3b2d', marginLeft: 10 }]} onPress={_onEndButtonPress}>
                    <MateriaLicons name="call-end" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={_onMuteButtonPress}>
                    <MateriaLicons name={props.isAudioEnabled ? 'mic' : 'mic-off'} size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={_onDisableVideoButtonPress}>
                    <MateriaLicons name={props.isVideoEnabled ? 'videocam' : 'videocam-off'} size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { marginRight: 10 }]} onPress={_onFlipButtonPress}>
                    <MateriaLicons name="flip-camera-ios" size={30} color="white" />
                </TouchableOpacity>
            </View>

            <TwilioVideo
                ref={twilioVideo}
                onRoomDidConnect={() => {

                }}
                onRoomDidDisconnect={() => {
                    dispatch(propsSetStatus('disconnected'))
                    navigation.goBack();
                }}
                onRoomDidFailToConnect={(error) => {
                    Alert.alert('Error', error.error);
                    dispatch(propsSetStatus('disconnected'))
                    navigation.goBack();
                }}
                onParticipantAddedVideoTrack={({ participant, track }) => {
                    if (track.enabled) {
                        dispatch(propsSetTrack(new Map([
                            ...props.videoTracks,
                            [
                                track.trackSid,
                                {
                                    participantSid: participant.sid,
                                    videoTrackSid: track.trackSid,
                                },
                            ],
                        ])))
                    }
                }}

                onRoomParticipantDidConnect={(
                    // e
                    ) => {
                    dispatch(propsSetStatus("connected"))
                }}
                onParticipantRemovedVideoTrack={(
                    // { track }
                    ) => {
                    const videoTracks = props.videoTracks;
                    // videoTracks.delete(track.trackSid);
                    dispatch(propsSetTrack(videoTracks))
                }}
            />
        </View>
    );
};
export default VideoCallScreen