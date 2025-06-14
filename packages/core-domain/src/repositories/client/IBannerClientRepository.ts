import { Banner } from "../../entities/Banner";
import { ResultState } from "../../entities/ResultState";

export interface IBannerClientRepository {
  fetch(): Promise<ResultState<Banner[]>>;
}
