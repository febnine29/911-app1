import { 
    View,
    Button,
    Link,
    Box,
    Stack, 
    // useToast,
    Spinner, HStack, Heading
} from 'native-base';
import React, { 
    FC, useState, 
    // useCallback, 
    useEffect 
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    Text, 
    TextInput, 
    TouchableOpacity, Image,
    BackHandler
} from 'react-native';
import i18n from '@i18n';
import type { UserLogin } from '@redux/reqres/types';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
import styles from '@scenes/LoginPage/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { messageHandlerSet } from '@redux/messageHandler/actions';
import { userLoginSuccess } from '@redux/loginReq/actions';
import { getAcceptStatus } from '../../commons/exportFunction';
import { userLoginPayload} from '@redux/loginReq/selectors'
const LoginPage: FC = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<GenericNavigationProps>();
    const [showPass, setShowPass] = React.useState(true);
    const [payloadLogin, setPayloadLogin] = React.useState<UserLogin>({
        // dataLogin: {
            email: '',
            password: ''
        // }
    })
    const [token, setToken] = React.useState('')
    const storeToken = async() => {
        try{
            await AsyncStorage.setItem('@access-token', token)
        } catch(err){
            console.log('err storage token')
        }
    }
    const [loading, setLoading] = useState(false)
    const handleLogin = async () => {
        try {
            const response = await fetch('http://10.10.20.13:3001/api/auth/login',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: payloadLogin.email,
                    password: payloadLogin.password
                })
            });
            const json = await response.json();
            console.log('responsedata:', json.accessToken)
            if(response.status === 201){
                dispatch(messageHandlerSet({ message: i18n.t('Login Successful'), status: 'success' }))
                dispatch(userLoginSuccess(json))
                setToken(json.accessToken)
            } else{
                dispatch(messageHandlerSet({ message: i18n.t('Wrong email or password'), status: 'error' }))
                
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const onLogin = async () => {
        console.log(payloadLogin);
        console.log('test');
        setLoading(true)
        await handleLogin()
        storeToken()
    }
    
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return true;
            };
        
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
    );
    useEffect(() =>{
        getAcceptStatus().then(json => {
            console.log('isAccepted: ', json.isAccepted)
            if(json.isAccepted === "accepted"){
                navigation.navigate('Main', {screen: 'HomePreCall'})
            }
        })
        .catch(error => console.log(error))
    },[])
    // const user = useSelector(userLoginPayload)
    // const storeToken = async() => {
    //     try{
    //         await AsyncStorage.setItem('@access-token', user.accessToken)
    //     } catch(err){
    //         console.log('err storage token')
    //     }
    // }
    // React.useEffect(() => {
    //     storeToken()
    // })
    return (
    <Box style={styles.container}>
        <Box style={styles.headerInner}>
            <Image style={styles.imgLogo} source={require('../../../assets/logo-resize.png')}/>
        </Box>
        <Box style={styles.centerInner}>
            <Box style={styles.formView} mb={1}>
            <Stack space={4} w="100%" mx="auto">
                <View style={styles.InputCont}>
                    <TextInput style={styles.InputPass} 
                        placeholder='Username or Email'
                        placeholderTextColor='grey'
                        onChangeText={value => setPayloadLogin({...payloadLogin, email: value})}
                    /> 
                </View>
                <View style={styles.InputCont}>
                    <TextInput style={styles.InputPass} 
                        placeholder='Password'
                        secureTextEntry={showPass}
                        placeholderTextColor='grey'
                        onChangeText={value => setPayloadLogin({...payloadLogin, password: value})}
                    /> 
                    <View style={styles.ShowIcon}>
                        <TouchableOpacity
                            onPress={() => setShowPass(!showPass)}
                        >
                        <Icon name={showPass ? "eye" : "eye-off"} size={25} color="#5b5b5b" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Stack>
            </Box>
            <Box
                mt={8}
                style={styles.loginButtonSection}
            >
                <Button 
                    backgroundColor='red.500'
                    rounded='md'
                    h='60px'
                    onPress={onLogin}
                    _text={{color: 'white', fontWeight: 'bold', fontSize: '22', letterSpacing: '2'}}
                >
                    {loading ? 
                        <HStack space={2} justifyContent="center">
                            <Spinner color="white"/>
                            <Heading color="white" fontSize="md">
                                Signing In
                            </Heading>
                        </HStack>
                        : 
                        'Sign In'
                    }
                </Button>
                <Box mt={5} style={styles.centerLink} >
                    <Link href="" _text={{fontSize: '15', textDecoration: 'none', color: 'blue.500'}}>
                        Forgot password?
                    </Link>
                </Box>
            </Box>
        </Box>  
        <Box style={styles.footerInner}>
            <Text style={styles.createLabel}>You are an Interpreter?</Text>
            <Box style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Main', {screen: 'Register'})}
                >
                    <Box style={styles.createButton}>
                        <Text style={styles.buttonLabel}>Signin Now</Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    </Box>
  );
};
export default LoginPage;
