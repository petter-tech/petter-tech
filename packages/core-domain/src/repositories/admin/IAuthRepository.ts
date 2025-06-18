import { ResultState } from "@repo/core-domain/entities/ResultState";
import { User } from "@repo/core-domain/entities/User";

export interface IAuthRepository {
  login(email: string, password: string): Promise<ResultState<User>>;
  logout(): Promise<ResultState<string>>;
}
