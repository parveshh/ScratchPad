import { Actions, PresenceActions, ScratchPadActions } from "../Actions/Actions";
import { tassign } from "tassign";
import { IAppState, InitialState } from "../../StateStore/Store";
import { ScratchPad } from "../../models/scratchpad";


export function scratchPadReducer(state: ScratchPad = InitialState.scratchpad, action: { type: ScratchPadActions, payload: ScratchPad }): ScratchPad {

    switch (action.type) {
        case ScratchPadActions.SCRATCH_PAD_SELECTED:

            return action.payload;

        default:
            return state;

    }
}

