import { Project } from "@repo/core-domain/entities/Project";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IProjectAdminRepository } from "@repo/core-domain/repositories/admin/IProjectAdminRepository";

export class ProjectAdminRepository implements IProjectAdminRepository {
  constructor(private cookies: string) {}
  private mockProjects: Project[] = [
    {
      id: "proj-1",
      image: "https://placehold.co/300x200/ADD8E6/000000?text=Project+1", // Placeholder image
      name: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution with user authentication, product catalog, shopping cart, and order processing.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoUrl: "https://ecommerce-demo.example.com",
      repoUrl: "https://github.com/your-github/ecommerce-platform",
    },
    {
      id: "proj-2",
      image: "https://placehold.co/300x200/90EE90/000000?text=Project+2", // Placeholder image
      name: "Task Management App",
      description:
        "A responsive web application for managing tasks, supporting drag-and-drop, due dates, and priority settings.",
      technologies: ["Vue.js", "Firebase", "TypeScript", "Tailwind CSS"],
      demoUrl: "https://task-manager-demo.example.com",
      repoUrl: "https://github.com/your-github/task-management-app",
    },
    {
      id: "proj-3",
      image: "https://placehold.co/300x200/FFD700/000000?text=Project+3", // Placeholder image
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
  async create(project: Project): Promise<ResultState<Project>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      // Generate a new unique ID for the project.
      const newId = `proj-${this.mockProjects.length + 1}-${Date.now()}`;
      const newProject: Project = { ...project, id: newId };

      this.mockProjects.push(newProject);
      // Return a deep copy of the newly created project
      return { type: "success", data: JSON.parse(JSON.stringify(newProject)) };
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to create project: ${error.message}`,
      };
    }
  }
  async update(project: Project): Promise<ResultState<Project>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const index = this.mockProjects.findIndex((p) => p.id === project.id);
      if (index !== -1) {
        // Update the existing project with new data.
        this.mockProjects[index] = { ...this.mockProjects[index], ...project };
        // Return a deep copy of the updated project
        return {
          type: "success",
          data: JSON.parse(JSON.stringify(this.mockProjects[index])),
        };
      } else {
        return {
          type: "error",
          message: `Project with ID ${project.id} not found for update.`,
        };
      }
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to update project: ${error.message}`,
      };
    }
  }
  async delete(id: string): Promise<ResultState<string>> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      const initialLength = this.mockProjects.length;
      this.mockProjects = this.mockProjects.filter((p) => p.id !== id);

      if (this.mockProjects.length < initialLength) {
        return { type: "success", data: id }; // Successfully deleted, return the ID
      } else {
        return {
          type: "error",
          message: `Project with ID ${id} not found for deletion.`,
        };
      }
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to delete project: ${error.message}`,
      };
    }
  }
}
