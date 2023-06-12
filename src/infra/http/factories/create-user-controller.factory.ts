import { CreateUserUsecase } from "../../../application/usecases/create-user.usecase";
import { BcryptEncoder } from "../../cryptograph/bcrypt-encoder";
import { UserRepository } from "../../database/repositories/user.repository";
import { CreateUserController } from "../controller/create-user.controller"


export const CreateUserFactory = (db: any): CreateUserController => {
  const repository = new UserRepository(db);
  const encode = new BcryptEncoder();
  const usecase = new CreateUserUsecase(repository, encode);
  const controller = new CreateUserController(usecase);
  return controller;
}