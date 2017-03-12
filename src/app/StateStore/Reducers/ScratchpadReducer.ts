import { Actions, PresenceActions, ScratchPadActions } from "../Actions/Actions";
import { tassign } from "tassign";
import { IAppState, InitialState } from "../../StateStore/Store";
import { ScratchPad } from "../../models/scratchpad";

//Ngreduc to pass selected scratchpad to content component
export function scratchPadReducer(state: ScratchPad = InitialState.scratchpad, action: { type: ScratchPadActions, payload: ScratchPad }): ScratchPad {

    switch (action.type) {
        case ScratchPadActions.SCRATCH_PAD_SELECTED:

            return action.payload;

        default:
            return state;

    }
}

