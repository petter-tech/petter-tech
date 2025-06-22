import { Profile } from "@repo/core-domain/entities/Profile";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProfileAdminRepository } from "@repo/core-domain/repositories/admin/IProfileAdminRepository";

export class ProfileAdminRepository implements IProfileAdminRepository {
  constructor(private cookies: string) {}

  private mockProfile: Profile | null = {
    id: "my-portfolio-profile", // Assuming a fixed ID for the single profile
    name: "Petter Garcia",
    headline: "Passionate about creating impactful web experiences",
    description:
      "With over 5 years of experience in full-stack development, I specialize in building scalable web applications using modern technologies. My expertise includes React, Node.js, and cloud architecture. I'm passionate about creating elegant solutions to complex problems and sharing knowledge with the developer community.",
    githubUrl: "https://github.com/your-github-profile",
    cvUrl: "/path/to/your/cv.pdf", // Assuming a relative path to a hosted CV
    picture:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg", // Placeholder image
    socialMedias: [],
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
  async create(profile: Profile): Promise<ResultState<Profile>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      // For a single profile, we might set its ID if it's the first time,
      // or ensure it matches the expected ID if replacing.
      const profileToCreate: Profile = {
        ...profile,
        id: this.mockProfile?.id || "my-portfolio-profile", // Ensure a consistent ID
      };

      this.mockProfile = profileToCreate;
      return {
        type: "success",
        data: JSON.parse(JSON.stringify(this.mockProfile)),
      };
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to create profile: ${error.message}`,
      };
    }
  }
  async update(profile: Profile): Promise<ResultState<Profile>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      if (this.mockProfile && this.mockProfile.id === profile.id) {
        this.mockProfile = { ...this.mockProfile, ...profile };
        return {
          type: "success",
          data: JSON.parse(JSON.stringify(this.mockProfile)),
        };
      } else {
        return {
          type: "error",
          message: `Profile with ID ${profile.id} not found for update.`,
        };
      }
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to update profile: ${error.message}`,
      };
    }
  }
  async delete(id: string): Promise<ResultState<string>> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      if (this.mockProfile && this.mockProfile.id === id) {
        this.mockProfile = null; // Set to null to simulate deletion
        return { type: "success", data: id }; // Successfully deleted, return the ID
      } else {
        return {
          type: "error",
          message: `Profile with ID ${id} not found for deletion.`,
        };
      }
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to delete profile: ${error.message}`,
      };
    }
  }
}
