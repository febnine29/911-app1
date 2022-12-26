import i18n from '@i18n';
import { loadingSet, loadingReset } from '@redux/loading/actions';
import * as RootNavigation from '../../routes/navigationUtils'
import { messageHandlerSet } from '@redux/messageHandler/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import isEmpty from 'lodash/isEmpty';
import { call, ForkEffect, put, takeLatest } from 'redux-saga/effects';

import {
  createUserFailed,
  createUserRequest,
  createUserSuccess,
  deleteUserRequest,
  getUserDetailsFailed,
  getUserDetailsRequest,
  getUserDetailsSuccess,
  getUsersListFailed,
  getUsersListRequest,
  getUsersListSuccess,
  modifyUserRequest,
  userLoginRequestt,
  userLoginSuccesss,
  userLoginFailedd,
} from './actions';
import * as UsersAPI from './apiCall';
import {
  UsersSuccessPayload,
  UsersRequestPayload,
  UserDetailsRequestPayload,
  UserDetailsSuccessPayload,
  CreateUserRequestPayload,
  CreateUserSuccessPayload,
  ModifyUserRequestPayload,
  ModifyUserSuccessPayload,
  DeleteUserRequestPayload,
  UserLogin
} from './types';
function* getUsersListSaga({ payload }: PayloadAction<UsersRequestPayload>) {
  try {
    const response: UsersSuccessPayload = yield call(UsersAPI.getUsers, { ...payload });

    if (!isEmpty(response)) {
      yield put(getUsersListSuccess(response));
    } else {
      yield put(getUsersListFailed());
    }
  } catch (err) {
    yield put(getUsersListFailed());
  }
}

function* getUserDetailsSaga({ payload }: PayloadAction<UserDetailsRequestPayload>) {
  try {
    const response: UserDetailsSuccessPayload = yield call(UsersAPI.getUserDetails, { ...payload });

    if (!isEmpty(response)) {
      yield put(getUserDetailsSuccess(response));
    } else {
      yield put(getUserDetailsFailed());
    }
  } catch (err) {
    yield put(getUserDetailsFailed());
  }
}

function* createUserSaga({ payload }: PayloadAction<CreateUserRequestPayload>) {
  try {
    const response: CreateUserSuccessPayload = yield call(UsersAPI.createUser, { ...payload });

    if (!isEmpty(response)) {
      yield put(createUserSuccess(response));
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserCreated'), status: 'success' }));
    } else {
      yield put(createUserFailed());
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserNotCreated'), status: 'error' }));
    }
  } catch (err: any) {
    yield put(createUserFailed());
    yield put(
      messageHandlerSet({ message: err?.message?.message ?? i18n.t('Homepage:UserNotCreated'), status: 'error' }),
    );
  }
}

function* modifyUserSaga({ payload }: PayloadAction<ModifyUserRequestPayload>) {
  try {
    const response: ModifyUserSuccessPayload = yield call(UsersAPI.modifyUser, { ...payload });

    if (!isEmpty(response)) {
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserModified'), status: 'success' }));
    } else {
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserNotModified'), status: 'error' }));
    }
  } catch (err: any) {
    yield put(
      messageHandlerSet({ message: err?.message?.message ?? i18n.t('Homepage:UserNotModified'), status: 'error' }),
    );
  }
}

function* deleteUserSaga({ payload }: PayloadAction<DeleteUserRequestPayload>) {
  try {
    const response: { status: number } = yield call(UsersAPI.deleteUser, { ...payload });

    if (response.status === 204) {
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserDeleted'), status: 'success' }));
    } else {
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserNotDeleted'), status: 'error' }));
    }
  } catch (err: any) {
    yield put(
      messageHandlerSet({ message: err?.message?.message ?? i18n.t('Homepage:UserNotDeleted'), status: 'error' }),
    );
  }
}
function* userLoginSaga({ payload }: PayloadAction<UserLogin>) {
  try {
    const response: { status: number } = yield call(UsersAPI.login, { ...payload });
    if (response.status === 200) {
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserLogined'), status: 'success' }));
      RootNavigation.navigate('Main', {screen: 'HomePreCall'})
    } else {
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserNotLogined'), status: 'error' }));
      
    }
  } catch (err: any) {
    yield put(
      messageHandlerSet({ message: err?.message?.message ?? i18n.t('Homepage:UserNotLogined'), status: 'error' }),
    );
    // yield put(loadingSet({loadingStatus: false}))
    console.log('err: ', err)
  }
}
function* usersSaga(): Generator<ForkEffect<never>, void> {
  yield takeLatest(getUsersListRequest.type, getUsersListSaga);
  yield takeLatest(getUserDetailsRequest.type, getUserDetailsSaga);
  yield takeLatest(createUserRequest.type, createUserSaga);
  yield takeLatest(modifyUserRequest.type, modifyUserSaga);
  yield takeLatest(deleteUserRequest.type, deleteUserSaga);
  yield takeLatest(userLoginRequestt.type, userLoginSaga);
}

export default usersSaga;
