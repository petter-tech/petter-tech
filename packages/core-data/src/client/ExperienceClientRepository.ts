import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IExperienceClientRepository } from "@repo/core-domain/repositories/client/IExperienceClientRepository";

export class ExperienceClientRepository implements IExperienceClientRepository {
  fetch(): Promise<ResultState<Experience[]>> {
    throw new Error("Method not implemented.");
  }
}
