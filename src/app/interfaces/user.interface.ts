export interface IUser {
    Id: number;
    Username: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    IdRole: IRole[];
}

export interface IRole {
    Id: number;
    Name: string;
}
