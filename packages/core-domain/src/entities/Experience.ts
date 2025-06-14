export interface Experience {
  id: string;
  company: string;
  roleTitle: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  skills: string[];
}
