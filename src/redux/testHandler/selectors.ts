import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../reducers';

const testHandlerSelector = (state: RootState) => state.test;

export const testHandlerFullInfo = createSelector(testHandlerSelector, testState => testState);