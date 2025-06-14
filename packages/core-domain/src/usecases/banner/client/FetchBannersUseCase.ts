import { Banner } from "../../../entities/Banner";
import { ResultState } from "../../../entities/ResultState";
import { IBannerClientRepository } from "../../../repositories/client/IBannerClientRepository";

export class FetchBannersUseCase {
  constructor(private repository: IBannerClientRepository) {}
  execute(): Promise<ResultState<Banner[]>> {
    return this.repository.fetch();
  }
}
