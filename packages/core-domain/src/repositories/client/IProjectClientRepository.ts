import { Project } from "@repo/core-domain/entities/Project";
import { ResultState } from "@repo/core-domain/entities/ResultState";

export interface IProjectClientRepository {
  fetch(): Promise<ResultState<Project[]>>;
}
