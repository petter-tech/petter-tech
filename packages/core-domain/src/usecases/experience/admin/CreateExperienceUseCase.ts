import { Experience } from "../../../entities/Experience";
import { ResultState } from "../../../entities/ResultState";
import { IExperienceAdminRepository } from "../../../repositories/admin/IExperienceAdminRepository";

export class CreateExperienceUseCase {
  constructor(private repository: IExperienceAdminRepository) {}
  execute(experience: Experience): Promise<ResultState<Experience>> {
    return this.repository.create(experience);
  }
}
