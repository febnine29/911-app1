import { Button, Flex, Input, Text } from 'native-base';
import React, { FC, useState } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type Props = React.ComponentProps<typeof Input> & {
  name: string;
  control: any;
  placeholder?: string;
  secureTextEntry?: boolean;
  rules?: ControllerProps['rules'];
  showPassword?: boolean;
};

const CustomInput: FC<Props> = ({ name, rules, secureTextEntry, control, placeholder }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <Flex
            direction="row"
            alignItems="center"
            style={[styles.container, { borderColor: error ? 'red' : '#C4C4C4' }]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={[styles.input, { width: secureTextEntry ? '90%' : '100%' }]}
              secureTextEntry={secureTextEntry === !showPassword}
            />
            {secureTextEntry && (
              <Button onPress={handleShowPassword}>
                <Feather size={20} color={'#B1B1B1'} name={showPassword ? 'eye-off' : 'eye'} />
              </Button>
            )}
          </Flex>
          {error && <Text style={styles.error}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  error: {
    color: 'red',
    alignSelf: 'stretch',
    fontSize: 16,
  },
});

export default CustomInput;
