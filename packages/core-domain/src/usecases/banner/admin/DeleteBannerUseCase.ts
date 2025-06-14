import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IBannerAdminRepository } from "@repo/core-domain/repositories/admin/IBannerAdminRepository";

export class DeleteBannerUseCase {
  constructor(private repository: IBannerAdminRepository) {}
  execute(id: string): Promise<ResultState<string>> {
    return this.repository.delete(id);
  }
}
