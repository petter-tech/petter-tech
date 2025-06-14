import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IExperienceAdminRepository } from "@repo/core-domain/repositories/admin/IExperienceAdminRepository";

export class ExperienceAdminRepository implements IExperienceAdminRepository {
  constructor(private cookies: string) {}
  fetch(): Promise<ResultState<Experience[]>> {
    throw new Error("Method not implemented.");
  }
  create(experience: Experience): Promise<ResultState<Experience>> {
    throw new Error("Method not implemented.");
  }
  update(experience: Experience): Promise<ResultState<Experience>> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<ResultState<string>> {
    throw new Error("Method not implemented.");
  }
}
