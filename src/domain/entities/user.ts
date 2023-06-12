import { randomUUID } from "crypto";
import { Either, left, right } from "../../shared/either";

export class User {
    public readonly id: string;
    public readonly username: string;
    public readonly password: string;
    public readonly is_admin: boolean;

    private constructor(username: string, password: string, is_admin: boolean,  id?: string) {
        this.id = id || randomUUID();
        this.username = username;
        this.password = password;
        this.is_admin = is_admin;
    }

    static create(username: string, password: string, is_admin?: boolean, id?: string): Either<string, User> {
        if (!username) return left("username is null or undefined");
        if (!password) return left("password is null or undefined");
        is_admin = is_admin ? is_admin : false
        return right(new User(username, password, is_admin, id));
    }
}