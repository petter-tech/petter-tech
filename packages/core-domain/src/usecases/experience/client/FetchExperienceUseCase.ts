import { Experience } from "../../../entities/Experience";
import { ResultState } from "../../../entities/ResultState";
import { IExperienceClientRepository } from "../../../repositories/client/IExperienceClientRepository";

export class FetchExperiencesUseCase {
  constructor(private repository: IExperienceClientRepository) {}
  execute(): Promise<ResultState<Experience[]>> {
    return this.repository.fetch();
  }
}
