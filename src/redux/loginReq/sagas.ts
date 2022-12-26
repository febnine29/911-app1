import i18n from '@i18n';
import { loadingSet, loadingReset } from '@redux/loading/actions';
import * as RootNavigation from '../../routes/navigationUtils'
import { messageHandlerSet } from '@redux/messageHandler/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import isEmpty from 'lodash/isEmpty';
import { call, ForkEffect, put, takeLatest } from 'redux-saga/effects';

import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailed,
} from './actions';
import * as UsersAPI from './apiCall';
import {
  UserLoginRequestPayload, UserLoginSuccessPayload,
} from './types';

function* userLoginSaga({ payload }: PayloadAction<UserLoginRequestPayload>) {
  try {
    const response: UserLoginSuccessPayload = yield call(UsersAPI.login, { ...payload });
    if (!isEmpty(response)) {
      yield put(userLoginSuccess(response))
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserLogined'), status: 'success' }));
      RootNavigation.navigate('Main', {screen: 'HomePreCall'})
    } else {
      yield put(messageHandlerSet({ message: i18n.t('Homepage:UserNotLogined'), status: 'error' }));
      yield put(userLoginFailed())
    }
  } catch (err: any) {
    yield put(userLoginFailed())
    yield put(
      messageHandlerSet({ message: err?.message?.message ?? i18n.t('Homepage:UserNotLogined'), status: 'error' }),
    );
    console.log('err: ', err)
  }
}
function* userSaga(): Generator<ForkEffect<never>, void> {
  yield takeLatest(userLoginRequest.type, userLoginSaga);
}

export default userSaga;
