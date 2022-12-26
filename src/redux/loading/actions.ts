import { createAction } from '@reduxjs/toolkit';
import type { Loading } from './types';

export const loadingSet = createAction<Loading>('LOADING_SET');
export const loadingReset = createAction<Loading>('LOADING_RESET');
