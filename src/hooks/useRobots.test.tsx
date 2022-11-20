/* eslint-disable testing-library/no-render-in-setup */
import { RobotRepository } from "../services/robot.repository";
import { rootState, rootStore } from "../store/store";
import { ProtoRobot } from "./../models/robot";
import { configureStore } from "@reduxjs/toolkit";
import { robotReducer } from "../reducer/reducer";
import { Provider } from "react-redux";
import { renderHook, waitFor } from "@testing-library/react";
import { useRobots } from "./useRobots";

jest.mock("../services/robot.repository");

describe("Given the custom hook useRobots", () => {
    let mockProtoRobot: ProtoRobot;

    describe("When we simulate its use in a component", () => {
        interface Current {
            robots: Array<ProtoRobot>;
            handleAdd: (robot: ProtoRobot) => void;
            handleDelete: (robot: ProtoRobot) => void;
            handleUpdate: (updateRobot: Partial<ProtoRobot>) => void;
        }

        let current: Current;
        let mockStore: rootStore;

        beforeEach(() => {
            mockProtoRobot = {
                name: "TestBot123",
                speed: "6",
                resistance: "6",
            };
        });

        // renderHook simula un componente
        // envuelto en un provider de react-redux que accede al store
        // el useRobots accede al store y selecciona el state que  necesita
        // el useEffect llama al mock del servicio repository
        // que retorna un mock de datos []
        // con los cuales se actualiza el state en el store
        // Y esto último se comprueba en el expect
        beforeEach(async () => {
            RobotRepository.prototype.getAll = jest
                .fn()
                .mockResolvedValue([mockProtoRobot]);
            RobotRepository.prototype.create = jest
                .fn()
                .mockResolvedValue(mockProtoRobot);
            RobotRepository.prototype.update = jest
                .fn()
                .mockResolvedValue(mockProtoRobot);
            RobotRepository.prototype.delete = jest
                .fn()
                .mockResolvedValue(undefined);

            const preloadedState: rootState = { robots: [] };
            mockStore = configureStore({
                reducer: {
                    robots: robotReducer,
                },
                preloadedState,
            });

            const wrapper = ({ children }: { children: JSX.Element }) => (
                <Provider store={mockStore}>{children}</Provider>
            );
            ({
                result: { current },
            } = renderHook(() => useRobots(), { wrapper }));
        });

        // test('Then the state is accesible by the hook', async () => {

        test(`Then the hock call to the repository to add a new robot 
            and dispatch an action for add the robot to the state`, async () => {
            // Datos iniciales definidos en preloadedState
            expect(current.robots).toEqual([]);
            current.handleAdd(mockProtoRobot);
            expect(RobotRepository.prototype.create).toHaveBeenCalled();
        });

        test(`Then the hock call to the repository to add a new robot 
            should give us an error`, async () => {
            // Datos iniciales definidos en preloadedState

            RobotRepository.prototype.create = jest.fn().mockRejectedValue({});
            const apiRobot = {
                ...new RobotRepository(),
                create: jest.fn().mockRejectedValue({}),
            };
            await current.handleAdd({} as ProtoRobot);
            await waitFor(() => {
                expect(current.robots).toEqual([]);
            });
        });

        test(`Then the hock call to the repository to update a robot
            and dispatch an action for update the robot in the state`, async () => {
            // Datos iniciales definidos en preloadedState
            expect(current.robots).toEqual([]);
            current.handleUpdate(mockProtoRobot);
            await waitFor(() => {
                expect(RobotRepository.prototype.update).toHaveBeenCalled();
            });
        });

        test(`Then the hock call to the repository to delete a robot
            and dispatch an action for delete the robot from the state`, async () => {
            // Datos iniciales definidos en preloadedState
            expect(current.robots).toEqual([]);
            current.handleDelete(mockProtoRobot);
            await waitFor(() => {
                expect(RobotRepository.prototype.delete).toHaveBeenCalled();
            });
        });
    });
});
