import AsyncStorage from '@react-native-async-storage/async-storage';
import { usersReducer } from '@redux/reqres/reducers';
import { persistCombineReducers } from 'redux-persist';
import messagesReducer from './messageHandler/reducers';
import testReducer from './testHandler/reducers';
import propsReducer from './propsHandler/reducers';
import loadingReducer from './loading/reducers';
import { UserReducer } from './loginReq/reducers';
const reducers = {
  user: UserReducer,
  users: usersReducer,
  messages: messagesReducer,
  test: testReducer,
  props: propsReducer,
  loading: loadingReducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: undefined,
  whitelist: [''],
};

// Setup Reducers
export const persistedRootReducer = persistCombineReducers(persistConfig, reducers);

export type RootState = ReturnType<typeof persistedRootReducer>;

export default persistedRootReducer;
