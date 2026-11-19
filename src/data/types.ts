export interface Profile {
  name: string;
  title: string;
  location: string;
  education: string;
  graduationYear: string;
  heroStatement: string;
  availability: string;
  email: string;
  phone: string;
  resumePath: string;
  photoPath: string;
  photoAlt: string;
}

export interface BootLine {
  command: string;
  output: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface ProjectDecision {
  decision: string;
  reason: string;
}

export interface Project {
  name: string;
  summary: string;
  role: string;
  stack: string[];
  problem: string;
  decisions: ProjectDecision[];
  outcome: string;
  repoUrl: string;
  demoUrl: string;
  screenshotPath: string;
  screenshotAlt: string;
}

export interface ExperienceItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  proofPath?: string;
  proofLabel?: string;
  externalUrl?: string;
}

export interface AchievementItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  proofPath?: string;
  proofLabel?: string;
  externalUrl?: string;
}

export interface VolunteeringItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  proofPath?: string;
  proofLabel?: string;
  externalUrl?: string;
}

export interface AboutContent {
  paragraphs: string[];
}

export interface SkillGroups {
  languages: string[];
  frontend: string[];
  backendAndData: string[];
  tools: string[];
}

export interface PortfolioContent {
  profile: Profile;
  bootLines: BootLine[];
  links: ExternalLink[];
  projects: Project[];
  experience: ExperienceItem[];
  achievements: AchievementItem[];
  volunteering: VolunteeringItem[];
  about: AboutContent;
  skills: SkillGroups;
}
