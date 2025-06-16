import { Banner } from "@repo/core-domain/entities/Banner";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IBannerAdminRepository } from "@repo/core-domain/repositories/admin/IBannerAdminRepository";

export class CreateBannerUseCase {
  constructor(private repository: IBannerAdminRepository) {}
  execute(banner: Banner): Promise<ResultState<Banner>> {
    return this.repository.create(banner);
  }
}
