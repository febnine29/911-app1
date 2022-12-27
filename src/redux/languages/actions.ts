import { createAction } from '@reduxjs/toolkit';
import type { ILanguage } from './reducers';

export const setLanguages = createAction<ILanguage>('LOADING_SET');
