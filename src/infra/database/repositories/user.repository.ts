import { User } from "../../../domain/entities/user";
import { UserRepositoryInterface } from "../../../domain/repositories/vehicle.repository.interface";

export class UserRepository implements UserRepositoryInterface {
    constructor(private db: any) {}

    async findById(id: string): Promise<boolean> {
        const userRef = this.db.collection("users")
        const snapshot = await userRef.where("id", "==", id).get();
        return snapshot.empty ? false : true;
    }

    async findByUsername(username: string): Promise<boolean> {
        const userRef = this.db.collection("users")
        const snapshot = await userRef.where("username", "==", username).get();
        return snapshot.empty ? false : true;
    }

    async save(user: User): Promise<void> {
        await this.db.collection("users").add({
            id: user.id,
            username: user.username,
            password: user.password,
            is_admin: user.is_admin
        });
    }

    async loadOne(username: string): Promise<User | null> {
        const userRef = this.db.collection("users")
        const snapshot = await userRef.where("username", "==", username).get();
        if (snapshot.empty) return null;
        let result: any[] = [];
        snapshot.forEach((doc: any) => {
            result.push(User.create(doc.data().username ,doc.data().password, doc.data().is_admin, doc.data().id))
        });
        if (result[0].isLeft()) return null;
        const user = result[0].value
        return user;
    }
}