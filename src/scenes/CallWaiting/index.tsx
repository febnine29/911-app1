import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles';

 const CallWaiting =()=> {
    return (
        <View style={styles.contentViewContainer}>
            <Text>911</Text>
            <View style={styles.avatar}>
                <Image source={require('../../assets/images/image.png')} />
            </View>
            <View>
                <Text style={styles.connect}>
                    Connecting...
                </Text>
            </View>

        </View>
    )
}
export default CallWaiting;