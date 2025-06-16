import { Banner } from "@repo/core-domain/entities/Banner";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IBannerAdminRepository } from "@repo/core-domain/repositories/admin/IBannerAdminRepository";

export class BannerAdminRepository implements IBannerAdminRepository {
  constructor(private cookies: string) {}

  private mockBanners: Banner[] = [
    {
      id: "banner-1",
      title: "Welcome to My Portfolio",
      headline: "Passionate about creating impactful web experiences",
      description:
        "With over 5 years of experience in full-stack development, I specialize in building scalable web applications using modern technologies. My expertise includes React, Node.js, and cloud architecture. I'm passionate about creating elegant solutions to complex problems and sharing knowledge with the developer community.",
      ctaText: "View GitHub",
      ctaUrl: "https://github.com/petterjhuniorgarciainfante",
      ctaIcon: "github", // Represents an icon name, e.g., for Lucide React or Font Awesome
    },
    {
      id: "banner-2",
      title: "My Latest Projects",
      headline: "Showcasing innovative solutions and clean code",
      description:
        "Explore a curated selection of my recent work, highlighting diverse technologies and problem-solving approaches. Each project represents a commitment to quality and user-centric design.",
      ctaText: "Explore Projects",
      ctaUrl: "/projects",
      ctaIcon: "layers",
    },
    {
      id: "banner-3",
      title: "Get in Touch",
      headline: "Let's build something amazing together!",
      description:
        "Whether you have a project idea, a collaboration opportunity, or just want to say hello, feel free to reach out. I'm always open to new challenges and connections.",
      ctaText: "Contact Me",
      ctaUrl: "/contact",
      ctaIcon: "send",
    },
  ];

  async fetch(): Promise<ResultState<Banner[]>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      return { type: "success", data: [...this.mockBanners] };
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to fetch banners: ${error.message}`,
      };
    }
  }
  async create(banner: Banner): Promise<ResultState<Banner>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const newId = `banner-${this.mockBanners.length + 1}-${Date.now()}`;
      const newBanner: Banner = { ...banner, id: newId };

      this.mockBanners.push(newBanner);
      return { type: "success", data: newBanner };
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to create banner: ${error.message}`,
      };
    }
  }
  async update(banner: Banner): Promise<ResultState<Banner>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const index = this.mockBanners.findIndex((b) => b.id === banner.id);
      if (index !== -1) {
        this.mockBanners[index] = { ...this.mockBanners[index], ...banner };
        return { type: "success", data: this.mockBanners[index] };
      } else {
        return {
          type: "error",
          message: `Banner with ID ${banner.id} not found for update.`,
        };
      }
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to update banner: ${error.message}`,
      };
    }
  }
  async delete(id: string): Promise<ResultState<string>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    try {
      const initialLength = this.mockBanners.length;
      this.mockBanners = this.mockBanners.filter((b) => b.id !== id);

      if (this.mockBanners.length < initialLength) {
        return { type: "success", data: id };
      } else {
        return {
          type: "error",
          message: `Banner with ID ${id} not found for deletion.`,
        };
      }
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to delete banner: ${error.message}`,
      };
    }
  }
}
