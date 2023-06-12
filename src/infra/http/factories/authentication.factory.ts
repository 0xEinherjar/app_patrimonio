import { Authentication } from "../../authentication/authentication"
import { JwtTokenManager } from "../../cryptograph/jwt-token-manager";
import { UserRepository } from "../../database/repositories/user.repository";

export const AuthenticationFactory = (db: any): Authentication => {
  const repository = new UserRepository(db);
  const token = new JwtTokenManager(process.env.JWT_SECRET);
  const controller = new Authentication(token, repository);
  return controller;
}