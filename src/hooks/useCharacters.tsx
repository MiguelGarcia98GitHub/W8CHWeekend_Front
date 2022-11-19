import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../store/store";
import * as ac from "../reducer/action.creator";
import { CharacterRepository } from "../services/character.repository";
import { ProtoRobot } from "./../models/character";
import { ProtoRobotsObject } from "./../models/protorobots";

export const useCharacters = () => {
    const robots = useSelector((state: rootState) => state.robots);
    const dispatcher = useDispatch();
    const apiTask = useMemo(() => new CharacterRepository(), []);

    useEffect(() => {
        apiTask
            .getAll()
            .then((characters) => dispatcher(ac.loadActionCreator(characters)))
            .catch((error: Error) => console.log(error.name, error.message));
    }, [apiTask, dispatcher]);

    const handleAdd = (character: ProtoRobot) => {
        apiTask
            .create(character)
            .then((character: ProtoRobot) =>
                dispatcher(ac.addActionCreator(character))
            )
            .catch((error: Error) => console.log(error.name, error.message));
    };

    const handleUpdate = (partialCharacter: Partial<ProtoRobot>) => {
        apiTask
            .update(partialCharacter)
            .then((character: ProtoRobot) =>
                dispatcher(ac.updateActionCreator(character))
            )
            .catch((error: Error) => console.log(error.name, error.message));
    };

    const handleDelete = (character: ProtoRobot) => {
        apiTask
            .delete(character)
            .then(() => dispatcher(ac.deleteActionCreator(character)))
            .catch((error: Error) => console.log(error.name, error.message));
    };

    return {
        characters: robots,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
};
