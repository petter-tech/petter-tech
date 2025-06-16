import { Experience } from "@repo/core-domain/entities/Experience";
import { ResultState } from "@repo/core-domain/entities/ResultState";
import { IExperienceAdminRepository } from "@repo/core-domain/repositories/admin/IExperienceAdminRepository";

export class ExperienceAdminRepository implements IExperienceAdminRepository {
  constructor(private cookies: string) {}

  private mockExperiences: Experience[] = [
    {
      id: "exp-1",
      company: "Tech Solutions Inc.",
      roleTitle: "Senior Full-Stack Developer",
      startDate: new Date("2021-01-15"),
      endDate: new Date("2024-03-01"),
      description:
        "Led development of scalable web applications using React, Node.js, and AWS. Mentored junior developers and contributed to architectural decisions for key projects.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "SQL", "REST APIs"],
    },
    {
      id: "exp-2",
      company: "Innovate Web Studio",
      roleTitle: "Software Developer",
      startDate: new Date("2018-06-01"),
      endDate: new Date("2020-12-31"),
      description:
        "Developed and maintained client websites and web applications. Collaborated with design teams to translate UI/UX wireframes into responsive web interfaces.",
      skills: ["JavaScript", "HTML", "CSS", "jQuery", "PHP", "MySQL"],
    },
    {
      id: "exp-3",
      company: "Freelance Consultant",
      roleTitle: "Web Development Consultant",
      startDate: new Date("2024-04-01"),
      description:
        "Provide expert consulting services for small businesses, building custom web solutions and optimizing existing digital presences. Specializing in modern frontend frameworks and backend integration.",
      skills: [
        "Next.js",
        "Firebase",
        "Tailwind CSS",
        "Consulting",
        "Project Management",
      ],
    },
  ];

  async fetch(): Promise<ResultState<Experience[]>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      return {
        type: "success",
        data: JSON.parse(JSON.stringify(this.mockExperiences)),
      };
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to fetch experiences: ${error.message}`,
      };
    }
  }
  async create(experience: Experience): Promise<ResultState<Experience>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const newId = `exp-${this.mockExperiences.length + 1}-${Date.now()}`;
      const newExperience: Experience = { ...experience, id: newId };

      this.mockExperiences.push(newExperience);
      return {
        type: "success",
        data: newExperience,
      };
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to create experience: ${error.message}`,
      };
    }
  }
  async update(experience: Experience): Promise<ResultState<Experience>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const index = this.mockExperiences.findIndex(
        (exp) => exp.id === experience.id
      );
      if (index !== -1) {
        // Update the existing experience with new data.
        this.mockExperiences[index] = {
          ...this.mockExperiences[index],
          ...experience,
        };
        // Return a deep copy of the updated experience
        return {
          type: "success",
          data: JSON.parse(JSON.stringify(this.mockExperiences[index])),
        };
      } else {
        return {
          type: "error",
          message: `Experience with ID ${experience.id} not found for update.`,
        };
      }
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to update experience: ${error.message}`,
      };
    }
  }
  async delete(id: string): Promise<ResultState<string>> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      const initialLength = this.mockExperiences.length;
      this.mockExperiences = this.mockExperiences.filter(
        (exp) => exp.id !== id
      );

      if (this.mockExperiences.length < initialLength) {
        return { type: "success", data: id };
      } else {
        return {
          type: "error",
          message: `Experience with ID ${id} not found for deletion.`,
        };
      }
    } catch (error: any) {
      return {
        type: "error",
        message: `Failed to delete experience: ${error.message}`,
      };
    }
  }
}
