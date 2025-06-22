import { ResultState } from "@repo/core-domain/entities/ResultState";
import { User } from "@repo/core-domain/entities/User";
import { IAuthRepository } from "@repo/core-domain/repositories/admin/IAuthRepository";

export class LoginUserUseCase {
  constructor(private repository: IAuthRepository) {}
  execute(email: string, password: string): Promise<ResultState<User>> {
    return this.repository.login(email, password);
  }
}
