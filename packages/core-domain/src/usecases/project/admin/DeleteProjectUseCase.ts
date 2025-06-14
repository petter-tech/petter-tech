import { ResultState } from "../../../entities/ResultState";
import { IProfileAdminRepository } from "../../../repositories/admin/IProfileAdminRepository";

export class DeleteProfileUseCase {
  constructor(private repository: IProfileAdminRepository) {}
  execute(id: string): Promise<ResultState<string>> {
    return this.repository.delete(id);
  }
}
