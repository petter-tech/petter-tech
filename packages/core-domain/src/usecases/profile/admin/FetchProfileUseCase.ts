import { Profile } from "@repo/core-domain/entities/Profile";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProfileAdminRepository } from "@repo/core-domain/repositories/admin/IProfileAdminRepository";

export class FetchProfileUseCase {
  constructor(private repository: IProfileAdminRepository) {}
  execute(): Promise<ResultState<Profile>> {
    return this.repository.fetch();
  }
}
