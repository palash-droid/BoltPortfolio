export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveDemo?: string;
  code?: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  publishDate: string;
  readTime: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  verifyLink?: string;
}

export interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: string;
}