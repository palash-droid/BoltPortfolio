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

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Data Science in Python',
    excerpt: 'A comprehensive guide to beginning your journey in data science using Python and essential libraries.',
    content: `# Getting Started with Data Science in Python

Data science has become one of the most sought-after skills in today's technology-driven world. Python, with its rich ecosystem of libraries and tools, has emerged as the go-to language for data scientists worldwide.

## Why Python for Data Science?

Python offers several advantages for data science:

- **Easy to Learn**: Python's syntax is clean and readable
- **Rich Ecosystem**: Extensive libraries like Pandas, NumPy, and Scikit-learn
- **Community Support**: Large, active community providing resources and support
- **Versatility**: Can be used for web development, automation, and more

## Essential Libraries

### 1. NumPy
NumPy is the foundation of data science in Python, providing support for large, multi-dimensional arrays and matrices.

### 2. Pandas
Pandas offers data structures and operations for manipulating numerical tables and time series.

### 3. Matplotlib & Seaborn
These libraries provide powerful visualization capabilities for exploring and presenting data.

### 4. Scikit-learn
A machine learning library that provides simple and efficient tools for data mining and analysis.

## Getting Started

To begin your data science journey:

1. Install Python and essential libraries
2. Learn basic Python programming concepts
3. Practice with real datasets
4. Work on projects to build your portfolio

## Conclusion

Data science with Python opens up numerous opportunities in various industries. Start with the basics, practice regularly, and gradually work on more complex projects to build your expertise.`,
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'python',
    publishDate: '2024-01-15',
    readTime: '5 min read',
    featured: true
  },
  {
    id: '2',
    title: 'Advanced SQL Techniques for Data Analysis',
    excerpt: 'Explore advanced SQL techniques that will elevate your data analysis skills and improve query performance.',
    content: `# Advanced SQL Techniques for Data Analysis

SQL is the backbone of data analysis, and mastering advanced techniques can significantly improve your analytical capabilities and query performance.

## Window Functions

Window functions are powerful tools for performing calculations across a set of table rows that are somehow related to the current row.

### Common Window Functions:
- ROW_NUMBER()
- RANK()
- DENSE_RANK()
- LAG() and LEAD()

## Common Table Expressions (CTEs)

CTEs provide a way to write more readable and maintainable queries by breaking complex logic into simpler, named sub-queries.

## Advanced Joins

Understanding different types of joins and when to use them:
- INNER JOIN
- LEFT/RIGHT OUTER JOIN
- FULL OUTER JOIN
- CROSS JOIN
- SELF JOIN

## Performance Optimization

Tips for optimizing SQL queries:
- Use appropriate indexes
- Avoid SELECT *
- Use LIMIT when possible
- Optimize WHERE clauses

## Conclusion

Mastering these advanced SQL techniques will make you a more effective data analyst and help you extract deeper insights from your data.`,
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'sql',
    publishDate: '2024-01-10',
    readTime: '7 min read',
    featured: true
  },
  {
    id: '3',
    title: 'Building Interactive Dashboards with Power BI',
    excerpt: 'Learn how to create compelling and interactive dashboards using Microsoft Power BI for business intelligence.',
    content: `# Building Interactive Dashboards with Power BI

Microsoft Power BI is a powerful business intelligence tool that enables you to create interactive dashboards and reports from various data sources.

## Getting Started with Power BI

Power BI consists of several components:
- Power BI Desktop
- Power BI Service
- Power BI Mobile

## Data Connection and Preparation

Learn how to:
- Connect to various data sources
- Clean and transform data using Power Query
- Create relationships between tables

## Visualization Best Practices

Guidelines for creating effective visualizations:
- Choose the right chart type
- Use appropriate colors and formatting
- Keep it simple and focused
- Add interactivity with filters and slicers

## Advanced Features

Explore advanced Power BI capabilities:
- DAX (Data Analysis Expressions)
- Custom visuals
- Drill-through pages
- Bookmarks and navigation

## Sharing and Collaboration

Learn how to:
- Publish dashboards to Power BI Service
- Share with stakeholders
- Set up automatic data refresh

## Conclusion

Power BI empowers organizations to make data-driven decisions through interactive and insightful dashboards. Master these techniques to become proficient in business intelligence.`,
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'powerbi',
    publishDate: '2024-01-05',
    readTime: '6 min read'
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