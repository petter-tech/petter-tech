import { Experience } from "../../entities/Experience";
import { ResultState } from "../../entities/ResultState";

export interface IExperienceClientRepository {
  fetch(): Promise<ResultState<Experience[]>>;
}
