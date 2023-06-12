import { User } from "../../domain/entities/user";
import { UserRepositoryInterface } from "../../domain/repositories/vehicle.repository.interface";
import { Either, left, right } from "../../shared/either";
import { FailureResult } from "../error/failure-result";
import { TypeFail } from "../error/type-fail";
import { Encoder } from "../ports/encoder";
import { UseCase } from "../ports/usecase";

type Output = Promise<Either<FailureResult, CreateUserOutput>>

export class CreateUserUsecase implements UseCase<CreateUserInput, Output> {
    constructor(
        private userRepository: UserRepositoryInterface,
        private encoder: Encoder
    ) {}

    async execute(input: CreateUserInput): Output {
        const doesUserExist = await this.userRepository.findByUsername(input.username);
        if (doesUserExist) return left({ type: TypeFail.Conflict, message: "User already exists" });
        const encodedPassword = await this.encoder.encode(input.password)
        const userOrFail = User.create(input.username, encodedPassword);
        if (userOrFail.isLeft()) return left({ type: TypeFail.Business, message: userOrFail.value });
        const user = userOrFail.value;
        await this.userRepository.save(user);
        return right({
            id: user.id,
            username: user.username,
            password: user.password,
            is_admin: user.is_admin
        });
    }
}

export interface CreateUserInput {
    username: string;
    password: string;
}

export interface CreateUserOutput {
    id: string | number;
    username: string;
    password: string;
    is_admin: boolean;
}