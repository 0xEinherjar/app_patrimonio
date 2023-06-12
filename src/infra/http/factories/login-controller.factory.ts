import { LoginUsecase } from "../../../application/usecases/login.usecase";
import { BcryptEncoder } from "../../cryptograph/bcrypt-encoder";
import { JwtTokenManager } from "../../cryptograph/jwt-token-manager";
import { UserRepository } from "../../database/repositories/user.repository";
import { LoginController } from "../controller/login.controller";

export const LoginFactory = (db: any): LoginController => {
  const repository = new UserRepository(db);
  const encode = new BcryptEncoder();
  const token = new JwtTokenManager(process.env.JWT_SECRET);
  const usecase = new LoginUsecase(repository, encode, token);
  const controller = new LoginController(usecase);
  return controller;
}
