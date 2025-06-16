import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";

export interface IExperienceAdminRepository {
  fetch(): Promise<ResultState<Experience[]>>;
  create(experience: Experience): Promise<ResultState<Experience>>;
  update(experience: Experience): Promise<ResultState<Experience>>;
  delete(id: string): Promise<ResultState<string>>;
}
