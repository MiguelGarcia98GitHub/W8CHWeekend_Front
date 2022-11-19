import { createReducer } from "@reduxjs/toolkit";
import * as ac from "./action.creator";
import { ProtoRobot } from "../models/robot";

// const initialState: ProtoRobotsObject = {
//     robots: [],
// };
const initialState: Array<ProtoRobot> = [];

export const robotReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.loadActionCreator, (_state, action) => action.payload);
    builder.addCase(ac.addActionCreator, (state, action) => [
        ...state,
        action.payload,
    ]);

    builder.addCase(ac.updateActionCreator, (state, action) =>
        state.map((item) =>
            item.id === action.payload.id ? action.payload : item
        )
    );

    builder.addCase(ac.deleteActionCreator, (state, action) =>
        state.filter((item) => item.id !== action.payload.id)
    );
    builder.addDefaultCase((state) => state);
});
