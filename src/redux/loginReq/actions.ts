import { createAction } from '@reduxjs/toolkit';
import type {
    UserLoginRequestPayload,
    UserLoginSuccessPayload
} from './types'

export const userLoginRequest = createAction<UserLoginRequestPayload>('ACTION/LOGIN_USER_REQUEST');
export const userLoginSuccess = createAction<UserLoginSuccessPayload>('ACTION/LOGIN_USER_SUCCESS');
export const userLoginFailed = createAction('ACTION/LOGIN_USER_FAILED');
export const removeAccessToken = createAction('ACTION/REMOVE_ACCESS_TOKEN');