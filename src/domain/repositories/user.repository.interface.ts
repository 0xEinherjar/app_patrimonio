import { User } from "../entities/user";

export interface UserRepositoryInterface {
    findByUsername(username: string): Promise<boolean>;
    save(user: User): Promise<void>;
    loadOne(username: string): Promise<User | null>;
    findById(id: string): Promise<boolean>;
}