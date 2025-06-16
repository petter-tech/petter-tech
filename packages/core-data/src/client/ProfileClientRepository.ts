import { Profile } from "@repo/core-domain/entities/Profile";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProfileClientRepository } from "@repo/core-domain/repositories/client/IProfileClientRepository";

export class ProfileClientRepository implements IProfileClientRepository {
  private mockProfile: Profile | null = {
    id: "my-portfolio-profile", // Assuming a fixed ID for the single profile
    headline: "Passionate about creating impactful web experiences",
    description:
      "With over 5 years of experience in full-stack development, I specialize in building scalable web applications using modern technologies. My expertise includes React, Node.js, and cloud architecture. I'm passionate about creating elegant solutions to complex problems and sharing knowledge with the developer community.",
    githubUrl: "https://github.com/your-github-profile",
    cvUrl: "/path/to/your/cv.pdf", // Assuming a relative path to a hosted CV
    picture:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
  };

  async fetch(): Promise<ResultState<Profile>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      if (this.mockProfile) {
        // Return a deep copy to prevent external modification
        return {
          type: "success",
          data: JSON.parse(JSON.stringify(this.mockProfile)),
        };
      } else {
        return { type: "error", message: "Profile not found." };
      }
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to fetch profile: ${error.message}`,
      };
    }
  }
}
