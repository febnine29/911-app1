import 'react-native-gesture-handler';
import { AirbnbRating, Rating } from "react-native-ratings";
import { 
    View,
    Image,
    Text 
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import * as React from "react"
import { TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import styles from './styles';
const RateScreen = () => {
    const navigation = useNavigation<GenericNavigationProps>()
    return (
        <View style={styles.rateCont}>
            <View style={styles.logoCont}>
                <Image 
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
            </View>
            <View style={styles.textCont}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>HOW DID IT GO?</Text>
                <Text style={{fontSize: 15,marginBottom: 10}}>Please rate your experience:</Text>
                <AirbnbRating
                    count={5}
                    reviews={["Very Poor", "Poor", "Good", "Verygood", "Excellent"]}
                    defaultRating={0}
                    size={40}
                    onFinishRating={(e:any) => console.log(e)}
                    starContainerStyle={{width: '80%',display: 'flex', justifyContent: 'space-between'}}
                    ratingContainerStyle={{paddingLeft: '5%'}}
                />
            </View>
            <View style={styles.botCont}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Main', {screen: 'TabBar'})}
                >
                    <View style={styles.touchBot}> 
                        <Icon name='call' size={30} color="red"/>
                        <Text>Home</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default RateScreen