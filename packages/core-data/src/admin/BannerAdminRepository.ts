import { Banner } from "@repo/core-domain/entities/Banner";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IBannerAdminRepository } from "@repo/core-domain/repositories/admin/IBannerAdminRepository";

export class BannerAdminRepository implements IBannerAdminRepository {
  constructor(private cookies: string) {}

  fetch(): Promise<ResultState<Banner[]>> {
    throw new Error("Method not implemented.");
  }
  create(banner: Banner): Promise<ResultState<Banner>> {
    throw new Error("Method not implemented.");
  }
  update(banner: Banner): Promise<ResultState<Banner>> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<ResultState<string>> {
    throw new Error("Method not implemented.");
  }
}
