# Portfolio Project & Blog Management Guide

This guide explains where to add new projects and blogs to your portfolio, including all file locations for images, content, and data.

## 📁 Adding New Projects

### 1. Project Data Configuration
**File:** `src/data/portfolio.ts`

Add your new project to the `projects` array:
```typescript
{
  id: '6', // Use next available ID
  title: 'Your Project Title',
  description: 'Project description here',
  image: '/project-images/your-project-image.jpg', // See image location below
  technologies: ['Technology1', 'Technology2'],
  liveDemo: 'https://your-demo-link.com',
  code: 'https://github.com/your-username/project-repo',
  featured: true // Set to true for featured projects
}
```

### 2. Project Image Location
**Directory:** `public/project-images/` (create this directory if it doesn't exist)

- Add your project screenshot/image here
- Recommended format: JPG or PNG
- Recommended size: 500x300 pixels or similar aspect ratio
- File naming: Use descriptive names like `customer-analytics-dashboard.jpg`

### 3. Live Demo Link
- Add your live demo URL in the `liveDemo` field in `portfolio.ts`
- Examples: Vercel, Netlify, GitHub Pages, or your own domain

### 4. Code Repository Link
- Add your GitHub/GitLab repository URL in the `code` field in `portfolio.ts`
- Make sure the repository is public or accessible

### 5. What I Learned Documentation
**Directory:** `public/learned-from-projects/`

Create a new markdown file following the naming convention:
- **File name:** `project-{id}.md` (e.g., `project-6.md`)
- **Content structure:**
  ```markdown
  # What I Learned: Your Project Name

  ## Technical Skills
  - **Skill 1**: Description of what you learned
  - **Skill 2**: Description of what you learned

  ## Tools & Technologies
  - **Tool 1**: How you used it and what you learned
  - **Tool 2**: How you used it and what you learned

  ## Challenges & Solutions
  - **Challenge 1**: How you solved it
  - **Challenge 2**: How you solved it

  ## Key Achievements
  - Specific metrics, improvements, or outcomes
  ```

## 📝 Adding New Blogs

### 1. Blog Data Configuration
**File:** `src/data/portfolio.ts`

Add your new blog to the `blogPosts` array:
```typescript
{
  id: '4', // Use next available ID
  slug: 'your-blog-slug',
  title: 'Your Blog Title',
  excerpt: 'Brief description of your blog post',
  image: './profile.jpg', // Or path to your blog image
  category: 'category-name',
  publishDate: '2024-01-20',
  readTime: '5 min read',
  featured: true,
  contentFile: 'your-blog-content.md' // See content location below
}
```

### 2. Blog Content Location
**Directory:** `public/blog-content/`

Create a new markdown file for your blog content:
- **File name:** Use descriptive names like `getting-started-data-science-python.md`
- **Content structure:**
  ```markdown
  # Your Blog Title

  Brief introduction paragraph...

  ## Section 1
  Your content here...

  ## Section 2
  More content...

  ## Conclusion
  Wrap up your blog post...
  ```

### 3. Blog Images
**Directory:** `public/blog-images/`

- Add blog-specific images here
- Reference them in your markdown content using relative paths
- Example: `![Alt text](./blog-images/your-image.jpg)`

## 📋 File Structure Summary

```
project/
├── src/
│   └── data/
│       └── portfolio.ts          # Main data file for projects & blogs
├── public/
│   ├── project-images/           # Project screenshots/images
│   ├── blog-content/             # Blog markdown files
│   ├── blog-images/              # Blog-specific images
│   └── learned-from-projects/    # "What I learned" markdown files
```

## 🔄 Update Process

### For New Projects:
1. Add project data to `src/data/portfolio.ts`
2. Add project image to `public/project-images/`
3. Create "What I learned" file in `public/learned-from-projects/`
4. Update live demo and code links in `portfolio.ts`

### For New Blogs:
1. Add blog data to `src/data/portfolio.ts`
2. Create blog content file in `public/blog-content/`
3. Add blog images to `public/blog-images/` (if needed)
4. Update the `contentFile` field to match your markdown filename

## 📝 Important Notes

- **Image Formats:** Use JPG or PNG for best compatibility
- **File Naming:** Use kebab-case for file names (e.g., `my-project-image.jpg`)
- **Content Structure:** Follow the existing patterns in the markdown files
- **Data Consistency:** Ensure IDs in `portfolio.ts` match your file names
- **Image Paths:** Use relative paths starting with `/` for public assets

## 🚀 Quick Start

1. **For a new project:**
   - Copy an existing project entry in `portfolio.ts` and modify it
   - Add your image to `public/project-images/`
   - Create `project-{id}.md` in `public/learned-from-projects/`

2. **For a new blog:**
   - Copy an existing blog entry in `portfolio.ts` and modify it
   - Create your markdown file in `public/blog-content/`
   - Add any images to `public/blog-images/`

This structure ensures your portfolio stays organized and easy to maintain!
