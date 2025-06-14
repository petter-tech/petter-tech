import { Banner } from "../../../entities/Banner";
import { ResultState } from "../../../entities/ResultState";
import { IBannerAdminRepository } from "../../../repositories/admin/IBannerAdminRepository";

export class CreateBannerUseCase {
  constructor(private repository: IBannerAdminRepository) {}
  execute(banner: Banner): Promise<ResultState<Banner>> {
    return this.repository.create(banner);
  }
}
