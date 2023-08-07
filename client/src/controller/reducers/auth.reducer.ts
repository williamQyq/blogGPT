import redux from 'redux';
import {
    MyAction,   //my redux action ts 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from "@redux-action/types.action";

interface IUser {

}

export interface IAuthenticationState {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: IUser | null
}

const initialState: IAuthenticationState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
};




export type AuthenticationReducer = redux.Reducer<IAuthenticationState, redux.AnyAction>


export default function Reducer(state = initialState, action: MyAction<any>) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}