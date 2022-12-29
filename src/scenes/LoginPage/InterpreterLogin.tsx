import CustomInput from '@components/Input/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Box, Button, Flex, HStack, Spinner, Stack } from 'native-base';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text } from 'react-native';
import styles from './styles';

const InterpreterLogin = () => {
  const { control} = useForm();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <Flex style={styles.container}>
      <Stack style={styles.headerInner} space={2}>
        <Image style={styles.imgLogo} source={require('../../../assets/logo-resize.png')} />
        <Text style={styles.title}>Interpreter Login</Text>
      </Stack>
      <Stack space={4} style={styles.centerInner}>
        <Stack space={2} style={styles.formView}>
          <CustomInput
            name="username"
            placeholder="Username or email"
            control={control}
            // onChangeText={value => setPayloadLogin({ ...payloadLogin, email: value })}
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
          />
          <Button style={styles.centerLink}>
            <Text style={styles.textBold}>Forgot password?</Text>
          </Button>
        </Stack>
        <Box style={styles.loginButtonSection}>
          <Button
            backgroundColor={`${loading ? 'red.400' : 'red.500'}`}
            rounded="md"
            h={55}
            // onPress={handleSubmit()}
            >
            <HStack space={3} justifyContent="center">
              {loading && <Spinner color="white" />}
              <Text style={styles.textSignIn}>Sign In</Text>
            </HStack>
          </Button>
        </Box>
      </Stack>
      <Flex direction="column" justifyContent="flex-end" style={styles.footerInner}>
        <Flex direction="row" align="center">
          <Text style={styles.createLabel}>You are a Customer?</Text>
          <Button onPress={() => navigation.navigate('Main', { screen: 'Login' })}>
            <Text style={styles.textBold}>Sign In Now</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InterpreterLogin;
