
import { userReducer } from "./Reducers/UsersReducer";
import { presenceReducer } from "./Reducers/PresenceReducer";
import { NgRedux } from "@angular-redux/store";
import { combineReducers, Reducer } from "redux";
import { Actions } from "./Actions/Actions";
import { ScratchPad } from "../models/scratchpad";


export interface IAppState {
    user: any,
    presence: boolean,
    scratchpad:ScratchPad

}

export const InitialState: IAppState = {
    user:null,
    presence: false,
    scratchpad:null
}

export const rootReducer = combineReducers<IAppState>({
    user: userReducer,
    presence: presenceReducer
});