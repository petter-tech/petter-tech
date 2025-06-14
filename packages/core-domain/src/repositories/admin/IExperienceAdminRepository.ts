import { Experience } from "../../entities/Experience";
import { ResultState } from "../../entities/ResultState";

export interface IExperienceAdminRepository {
  fetch(): Promise<ResultState<Experience[]>>;
  create(experience: Experience): Promise<ResultState<Experience>>;
  update(experience: Experience): Promise<ResultState<Experience>>;
  delete(id: string): Promise<ResultState<string>>;
}
