import { createReducer } from '@reduxjs/toolkit';
import { loadingSet, loadingReset } from './actions';
export interface ILoading{
    loadingStatus: boolean 
}
const initialState: ILoading= {
    loadingStatus: false
}
const loadingReducer = createReducer(initialState, {
    [loadingSet.type]:(state) => {
        state.loadingStatus = true;
        // console.log(state.loadingStatus);
    },
    [loadingReset.type]:(state) => {
        state.loadingStatus = false
    }
})
export default loadingReducer