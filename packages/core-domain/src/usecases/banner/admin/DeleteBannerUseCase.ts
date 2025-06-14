import { ResultState } from "../../../entities/ResultState";
import { IBannerAdminRepository } from "../../../repositories/admin/IBannerAdminRepository";

export class DeleteBannerUseCase {
  constructor(private repository: IBannerAdminRepository) {}
  execute(id: string): Promise<ResultState<string>> {
    return this.repository.delete(id);
  }
}
