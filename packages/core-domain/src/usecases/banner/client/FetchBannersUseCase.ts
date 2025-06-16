import { Banner } from "@repo/core-domain/entities/Banner";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IBannerClientRepository } from "@repo/core-domain/repositories/client/IBannerClientRepository";

export class FetchBannersUseCase {
  constructor(private repository: IBannerClientRepository) {}
  execute(): Promise<ResultState<Banner[]>> {
    return this.repository.fetch();
  }
}
