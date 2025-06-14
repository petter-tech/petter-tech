import { Banner } from "@repo/core-domain/entities/Banner";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IBannerClientRepository } from "@repo/core-domain/repositories/client/IBannerClientRepository";

export class BannerClientRepository implements IBannerClientRepository {
  fetch(): Promise<ResultState<Banner[]>> {
    throw new Error("Method not implemented.");
  }
}
