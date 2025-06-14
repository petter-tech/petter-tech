import { Project } from "@repo/core-domain/entities/Project";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProjectAdminRepository } from "@repo/core-domain/repositories/admin/IProjectAdminRepository";

export class FetchProjectsUseCase {
  constructor(private repository: IProjectAdminRepository) {}
  execute(): Promise<ResultState<Project[]>> {
    return this.repository.fetch();
  }
}
