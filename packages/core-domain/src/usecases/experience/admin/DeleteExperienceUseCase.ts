import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IExperienceAdminRepository } from "@repo/core-domain/repositories/admin/IExperienceAdminRepository";

export class DeleteExperienceUseCase {
  constructor(private repository: IExperienceAdminRepository) {}
  execute(id: string): Promise<ResultState<string>> {
    return this.repository.delete(id);
  }
}
