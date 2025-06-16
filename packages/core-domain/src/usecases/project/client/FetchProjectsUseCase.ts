import { Project } from "@repo/core-domain/entities/Project";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProjectClientRepository } from "@repo/core-domain/repositories/client/IProjectClientRepository";

export class FetchProjectsUseCase {
  constructor(private repository: IProjectClientRepository) {}
  execute(): Promise<ResultState<Project[]>> {
    return this.repository.fetch();
  }
}
