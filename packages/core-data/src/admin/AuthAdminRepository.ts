import { ResultState } from "@repo/core-domain/entities/ResultState";
import { User } from "@repo/core-domain/entities/User";
import { IAuthRepository } from "@repo/core-domain/repositories/admin/IAuthRepository";

export class AuthAdminRepository implements IAuthRepository {
  async login(email: string, password: string): Promise<ResultState<User>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      return {
        type: "success",
        data: {
          id: "123123123",
          name: "Petter Garcia",
          email: email,
          picture: "",
        },
      };
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to fetch profile: ${error.message}`,
      };
    }
  }

  logout(): Promise<ResultState<string>> {
    throw new Error("Method not implemented.");
  }
}
