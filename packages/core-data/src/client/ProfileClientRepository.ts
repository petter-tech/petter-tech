import { Profile } from "@repo/core-domain/entities/Profile";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProfileClientRepository } from "@repo/core-domain/repositories/client/IProfileClientRepository";

export class ProfileClientRepository implements IProfileClientRepository {
  fetch(): Promise<ResultState<Profile>> {
    throw new Error("Method not implemented.");
  }
}
