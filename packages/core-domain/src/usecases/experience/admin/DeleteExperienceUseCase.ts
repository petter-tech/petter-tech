import { ResultState } from "../../../entities/ResultState";
import { IExperienceAdminRepository } from "../../../repositories/admin/IExperienceAdminRepository";

export class DeleteExperienceUseCase {
  constructor(private repository: IExperienceAdminRepository) {}
  execute(id: string): Promise<ResultState<string>> {
    return this.repository.delete(id);
  }
}
