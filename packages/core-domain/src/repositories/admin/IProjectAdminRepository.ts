import { Project } from "../../entities/Project";
import { ResultState } from "../../entities/ResultState";

export interface IProjectAdminRepository {
  fetch(): Promise<ResultState<Project[]>>;
  create(project: Project): Promise<ResultState<Project>>;
  update(project: Project): Promise<ResultState<Project>>;
  delete(id: string): Promise<ResultState<string>>;
}
