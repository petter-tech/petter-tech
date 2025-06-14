import { Project } from "../../../entities/Project";
import { ResultState } from "../../../entities/ResultState";
import { IProjectClientRepository } from "../../../repositories/client/IProjectClientRepository";

export class FetchProjectsUseCase {
  constructor(private repository: IProjectClientRepository) {}
  execute(): Promise<ResultState<Project[]>> {
    return this.repository.fetch();
  }
}
