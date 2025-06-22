export interface SocialMedia {
  name: string;
  url: string;
  icon: string;
}
export interface Profile {
  id: string;
  name: string;
  headline: string;
  description: string;
  githubUrl: string;
  cvUrl: string;
  picture: string;
  socialMedias: SocialMedia[];
}
