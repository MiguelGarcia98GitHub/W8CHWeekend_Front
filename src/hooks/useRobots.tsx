import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../store/store";
import { ProtoRobot } from "../models/robot";
import * as ac from "../reducer/action.creator";
import { RobotRepository } from "../services/robot.repository";

export const useRobots = () => {
    const robots = useSelector((state: rootState) => state.robots);
    const dispatcher = useDispatch();
    const apiRobot = useMemo(() => new RobotRepository(), []);

    useEffect(() => {
        apiRobot
            .getAll()
            .then((robots) => dispatcher(ac.loadActionCreator(robots)))
            .catch((error: Error) => console.log(error.name, error.message));
    }, [apiRobot, dispatcher]);

    const handleAdd = (robot: ProtoRobot) => {
        apiRobot
            .create(robot)
            .then((robot: ProtoRobot) => dispatcher(ac.addActionCreator(robot)))
            .catch((error: Error) => console.log(error.name, error.message));
    };

    const handleUpdate = (partialRobot: Partial<ProtoRobot>) => {
        apiRobot
            .update(partialRobot)
            .then((robot: ProtoRobot) =>
                dispatcher(ac.updateActionCreator(robot))
            )
            .catch((error: Error) => console.log(error.name, error.message));
    };

    const handleDelete = (robot: ProtoRobot) => {
        apiRobot
            .delete(robot)
            .then(() => dispatcher(ac.deleteActionCreator(robot)))
            .catch((error: Error) => console.log(error.name, error.message));
    };

    return {
        robots,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
};
