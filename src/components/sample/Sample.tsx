import { useRobots } from "./../../hooks/useRobots";

export function Sample() {
    const { robots, handleDelete, handleUpdate } = useRobots();
    return (
        <ul>
            {robots.map((item) => (
                <li key={item.id}>
                    <div key={item.id}>{item.name}</div>
                    <button
                        onClick={() => {
                            handleDelete(item);
                        }}
                    >
                        DELETE ROBOT WITH THE ID: {item.id}
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
