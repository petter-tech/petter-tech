import { Profile } from "@repo/core-domain/entities/Profile";
import { ResultState } from "@repo/core-domain/entities/ResultState";

export interface IProfileClientRepository {
  fetch(): Promise<ResultState<Profile>>;
}
