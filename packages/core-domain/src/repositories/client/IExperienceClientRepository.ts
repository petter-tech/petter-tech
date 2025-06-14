import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";

export interface IExperienceClientRepository {
  fetch(): Promise<ResultState<Experience[]>>;
}
