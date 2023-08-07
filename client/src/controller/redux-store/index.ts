import { combineReducers, CombinedState, AnyAction, Reducer } from "redux";
import storage from 'redux-persist/lib/storage';
import authenticationReducer, { IAuthenticationState } from "@redux-reducer/auth.reducer";
import extraReducer, { IExtraState } from "@redux-reducer/extra.reducer";
import { LOGOUT_SUCCESS } from "@redux-action/types.action";

//combined redux App state 
export interface IAppState extends CombinedState<{}> {
    authentication?: IAuthenticationState,
    extras: IExtraState,
}


const appReducers = combineReducers<IAppState>({
    authentication: authenticationReducer,
    extras: extraReducer
})

const rootReducer: MyRootReducer = (state, action) => {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            storage.removeItem('persist:root');
            return appReducers(undefined, action)
        default:
            return appReducers(state, action)
    }
}

export type MyRootReducer = Reducer<IAppState, AnyAction>;

export default rootReducer;