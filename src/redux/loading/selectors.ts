import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../reducers';

const loadingSelector = (state: RootState) => state.loading;

export const loadingGetStatus = createSelector(loadingSelector, loadingState => loadingState);
