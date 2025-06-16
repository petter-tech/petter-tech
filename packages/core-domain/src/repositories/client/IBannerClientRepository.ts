import { Banner } from "@repo/core-domain/entities/Banner";
import { ResultState } from "@repo/core-domain/entities/ResultState";

export interface IBannerClientRepository {
  fetch(): Promise<ResultState<Banner[]>>;
}
