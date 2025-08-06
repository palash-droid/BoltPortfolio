# Multi-Resume Feature Documentation

## Overview
The portfolio now supports multiple resumes for different job roles, allowing users to view and download specific resumes tailored to different positions.

## Features

### 1. Tabbed Resume Interface
- **Multiple Resume Tabs**: Users can switch between different resume versions
- **Role-Specific Resumes**: Each resume is tailored for a specific job role
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

### 2. Resume Categories
Currently supports 4 different resume types:
- **Data Analyst Resume**: Focuses on data analysis, SQL, and business intelligence
- **Data Scientist Resume**: Emphasizes machine learning, Python, and statistical analysis
- **Business Intelligence Resume**: Highlights Power BI, Tableau, and dashboard development
- **Full Stack Developer Resume**: Covers web development, databases, and cloud technologies

### 3. User Experience Features
- **Preview Mode**: View resumes directly in the modal
- **Download Functionality**: Download specific resumes with proper filenames
- **Open in Browser**: View resumes in a new tab for better experience
- **Mobile Optimization**: Special fallback view for mobile devices
- **Last Updated Dates**: Shows when each resume was last modified

## Technical Implementation

### Data Structure
```typescript
interface Resume {
  id: string;
  title: string;
  role: string;
  description: string;
  filePath: string;
  fileName: string;
  lastUpdated: string;
  featured?: boolean;
}
```

### File Organization
- Resume PDFs are stored in the `public/` directory
- Each resume has a descriptive filename (e.g., `resume-data-analyst.pdf`)
- Download filenames are user-friendly (e.g., `Palash_Bhagwatkar_Data_Analyst_Resume.pdf`)

### Mobile Compatibility
- **Responsive Tabs**: Horizontal scrolling tabs that work on mobile
- **Touch-Friendly**: Large touch targets for mobile interaction
- **Fallback View**: Special mobile-optimized view when iframe doesn't load
- **Adaptive Layout**: Different layouts for mobile vs desktop

## Adding New Resumes

### 1. Add Resume Data
Edit `src/data/portfolio.ts` and add a new resume object to the `resumes` array:

```typescript
{
  id: '5',
  title: 'New Role Resume',
  role: 'New Role',
  description: 'Description of this resume focus.',
  filePath: '/resume-new-role.pdf',
  fileName: 'Palash_Bhagwatkar_New_Role_Resume.pdf',
  lastUpdated: '2024-01-20',
  featured: false
}
```

### 2. Add PDF File
Place the corresponding PDF file in the `public/` directory with the same name as specified in `filePath`.

### 3. Update Types (if needed)
If you need to add new properties to the Resume interface, update `src/types/index.ts`.

## Customization

### Styling
- The modal uses Tailwind CSS classes for styling
- Dark mode support is included
- Custom animations using Framer Motion

### Content
- Resume descriptions can be customized in the data file
- Update dates and roles as needed
- Featured resumes appear first in the tab order

## Browser Compatibility
- **Desktop**: Full iframe PDF viewer with download/open options
- **Mobile**: Optimized fallback view with direct download/open buttons
- **PDF Support**: Graceful fallback for browsers without PDF support

## Performance Considerations
- PDFs are loaded on-demand when tabs are selected
- Mobile fallback prevents slow loading issues
- Responsive design ensures smooth performance across devices

## Future Enhancements
- Resume version history
- Custom resume templates
- Resume analytics (download tracking)
- Integration with job application tracking 