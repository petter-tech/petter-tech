import { Project } from "@repo/core-domain/entities/Project";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProjectClientRepository } from "@repo/core-domain/repositories/client/IProjectClientRepository";

export class ProjectAdminRepository implements IProjectClientRepository {
  fetch(): Promise<ResultState<Project[]>> {
    throw new Error("Method not implemented.");
  }
}
