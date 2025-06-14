import { Project } from "@repo/core-domain/entities/Project";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProjectAdminRepository } from "@repo/core-domain/repositories/admin/IProjectAdminRepository";

export class CreateProjectUseCase {
  constructor(private repository: IProjectAdminRepository) {}
  execute(project: Project): Promise<ResultState<Project>> {
    return this.repository.create(project);
  }
}
