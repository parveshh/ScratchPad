import { Actions } from "../Actions/Actions";
import { tassign } from "tassign";
import { IAppState, InitialState } from "../../StateStore/Store";



export function userReducer(state: any = InitialState.user, action: { type: Actions, payload: any }): any {

    switch (action.type) {
        case Actions.USER_AUTHENTICATED:

            return action.payload;
        default:
            return state;

    }
}

