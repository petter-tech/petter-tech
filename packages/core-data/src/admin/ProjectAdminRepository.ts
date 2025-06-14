import { Project } from "@repo/core-domain/entities/Project";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProjectAdminRepository } from "@repo/core-domain/repositories/admin/IProjectAdminRepository";

export class ProjectAdminRepository implements IProjectAdminRepository {
  constructor(private cookies: string) {}
  fetch(): Promise<ResultState<Project[]>> {
    throw new Error("Method not implemented.");
  }
  create(project: Project): Promise<ResultState<Project>> {
    throw new Error("Method not implemented.");
  }
  update(project: Project): Promise<ResultState<Project>> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<ResultState<string>> {
    throw new Error("Method not implemented.");
  }
}
