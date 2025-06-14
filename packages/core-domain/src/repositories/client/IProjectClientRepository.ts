import { Project } from "../../entities/Project";
import { ResultState } from "../../entities/ResultState";

export interface IProjectClientRepository {
  fetch(): Promise<ResultState<Project[]>>;
}
