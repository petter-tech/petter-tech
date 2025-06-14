import { Banner } from "../../../entities/Banner";
import { ResultState } from "../../../entities/ResultState";
import { IBannerAdminRepository } from "../../../repositories/admin/IBannerAdminRepository";

export class FetchBannersUseCase {
  constructor(private repository: IBannerAdminRepository) {}
  execute(): Promise<ResultState<Banner[]>> {
    return this.repository.fetch();
  }
}
