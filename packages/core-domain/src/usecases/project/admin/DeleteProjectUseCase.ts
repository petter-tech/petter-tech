import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProjectAdminRepository } from "@repo/core-domain/repositories/admin/IProjectAdminRepository";

export class DeleteProjectUseCase {
  constructor(private repository: IProjectAdminRepository) {}
  execute(id: string): Promise<ResultState<string>> {
    return this.repository.delete(id);
  }
}
