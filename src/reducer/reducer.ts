import { createReducer } from "@reduxjs/toolkit";
import * as ac from "./action.creator";
import { ProtoRobotsObject } from "../models/protorobots";

const initialState: ProtoRobotsObject = {
    robots: [],
};

export const characterReducer = createReducer(
    initialState.robots,
    (builder) => {
        builder.addCase(
            ac.loadActionCreator,
            (_state, action) => action.payload
        );
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
    }
);
