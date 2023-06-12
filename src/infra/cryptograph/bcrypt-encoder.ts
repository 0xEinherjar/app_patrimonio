import { Encoder } from "../../application/ports/encoder";
const bcrypt = require("bcrypt");

export class BcryptEncoder implements Encoder {
  private readonly rounds: number = 8;

  async encode (plain: string): Promise<string> {
    return await bcrypt.hash(plain, this.rounds);
  }

  async compare (plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }
}