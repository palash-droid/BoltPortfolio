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
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishDate: string;
  readTime: string;
  featured?: boolean;
  contentFile: string; // NEW: Path to markdown file
}

// NEW: Extended BlogPost with loaded content
export interface BlogPostWithContent extends BlogPost {
  content: string;
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
  icon: string; // Added icon property
  color?: string; // Optional color for the icon
}