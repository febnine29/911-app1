import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../reducers';

const languagesSelector = (state: RootState) => state.languages;

export const getLanguagesStore = createSelector(languagesSelector, languagesState => languagesState);
