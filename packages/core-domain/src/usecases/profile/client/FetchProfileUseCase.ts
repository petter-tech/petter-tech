import { Profile } from "@repo/core-domain/entities/Profile";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProfileClientRepository } from "@repo/core-domain/repositories/client/IProfileClientRepository";

export class FetchProfileUseCase {
  constructor(private repository: IProfileClientRepository) {}
  execute(): Promise<ResultState<Profile>> {
    return this.repository.fetch();
  }
}
