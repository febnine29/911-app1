import { createReducer } from '@reduxjs/toolkit';

import {
    userLoginRequest,
    userLoginSuccess,
    userLoginFailed,
    removeAccessToken
} from './actions'

import {UserLoginSuccessPayload} from './types'
export interface UserState{
    user: UserLoginSuccessPayload
}
const initialState: UserState = {
    user: {
        id: "",
        createdAt: "",
        updatedAt: null,
        deletedAt: null,
        fullName: {
            firstName: "",
            lastName: ""
        },
        phone: 0,
        email: "",
        gender: null,
        avatarPath: null,
        avatarThumbnailPath: null,
        isActive: true,
        status: null,
        accessToken: "",
        loading: false
    }
}
export const UserReducer = createReducer(initialState,{
    // [userLoginRequest.type]: state => {
        
    // },
    [userLoginSuccess.type]:(state, {payload}) => {
        state.user = payload;
        // state.user.loading = false;
        console.log('success-request')
    },
    // [userLoginFailed.type]:state => {
    //     // state.user.loading = false
    //     console.log('error-request')
    // },
    [removeAccessToken.type]: state => {
        state.user.accessToken = ""
    }
})