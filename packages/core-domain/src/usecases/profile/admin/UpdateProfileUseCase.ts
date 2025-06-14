import { Profile } from "../../../entities/Profile";
import { ResultState } from "../../../entities/ResultState";
import { IProfileAdminRepository } from "../../../repositories/admin/IProfileAdminRepository";

export class UpdateProfileUseCase {
  constructor(private repository: IProfileAdminRepository) {}
  execute(profile: Profile): Promise<ResultState<Profile>> {
    return this.repository.update(profile);
  }
}
