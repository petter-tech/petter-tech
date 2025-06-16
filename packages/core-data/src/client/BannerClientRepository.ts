import { Banner } from "@repo/core-domain/entities/Banner";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IBannerClientRepository } from "@repo/core-domain/repositories/client/IBannerClientRepository";

export class BannerClientRepository implements IBannerClientRepository {
  private mockBanners: Banner[] = [
    {
      id: "banner-1",
      title: "Full Stack Developer",
      headline: "Passionate about creating impactful web experiences",
      description:
        "With over 5 years of experience in full-stack development, I specialize in building scalable web applications using modern technologies. My expertise includes React, Node.js, and cloud architecture. I'm passionate about creating elegant solutions to complex problems and sharing knowledge with the developer community.",
      ctaText: "See what I do",
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
}
