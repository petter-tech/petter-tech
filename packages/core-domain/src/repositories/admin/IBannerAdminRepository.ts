import { Banner } from "../../entities/Banner";
import { ResultState } from "../../entities/ResultState";

export interface IBannerAdminRepository {
  fetch(): Promise<ResultState<Banner[]>>;
  create(banner: Banner): Promise<ResultState<Banner>>;
  update(banner: Banner): Promise<ResultState<Banner>>;
  delete(id: string): Promise<ResultState<string>>;
}
