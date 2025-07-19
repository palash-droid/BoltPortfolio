import React, { createContext, useContext, useState } from 'react';
import { BlogPost } from '../types';

interface BlogContextType {
  selectedBlog: BlogPost | null;
  openBlog: (blog: BlogPost) => void;
  closeBlog: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const openBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
  };

  const closeBlog = () => {
    setSelectedBlog(null);
  };

  return (
    <BlogContext.Provider value={{ selectedBlog, openBlog, closeBlog }}>
      {children}
    </BlogContext.Provider>
  );
};