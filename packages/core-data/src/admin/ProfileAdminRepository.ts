import { Profile } from "@repo/core-domain/entities/Profile";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProfileAdminRepository } from "@repo/core-domain/repositories/admin/IProfileAdminRepository";

export class ProfileAdminRepository implements IProfileAdminRepository {
  constructor(private cookies: string) {}
  fetch(): Promise<ResultState<Profile>> {
    throw new Error("Method not implemented.");
  }
  create(profile: Profile): Promise<ResultState<Profile>> {
    throw new Error("Method not implemented.");
  }
  update(profile: Profile): Promise<ResultState<Profile>> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<ResultState<string>> {
    throw new Error("Method not implemented.");
  }
}
