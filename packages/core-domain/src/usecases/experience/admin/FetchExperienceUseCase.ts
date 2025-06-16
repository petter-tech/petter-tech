import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IExperienceAdminRepository } from "@repo/core-domain/repositories/admin/IExperienceAdminRepository";

export class FetchExperiencesUseCase {
  constructor(private repository: IExperienceAdminRepository) {}
  execute(): Promise<ResultState<Experience[]>> {
    return this.repository.fetch();
  }
}
