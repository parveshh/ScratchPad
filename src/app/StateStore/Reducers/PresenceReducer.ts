import { Actions, PresenceActions } from "../Actions/Actions";
import { tassign } from "tassign";
import { IAppState, InitialState } from "../../StateStore/Store";


export function presenceReducer(state: boolean = InitialState.presence, action: { type: PresenceActions, payload: boolean }): boolean {

    switch (action.type) {
        case PresenceActions.USER_ONLINE:
            
            return action.payload;
        case PresenceActions.USER_OFFLINE:
            
            return action.payload;
        default:
            return state;

    }
}

