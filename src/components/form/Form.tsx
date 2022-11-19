import { useState } from "react";
import { useRobots } from "../../hooks/useRobots";

import { ProtoRobot } from "../../models/robot";

export const Form = () => {
    const { handleAdd } = useRobots();

    const [robot, setRobot] = useState({});

    return (
        <div>
            <form action="">
                <input
                    type="text"
                    placeholder="name of robot"
                    onChange={(e) => {
                        setRobot({
                            name: e.target.value,
                            resistance: "9",
                            speed: "9",
                            creationDate: "10/10/1800",
                        });
                    }}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setRobot({
                            ...robot,
                        });
                        handleAdd({
                            ...(robot as ProtoRobot),
                        });
                    }}
                >
                    ADD ROBOT
                </button>
            </form>
        </div>
    );
};
