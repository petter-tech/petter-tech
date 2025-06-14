import { Banner } from "@repo/core-domain/entities/Banner";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IBannerAdminRepository } from "@repo/core-domain/repositories/admin/IBannerAdminRepository";

export class FetchBannersUseCase {
  constructor(private repository: IBannerAdminRepository) {}
  execute(): Promise<ResultState<Banner[]>> {
    return this.repository.fetch();
  }
}
