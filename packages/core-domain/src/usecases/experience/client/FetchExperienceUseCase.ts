import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IExperienceClientRepository } from "@repo/core-domain/repositories/client/IExperienceClientRepository";

export class FetchExperiencesUseCase {
  constructor(private repository: IExperienceClientRepository) {}
  execute(): Promise<ResultState<Experience[]>> {
    return this.repository.fetch();
  }
}
