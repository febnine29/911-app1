import ApiClient from '@api';
import env from '@env';
import { UserLoginRequestPayload } from './types';
import { userLoginFailed } from './actions';
import { useDispatch } from 'react-redux';
const dispatch = useDispatch()
export async function login({ email, password }: UserLoginRequestPayload) {
    try {
        const response = await ApiClient.post(`http://10.0.2.2:3001/auth/login`, {email, password});
        console.log('res:', response);
        return response;
    } catch (error) {
        // console.error('Login Error: ', error);
        // dispatch(userLoginFailed())
        throw error;
    }
}