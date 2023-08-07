import redux from 'redux';
import { MyAction, EXTRA_LOADING, EXTRA_LOADED } from "@redux-action/types.action";

export interface IExtraState {
    loading: boolean
}

const initialState: IExtraState = {
    loading: false
}
//Reducer type...
export type ExtraReducer = redux.Reducer<IExtraState, redux.AnyAction>

export default function Reducer(state = initialState, action: MyAction<any>) {
    switch (action.type) {
        case EXTRA_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case EXTRA_LOADED:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}