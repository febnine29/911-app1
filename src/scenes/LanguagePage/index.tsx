import * as React from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { 
    useSelector, 
    useDispatch 
} from 'react-redux'
import { getLanguagesStore } from '@redux/languages/selectors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '@scenes/LanguagePage/styles';

interface ILanguage{
    id: number;
    name: string;
    type: string
}
const LanguagePage = () => {
    const dispatch = useDispatch()
    const allLanguages = useSelector(getLanguagesStore)
    // const [languages, setLanguages] = React.useState<ILanguage[] | null>(null) 
    console.log('all languages: ', allLanguages)
    const delToken = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log(error);
        }
    }
    const handleLogout = () => {
        delToken();
    }
    // React.useEffect(() => {
    //     // setLanguages(allLanguages)
    // }, [languages])

    return(
        <View style={styles.languageCont}>
            {allLanguages.language?.map((item: ILanguage) => (
                <View key={item.id} style={styles.liItem}>
                    {/* <View> */}
                        <Text>{item.name}</Text>
                    {/* </View> */}
                    <View style={styles.callIcon}>
                        <TouchableOpacity>
                            <Ionicons name='call-sharp' size={22}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name='videocam' size={22}/>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    )
}
export default LanguagePage