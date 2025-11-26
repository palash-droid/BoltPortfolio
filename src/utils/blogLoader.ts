import { BlogPost, BlogPostWithContent } from '../types';
import { blogPosts } from '../data/portfolio';

export class BlogLoader {
    private static contentCache = new Map<string, string>();

    /**
     * Load markdown content from a file
     */
    static async loadBlogContent(contentFile: string): Promise<string> {
        // Check cache first
        if (this.contentCache.has(contentFile)) {
            return this.contentCache.get(contentFile)!;
        }

        try {
            const response = await fetch(`/blog-content/${contentFile}`);
            if (!response.ok) {
                throw new Error(`Failed to load blog content: ${response.statusText}`);
            }

            const content = await response.text();

            // Cache the content
            this.contentCache.set(contentFile, content);

            return content;
        } catch (error) {
            console.error(`Error loading blog content for ${contentFile}:`, error);
            return `# Error Loading Content\n\nSorry, we couldn't load the blog content. Please try again later.\n\n**Error Details:** ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
    }

    /**
     * Get a single blog post with its content loaded
     */
    static async getBlogPost(id: string): Promise<BlogPostWithContent | null> {
        const blogPost = blogPosts.find(post => post.id === id);
        if (!blogPost) {
            return null;
        }

        const content = await this.loadBlogContent(blogPost.contentFile);

        return {
            ...blogPost,
            content
        };
    }

    /**
     * Get all blog posts (metadata only)
     */
    static getBlogPosts(): BlogPost[] {
        return blogPosts;
    }

    /**
     * Get featured blog posts (metadata only)
     */
    static getFeaturedPosts(): BlogPost[] {
        return blogPosts.filter(post => post.featured);
    }

    /**
     * Get blog posts by category (metadata only)
     */
    static getPostsByCategory(category: string): BlogPost[] {
        return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
    }

    /**
     * Get all unique categories
     */
    static getCategories(): string[] {
        const categories = [...new Set(blogPosts.map(post => post.category))];
        return categories.sort();
    }

    /**
     * Search blog posts by title or excerpt (metadata only)
     */
    static searchPosts(query: string): BlogPost[] {
        const lowerQuery = query.toLowerCase();
        return blogPosts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.excerpt.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Clear the content cache (useful for development)
     */
    static clearCache(): void {
        this.contentCache.clear();
    }

    /**
     * Get cache status (for debugging)
     */
    static getCacheStatus(): { size: number; keys: string[] } {
        return {
            size: this.contentCache.size,
            keys: Array.from(this.contentCache.keys())
        };
    }
}

// Named exports for easier importing (used by BlogContext)
export const loadBlogContent = async (slug: string): Promise<string> => {
    // Find the blog post by slug (assuming slug is the same as id, or you have a slug field)
    const blogPost = blogPosts.find(post =>
        post.id === slug ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (post as any).slug === slug ||
        post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === slug
    );

    if (!blogPost) {
        throw new Error(`Blog post with slug "${slug}" not found`);
    }

    // Use the class method to load content
    return BlogLoader.loadBlogContent(blogPost.contentFile);
};

export const getBlogPost = async (id: string): Promise<BlogPostWithContent | null> => {
    return BlogLoader.getBlogPost(id);
};

export const getBlogPosts = (): BlogPost[] => {
    return BlogLoader.getBlogPosts();
};

export const getFeaturedPosts = (): BlogPost[] => {
    return BlogLoader.getFeaturedPosts();
};

export const getPostsByCategory = (category: string): BlogPost[] => {
    return BlogLoader.getPostsByCategory(category);
};

export const getCategories = (): string[] => {
    return BlogLoader.getCategories();
};

export const searchPosts = (query: string): BlogPost[] => {
    return BlogLoader.searchPosts(query);
};

export const clearCache = (): void => {
    return BlogLoader.clearCache();
};

export const getCacheStatus = (): { size: number; keys: string[] } => {
    return BlogLoader.getCacheStatus();
};

// Default export for backward compatibility
export default BlogLoader;