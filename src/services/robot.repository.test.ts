import { RobotRepository } from "./robot.repository";

describe("Given an instance of RobotApi Service", () => {
    let service: RobotRepository;
    beforeEach(() => {
        service = new RobotRepository("http://forCoverOptionLine");
        service = new RobotRepository();
    });

    describe("When we use service.getAll()", () => {
        test(`Then if all are OK, it should return a Promise of an Array of Task`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue([]),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await service.getAll();
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: "Server Error",
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(async () => await service.getAll()).rejects.toThrow();
        });
    });
    describe("When we use service.create()", () => {
        const mockRobot = {
            id: "60",
            name: "PepeTron5000",
            resistance: "9",
            speed: "9",
        };
        test(`Then if all are OK,
                it should return a Promise of the created robot`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockRobot),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await service.create(mockRobot);
        });

        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: "Server Error",
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.create(mockRobot)
            ).rejects.toThrow();
        });
    });
    describe("When we use service.delete", () => {
        const mockRobot = {
            id: "60",
            name: "PepeTron5000",
            resistance: "9",
            speed: "9",
        };
        test(`Then if id are OK (1), it should return a Promise void`, async () => {
            const response = {
                ok: true,
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await service.delete(mockRobot);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: "Server Error",
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.delete(mockRobot)
            ).rejects.toThrowError();
        });
    });
    describe("When we use service.update()", () => {
        const mockRobot = {
            id: "60",
            name: "PepeTron5000",
            resistance: "9",
            speed: "9",
        };

        test(`Then if all are OK, it should return a Promise of ...`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockRobot),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.update(mockRobot);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockRobot);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: "Server Error",
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.update(mockRobot)
            ).rejects.toThrow();
        });
    });
});
