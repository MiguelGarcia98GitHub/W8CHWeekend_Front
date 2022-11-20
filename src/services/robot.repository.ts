import { Repository } from "./repository";
import { ProtoRobot } from "../models/robot";

export class RobotRepository implements Repository<ProtoRobot> {
    url: string;
    constructor(url = "https://w8chweekend.onrender.com/robots") {
        this.url = url;
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
    create(robot: Partial<ProtoRobot>): Promise<ProtoRobot> {
        return fetch(this.url, {
            method: "POST",
            body: JSON.stringify(robot),
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.createError(response);
        });
    }

    // delete
    delete(robot: ProtoRobot): Promise<void> {
        return fetch(`${this.url}/${robot.id}`, {
            method: "DELETE",
        }).then((response) => {
            if (!response.ok) throw this.createError(response);
        });
    }

    // update / patch
    update(partialRobot: Partial<ProtoRobot>): Promise<ProtoRobot> {
        return fetch(`${this.url}/${partialRobot.id}`, {
            method: "PATCH",
            body: JSON.stringify(partialRobot),
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.createError(response);
        });
    }
}
