export interface Project {
  id: string;
  image: string;
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
}
