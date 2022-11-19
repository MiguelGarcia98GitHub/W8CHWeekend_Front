import { useState } from "react";
import { useCharacters } from "../../hooks/useCharacters";
import { ProtoRobot } from "../../models/character";

export const Form = () => {
    const { handleAdd } = useCharacters();

    const [character, setCharacter] = useState({});

    return (
        <div>
            <form action="">
                <input
                    type="text"
                    placeholder="name of character"
                    onChange={(e) => {
                        setCharacter({
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
                        setCharacter({
                            ...character,
                        });
                        handleAdd({
                            ...(character as ProtoRobot),
                        });
                    }}
                >
                    ADD CHARACTER
                </button>
            </form>
        </div>
    );
};
