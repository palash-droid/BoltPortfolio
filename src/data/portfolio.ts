import { Project, BlogPost, Certification, Interest, Skill } from '../types';

export const skills: Skill[] = [
  { name: 'Python', category: 'Programming' },
  { name: 'SQL', category: 'Database' },
  { name: 'Power BI', category: 'Visualization' },
  { name: 'Pandas', category: 'Data Science' },
  { name: 'NumPy', category: 'Data Science' },
  { name: 'Matplotlib', category: 'Visualization' },
  { name: 'Seaborn', category: 'Visualization' },
  { name: 'Scikit-learn', category: 'Machine Learning' },
  { name: 'TensorFlow', category: 'Deep Learning' },
  { name: 'Tableau', category: 'Visualization' },
  { name: 'Excel', category: 'Analysis' },
  { name: 'R Programming', category: 'Programming' },
];

export const interests: Interest[] = [
  {
    id: '1',
    title: 'Cloud Computing',
    description: 'Exploring scalable cloud solutions and infrastructure on AWS, Azure, and GCP platforms.',
    icon: 'Cloud'
  },
  {
    id: '2',
    title: 'AI & Machine Learning',
    description: 'Developing intelligent systems and predictive models using cutting-edge ML algorithms.',
    icon: 'Brain'
  },
  {
    id: '3',
    title: 'Data Science',
    description: 'Extracting insights from complex datasets using statistical analysis and visualization.',
    icon: 'BarChart3'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Customer Analytics Dashboard',
    description: 'A comprehensive Power BI dashboard analyzing customer behavior patterns and sales trends.',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=500',
    technologies: ['Power BI', 'SQL', 'Python', 'Excel'],
    liveDemo: 'https://example.com/demo1',
    code: 'https://github.com/example/project1',
    featured: true
  },
  {
    id: '2',
    title: 'Predictive Sales Model',
    description: 'Machine learning model predicting sales performance using historical data and market trends.',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=500',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    liveDemo: 'https://example.com/demo2',
    code: 'https://github.com/example/project2',
    featured: true
  },
  {
    id: '3',
    title: 'Financial Risk Assessment Tool',
    description: 'Advanced analytics tool for assessing and visualizing financial risks across portfolios.',
    image: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=500',
    technologies: ['R', 'Tableau', 'SQL', 'Statistics'],
    liveDemo: 'https://example.com/demo3',
    code: 'https://github.com/example/project3',
    featured: true
  },
  {
    id: '4',
    title: 'Market Trend Analysis',
    description: 'Comprehensive analysis of market trends using time series forecasting and statistical modeling.',
    image: 'https://images.pexels.com/photos/7681104/pexels-photo-7681104.jpeg?auto=compress&cs=tinysrgb&w=500',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy'],
    liveDemo: 'https://example.com/demo4',
    code: 'https://github.com/example/project4'
  },
  {
    id: '5',
    title: 'Real-time Data Pipeline',
    description: 'Scalable data pipeline processing real-time analytics for business intelligence.',
    image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=500',
    technologies: ['Python', 'Apache Kafka', 'AWS', 'Docker'],
    liveDemo: 'https://example.com/demo5',
    code: 'https://github.com/example/project5'
  }
];

// UPDATED: Blog posts now reference markdown files instead of inline content
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-data-science-in-python',
    title: 'Getting Started with Data Science in Python',
    excerpt: 'A comprehensive guide to beginning your journey in data science using Python and essential libraries.',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'python',
    publishDate: '2024-01-15',
    readTime: '5 min read',
    featured: true,
    contentFile: 'getting-started-data-science-python.md' // NEW: Markdown file reference
  },
  {
    id: '2',
    slug: 'advanced-sql-techniques-for-data-analysis',
    title: 'Advanced SQL Techniques for Data Analysis',
    excerpt: 'Explore advanced SQL techniques that will elevate your data analysis skills and improve query performance.',
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'sql',
    publishDate: '2024-01-10',
    readTime: '7 min read',
    featured: true,
    contentFile: 'advanced-sql-techniques.md' // NEW: Markdown file reference
  },
  {
    id: '3',
    slug: 'building-interactive-dashboards-with-power-bi',
    title: 'Building Interactive Dashboards with Power BI',
    excerpt: 'Learn how to create compelling and interactive dashboards using Microsoft Power BI for business intelligence.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'powerbi',
    publishDate: '2024-01-05',
    readTime: '6 min read',
    featured: true,
    contentFile: 'building-interactive-dashboards-powerbi.md' // NEW: Markdown file reference
  }
];

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: '2024-01-01',
    verifyLink: 'https://aws.amazon.com/verification'
  },
  {
    id: '2',
    title: 'Google Data Analytics Professional',
    issuer: 'Google',
    issueDate: '2023-11-15',
    verifyLink: 'https://coursera.org/verify/professional-cert'
  },
  {
    id: '3',
    title: 'Microsoft Power BI Data Analyst',
    issuer: 'Microsoft',
    issueDate: '2023-09-20',
    verifyLink: 'https://learn.microsoft.com/credentials'
  }
];

export const contactInfo = {
  email: 'palash@example.com',
  phone: '+91 7045011986',
  location: 'Mumbai, India, IND'
};