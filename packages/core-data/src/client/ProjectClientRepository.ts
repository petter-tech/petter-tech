import { Project } from "@repo/core-domain/entities/Project";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProjectClientRepository } from "@repo/core-domain/repositories/client/IProjectClientRepository";

export class ProjectClientRepository implements IProjectClientRepository {
  private mockProjects: Project[] = [
    {
      id: "proj-1",
      image:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg", // Placeholder image
      name: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution with user authentication, product catalog, shopping cart, and order processing.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoUrl: "https://ecommerce-demo.example.com",
      repoUrl: "https://github.com/your-github/ecommerce-platform",
    },
    {
      id: "proj-2",
      image:
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg", // Placeholder image
      name: "Task Management App",
      description:
        "A responsive web application for managing tasks, supporting drag-and-drop, due dates, and priority settings.",
      technologies: ["Vue.js", "Firebase", "TypeScript", "Tailwind CSS"],
      demoUrl: "https://task-manager-demo.example.com",
      repoUrl: "https://github.com/your-github/task-management-app",
    },
    {
      id: "proj-3",
      image:
        "https://images.pexels.com/photos/16129728/pexels-photo-16129728.jpeg", // Placeholder image
      name: "Portfolio Website",
      description:
        "This very portfolio website, built to showcase my skills and projects, featuring dynamic content management.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CMS (Headless)"],
      repoUrl: "https://github.com/petterjhuniorgarciainfante/petter-tech",
    },
  ];

  async fetch(): Promise<ResultState<Project[]>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // Return a deep copy of the mock data to prevent external modification
      return {
        type: "success",
        data: JSON.parse(JSON.stringify(this.mockProjects)),
      };
    } catch (error: any) {
      // In a real scenario, this might catch network errors or parsing issues.
      return {
        type: "error",
        message: `Failed to fetch projects: ${error.message}`,
      };
    }
  }
}
