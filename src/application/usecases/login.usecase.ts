import { UserRepositoryInterface } from "../../domain/repositories/vehicle.repository.interface";
import { Either, left, right } from "../../shared/either";
import { FailureResult } from "../error/failure-result";
import { TypeFail } from "../error/type-fail";
import { Encoder } from "../ports/encoder";
import { TokenManager } from "../ports/token-manager";
import { UseCase } from "../ports/usecase";

type Output = Promise<Either<FailureResult, LoginOutput>>

export class LoginUsecase implements UseCase<LoginInput, Output> {
    constructor(
        private repository: UserRepositoryInterface,
        private encoder: Encoder,
        private token: TokenManager
    ) {}

    async execute(input: LoginInput): Output {
        const user = await this.repository.loadOne(input.username);
        if (!user) return left({ type: TypeFail.Unauthorized, message: "User not exists" });
        const matches = await this.encoder.compare(input.password, user.password);
        if (!matches) return left({ type: TypeFail.Forbidden, message: "Invalid password" });
        const token = await this.token.sign({ id: user.id })
        return right({ token });
    }
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface LoginOutput {
    token: string;
}