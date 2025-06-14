import { Profile } from "../../../entities/Profile";
import { ResultState } from "../../../entities/ResultState";
import { IProfileClientRepository } from "../../../repositories/client/IProfileClientRepository";

export class FetchProfileUseCase {
  constructor(private repository: IProfileClientRepository) {}
  execute(): Promise<ResultState<Profile>> {
    return this.repository.fetch();
  }
}
