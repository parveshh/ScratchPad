
import { userReducer } from "./Reducers/UsersReducer";
import { presenceReducer } from "./Reducers/PresenceReducer";
import { NgRedux } from "@angular-redux/store";
import { combineReducers, Reducer } from "redux";
import { Actions } from "./Actions/Actions";


export interface IAppState {
    user: any,
    presence: boolean

}

export const InitialState: IAppState = {
    user:null,
    presence: false
}

export const rootReducer = combineReducers<IAppState>({
    user: userReducer,
    presence: presenceReducer
});