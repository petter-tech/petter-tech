import { Project } from "../../../entities/Project";
import { ResultState } from "../../../entities/ResultState";
import { IProjectAdminRepository } from "../../../repositories/admin/IProjectAdminRepository";

export class UpdateProjectUseCase {
  constructor(private repository: IProjectAdminRepository) {}
  execute(project: Project): Promise<ResultState<Project>> {
    return this.repository.update(project);
  }
}
