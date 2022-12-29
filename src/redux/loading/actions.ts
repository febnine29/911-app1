import { createAction } from '@reduxjs/toolkit';
import type { Loading } from './types';

export const loadingSet = createAction('LOADING_SET');
export const loadingReset = createAction('LOADING_RESET');
