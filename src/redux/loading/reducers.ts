import { createReducer } from '@reduxjs/toolkit';
import { loadingSet, loadingReset } from './actions';
export interface ILoading{
    loadingStatus: boolean 
}
const initialState: ILoading= {
    loadingStatus: false
}
const loadingReducer = createReducer(initialState, {
    [loadingSet.type]:(state, {payload}) => {
        state.loadingStatus = payload
    },
    [loadingReset.type]:(state, {payload}) => {
        state.loadingStatus = payload
    }
})
export default loadingReducer