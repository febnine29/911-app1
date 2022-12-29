import CustomInput from '@components/Input/CustomInput';
import i18n from '@i18n';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { userLoginSuccess } from '@redux/loginReq/actions';
import { messageHandlerSet } from '@redux/messageHandler/actions';
import type { UserLogin } from '@redux/reqres/types';
import { GenericNavigationProps } from '@routes/types';
import styles from '@scenes/LoginPage/styles';
import { Button, Box, Stack, Spinner, HStack, Flex } from 'native-base';
import React, { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View,Text, Image, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadingSet, loadingReset } from '@redux/loading/actions';
import Ion from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<GenericNavigationProps>();
  const [payloadLogin, setPayloadLogin] = React.useState<UserLogin>({
      email: '',
      password: '',
  });
  const { control } = useForm();
  const [showPass, setShowPass] = React.useState(false)
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>('');
  const saveToken = async () => {
    // set Data to Storage
      try {
          await AsyncStorage.setItem('@access-token', token);
      } catch (error) {
          console.log(error);
      } 
  };
  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.10.21.18:3001/api/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: payloadLogin.email,
          password: payloadLogin.password,
        }),
      });
      const json = await response.json();
      if (response.status === 201) {
        dispatch(messageHandlerSet({ message: i18n.t('Login Successful'), status: 'success' }));
        dispatch(userLoginSuccess(json));
        setToken(json.accessToken);
      } else {
        dispatch(messageHandlerSet({ message: i18n.t('Wrong email or password'), status: 'error' }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      dispatch(loadingSet())
      saveToken()
      dispatch(loadingReset())
    }
  };

  const onLogin = async () => {
    console.log(payloadLogin);
    setLoading(true);
    await handleLogin();
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  useEffect(() => {
    console.log('loading: ', loading);
    // getToken()
  }, [loading]);
  return (
    <Flex style={styles.container}>
      <Box style={styles.headerInner}>
        <Image style={styles.imgLogo} source={require('../../../assets/logo-resize.png')} />
        <Text style={styles.title}>Customer Login</Text>
      </Box>
      <Stack space={4} style={styles.centerInner}>
        <Stack space={2} style={styles.formView}>
          {/* <CustomInput
            name="username"
            placeholder="Username or email"
            control={control}
            onChangeText={value => setPayloadLogin({ ...payloadLogin, email: value })}
            rules={{ required: 'Username or email is required' }}
          />
          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            control={control}
            rules={{
              required: 'Password is required',
              minLength: { value: 3, message: 'Password should be minimum 3 characters long' },
            }}
            onChangeText={value => setPayloadLogin({ ...payloadLogin, password: value })}
          /> */}
          <View style={styles.InputCont}>
                    <TextInput style={styles.InputPass} 
                        placeholder='Username or Email'
                        onChangeText={value => setPayloadLogin({...payloadLogin, email: value})}
                    /> 
                </View>
                <View style={styles.InputCont}>
                    <TextInput style={styles.InputPass} 
                        placeholder='Enter Password'
                        secureTextEntry={showPass}
                        onChangeText={value => setPayloadLogin({...payloadLogin, password: value})}
                    /> 
                    <View style={styles.ShowIcon}>
                        <TouchableOpacity
                            onPress={() => setShowPass(!showPass)}
                        >
                        <Ion name={showPass ? 'eye': 'eye-off'} size={20}/>
                        </TouchableOpacity>
                    </View>
                </View>
          <Button style={styles.centerLink}>
            <Text style={styles.textBold}>Forgot password?</Text>
          </Button>
        </Stack>
        <Box style={styles.loginButtonSection}>
          <Button backgroundColor={`${loading ? 'red.400' : 'red.500'}`} rounded="md" h={55} onPress={onLogin}>
            <HStack space={3} justifyContent="center">
              {loading && <Spinner color="white" />}
              <Text style={styles.textSignIn}>Sign In</Text>
            </HStack>
          </Button>
        </Box>
      </Stack>
      <Flex direction='column' justifyContent='flex-end' style={styles.footerInner}>
        <Flex direction='row' align='center' >
          <Text style={styles.createLabel}>You are an Interpreter?</Text>
          {/* <Button onPress={() => 
            // navigation.navigate('Main', { screen: 'InterpreterLogin' })
            // navigation.navigate('Main', { screen: 'InterpreterLogin' })
          }
          > */}
            <Text style={styles.textBold}>Sign In Now</Text>
          {/* </Button> */}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default LoginPage;
