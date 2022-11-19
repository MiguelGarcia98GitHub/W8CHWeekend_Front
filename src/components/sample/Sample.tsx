import { useCharacters } from "../../hooks/useCharacters";

export function Sample() {
    const { characters, handleDelete, handleUpdate } = useCharacters();
    console.log(characters);
    return (
        <ul>
            {characters.map((item) => (
                <li key={item.id}>
                    <div key={item.id}>{item.name}</div>
                    <button
                        onClick={() => {
                            handleDelete(item);
                        }}
                    >
                        DELETE CHARACTER {item.id}
                    </button>
                    <input
                        type="checkbox"
                        name="alivecheck"
                        id="alivecheck"
                        onChange={() => {
                            handleUpdate({
                                ...item,
                                speed: (item.speed + 1).toString(),
                            });
                        }}
                    />
                    change status
                </li>
            ))}
        </ul>
    );
}
