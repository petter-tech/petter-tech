import { Experience } from "../../../entities/Experience";
import { ResultState } from "../../../entities/ResultState";
import { IExperienceAdminRepository } from "../../../repositories/admin/IExperienceAdminRepository";

export class FetchExperiencesUseCase {
  constructor(private repository: IExperienceAdminRepository) {}
  execute(): Promise<ResultState<Experience[]>> {
    return this.repository.fetch();
  }
}
