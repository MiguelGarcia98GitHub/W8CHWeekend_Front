export interface Repository<ProtoRobot> {
    getAll: () => Promise<Array<ProtoRobot>>;
    get?: (id: number) => Promise<ProtoRobot>;
    create: (item: Partial<ProtoRobot>) => Promise<ProtoRobot>;
    update: (item: Partial<ProtoRobot>) => Promise<ProtoRobot>;
    delete: (item: ProtoRobot) => Promise<void>;
}
