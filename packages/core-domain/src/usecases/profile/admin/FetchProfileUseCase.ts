import { Profile } from "../../../entities/Profile";
import { ResultState } from "../../../entities/ResultState";
import { IProfileAdminRepository } from "../../../repositories/admin/IProfileAdminRepository";

export class FetchProfilesUseCase {
  constructor(private repository: IProfileAdminRepository) {}
  execute(): Promise<ResultState<Profile>> {
    return this.repository.fetch();
  }
}
