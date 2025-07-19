import React, { createContext, useContext, useState } from 'react';
import { BlogPost } from '../types';
import { loadBlogContent } from '../utils/blogLoader';

interface BlogContextType {
  selectedBlog: BlogPost | null;
  selectedBlogContent: string | null;
  isLoading: boolean;
  error: string | null;
  openBlog: (blog: BlogPost) => Promise<void>;
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
  const [selectedBlogContent, setSelectedBlogContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openBlog = async (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsLoading(true);
    setError(null);

    try {
      const content = await loadBlogContent(blog.slug);
      setSelectedBlogContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog content');
      console.error('Error loading blog content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    setSelectedBlogContent(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <BlogContext.Provider value={{
      selectedBlog,
      selectedBlogContent,
      isLoading,
      error,
      openBlog,
      closeBlog
    }}>
      {children}
    </BlogContext.Provider>
  );
};