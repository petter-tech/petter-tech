import { Profile } from "@repo/core-domain/entities/Profile";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProfileAdminRepository } from "@repo/core-domain/repositories/admin/IProfileAdminRepository";

export class UpdateProfileUseCase {
  constructor(private repository: IProfileAdminRepository) {}
  execute(profile: Profile): Promise<ResultState<Profile>> {
    return this.repository.update(profile);
  }
}
