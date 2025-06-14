import { Profile } from "../../entities/Profile";
import { ResultState } from "../../entities/ResultState";

export interface IProfileAdminRepository {
  fetch(): Promise<ResultState<Profile>>;
  create(profile: Profile): Promise<ResultState<Profile>>;
  update(profile: Profile): Promise<ResultState<Profile>>;
  delete(id: string): Promise<ResultState<string>>;
}
