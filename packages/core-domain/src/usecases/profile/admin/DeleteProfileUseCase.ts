import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProfileAdminRepository } from "@repo/core-domain/repositories/admin/IProfileAdminRepository";

export class DeleteProfileUseCase {
  constructor(private repository: IProfileAdminRepository) {}
  execute(id: string): Promise<ResultState<string>> {
    return this.repository.delete(id);
  }
}
