import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IExperienceAdminRepository } from "@repo/core-domain/repositories/admin/IExperienceAdminRepository";

export class UpdateExperienceUseCase {
  constructor(private repository: IExperienceAdminRepository) {}
  execute(experience: Experience): Promise<ResultState<Experience>> {
    return this.repository.update(experience);
  }
}
