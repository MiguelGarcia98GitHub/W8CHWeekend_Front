import { Repository } from "./repository";
import { ProtoRobot } from "./../models/character";

export class CharacterRepository implements Repository<ProtoRobot> {
    url: string;
    constructor(url = "https://w8chweekend.onrender.com/robots") {
        this.url = url ? url : (process.env.REACT_APP_URL_CHARACTERS as string);
    }

    createError(response: Response) {
        const message = `Error ${response.status}: ${response.statusText}`;
        const error = new Error(message);
        error.name = "HTTPError";
        return error;
    }

    // read / get
    getAll(): Promise<Array<ProtoRobot>> {
        return fetch(this.url)
            .then((response) => {
                if (!response.ok) {
                    throw this.createError(response);
                }
                return response.json();
            })
            .then((data) => {
                return data.robots;
            });
    }

    // create / post
    create(task: Partial<ProtoRobot>): Promise<ProtoRobot> {
        return fetch(this.url, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.createError(response);
        });
    }

    // delete
    delete(character: ProtoRobot): Promise<void> {
        return fetch(`${this.url}/${character.id}`, {
            method: "DELETE",
        }).then((response) => {
            if (!response.ok) throw this.createError(response);
        });
    }

    // update / patch
    update(partialTask: Partial<ProtoRobot>): Promise<ProtoRobot> {
        return fetch(`${this.url}/${partialTask.id}`, {
            method: "PATCH",
            body: JSON.stringify(partialTask),
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.createError(response);
        });
    }
}
