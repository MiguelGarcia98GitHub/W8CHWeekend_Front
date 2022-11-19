import { createAction } from "@reduxjs/toolkit";

import { actionTypes } from "./action.types";
import { ProtoRobot } from "../models/robot";

export const loadActionCreator = createAction<Array<ProtoRobot>>(
    actionTypes.load
);

export const addActionCreator = createAction<ProtoRobot>(actionTypes.add);

export const updateActionCreator = createAction<ProtoRobot>(actionTypes.update);

export const deleteActionCreator = createAction<ProtoRobot>(actionTypes.delete);
