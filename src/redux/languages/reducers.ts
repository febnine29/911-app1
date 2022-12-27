import { createReducer } from '@reduxjs/toolkit';
import { setLanguages } from './actions';
export interface ILanguage{
    language:[{
        id: number;
        name: string;
        type: string
    }]
}
const initialState: ILanguage= {
    language:[{
        id: 0,
        name: '',
        type: '',
    }]
}
const languagesReducer = createReducer(initialState, {
    [setLanguages.type]:(state, {payload}) => {
        state.language = payload
    },
    // [resetLa.type]:(state, {payload}) => {
    //     state.loadingStatus = payload
    // }
})
export default languagesReducer