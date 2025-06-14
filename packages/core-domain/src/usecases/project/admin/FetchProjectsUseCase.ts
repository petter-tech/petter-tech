import { Project } from "../../../entities/Project";
import { ResultState } from "../../../entities/ResultState";
import { IProjectAdminRepository } from "../../../repositories/admin/IProjectAdminRepository";

export class FetchProjectsUseCase {
  constructor(private repository: IProjectAdminRepository) {}
  execute(): Promise<ResultState<Project[]>> {
    return this.repository.fetch();
  }
}
