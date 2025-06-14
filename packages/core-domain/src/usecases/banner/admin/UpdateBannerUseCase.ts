import { Banner } from "../../../entities/Banner";
import { ResultState } from "../../../entities/ResultState";
import { IBannerAdminRepository } from "../../../repositories/admin/IBannerAdminRepository";

export class UpdateBannerUseCase {
  constructor(private repository: IBannerAdminRepository) {}
  execute(banner: Banner): Promise<ResultState<Banner>> {
    return this.repository.update(banner);
  }
}
