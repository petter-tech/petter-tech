import { Profile } from "../../entities/Profile";
import { ResultState } from "../../entities/ResultState";

export interface IProfileClientRepository {
  fetch(): Promise<ResultState<Profile>>;
}
