import Fuse from 'fuse.js';
import { skills, projects, contactInfo, certifications } from '../data/portfolio';

const portfolioData = {
    about: {
        name: 'Palash',
        title: 'Developer',
        description: 'I am a passionate developer building modern web applications.',
        email: contactInfo.email
    },
    skills,
    projects,
};

export interface ChatResponse {
    text: string;
    relatedCommand?: string;
    type?: 'text' | 'choice';
    topic?: 'about' | 'skills' | 'projects' | 'certifications' | 'blogs' | 'contact';
    choices?: { label: string; action: 'navigate' | 'view'; value: string }[];
    data?: any;
}

interface KnowledgeItem {
    question: string[];
    answer: string;
    relatedCommand?: string;
    keywords: string[];
    type?: 'text' | 'choice';
    topic?: 'about' | 'skills' | 'projects' | 'certifications' | 'blogs' | 'contact';
    choices?: { label: string; action: 'navigate' | 'view'; value: string }[];
}

export const getAboutDetails = () => {
    return `I'm ${portfolioData.about.name}, a ${portfolioData.about.title}.\n\n${portfolioData.about.description}`;
};

export const getSkillDetails = () => {
    return `Here are the technologies that i am well versed with:\n\n${portfolioData.skills.map(s => `• ${s.name} (${s.category})`).join('\n')}`;
};

export const getCertificationDetails = () => {
    return `Here are the Certifications i have cleared:\n\n${certifications.map(c => `• ${c.title}`).join('\n')}`;
};

export const getProjectDetails = () => {
    const projectList = portfolioData.projects.map(p =>
        `Title: ^^${p.title}^^\n**Description:** ${p.description}\n**Technologies:** ${p.technologies.join(', ')}\n**URL:** [Link](${p.code || p.liveDemo})`
    ).join('\n\n---\n\n');

    return `Here are some of my projects i have worked on:\n\n${projectList}\n\n{{VIEW_ALL_PROJECTS}}`;
};

export const getBlogDetails = () => {
    const blogs = [
        { title: 'Understanding React Hooks', url: '#' },
        { title: 'The Power of TypeScript', url: '#' },
        { title: 'Building Scalable Web Apps', url: '#' }
    ];
    return `Here are some of my Blogs feel free to read:\n\n${blogs.map(b => `• [${b.title}](${b.url})`).join('\n')}`;
};

export const getContactDetails = () => {
    return `You can reach me at:\n• Email: ${portfolioData.about.email}\n• Phone: ${contactInfo.phone}\n• Location: ${contactInfo.location}`;
};

// Transform portfolio data into a knowledge base
const createKnowledgeBase = (): KnowledgeItem[] => {
    const base: KnowledgeItem[] = [
        {
            question: ['what are the things in your portfolio', 'give me a brief idea about your portfolio', 'overview', 'summary', 'brief idea'],
            answer: "You can get the following information from my portfolio:\nRead **About Me** to know who I am,\nhave a look at my **Skills**,\nexplore the **Projects** I have built,\nor see what **Certifications** I own.\nYou can also read some of my **Blogs**.\nOr, if you want to reach out, **Contact Me**\ndrop a message and I will surely get back to you as soon as possible.",
            relatedCommand: 'help',
            keywords: ['portfolio', 'overview', 'idea', 'things', 'summary', 'brief']
        },
        {
            question: ['who are you', 'about you', 'introduction', 'tell me about yourself', 'what is your name', 'who is palash', 'about me', 'go to about me', 'navigate to about'],
            answer: "Here is a brief introduction about me.",
            relatedCommand: 'about',
            keywords: ['name', 'title', 'role', 'bio', 'who', 'about'],
            topic: 'about'
        },
        {
            question: ['skills', 'tech stack', 'technologies', 'what do you know', 'programming languages', 'what are your skills', 'experience'],
            answer: "Here are the technologies I work with.",
            relatedCommand: 'about',
            keywords: ['react', 'typescript', 'javascript', 'node', 'css', 'html', 'skill', 'skills', 'stack', 'tech'],
            topic: 'skills'
        },
        {
            question: ['projects', 'work', 'portfolio', 'what have you built', 'show me your code', 'my projects', 'recent work'],
            answer: "Here are some of the projects I've built.",
            relatedCommand: 'projects',
            keywords: ['project', 'projects', 'app', 'website', 'github', 'built', 'work'],
            topic: 'projects'
        },
        {
            question: ['certifications', 'achievements', 'certificates', 'awards', 'what are your certifications'],
            answer: "Here are my certifications and achievements.",
            relatedCommand: 'certifications',
            keywords: ['certification', 'certifications', 'achievement', 'achievements', 'award', 'awards', 'certificate'],
            topic: 'certifications'
        },
        {
            question: ['blogs', 'articles', 'posts', 'writing', 'read', 'blog'],
            answer: "Here are some of my recent blog posts.",
            relatedCommand: 'blogs',
            keywords: ['blog', 'blogs', 'article', 'articles', 'post', 'posts', 'write', 'writing'],
            topic: 'blogs'
        },
        {
            question: ['contact', 'email', 'socials', 'how to reach you', 'hire you', 'contact info', 'phone number', 'contact me'],
            answer: "Here is how you can reach me.",
            relatedCommand: 'contact-me',
            keywords: ['email', 'github', 'linkedin', 'twitter', 'phone', 'contact', 'reach', 'hire'],
            topic: 'contact'
        },
        {
            question: ['help', 'commands', 'what can you do', 'guide', 'features', 'how to use'],
            answer: "I can help you navigate! Try asking about:\n• Skills\n• Projects\n• Certifications\n• Contact Info\n\nOr type 'help' for a command list.",
            relatedCommand: 'help',
            keywords: ['help', 'support', 'assist', 'guide', 'command']
        },
        {
            question: ['experience', 'job', 'career', 'history', 'work history', 'previous jobs', 'how many years of experience', 'work experience'],
            answer: "Check out my 'about' section for my full professional background.",
            relatedCommand: 'about',
            keywords: ['job', 'work', 'company', 'career', 'experience']
        }
    ];

    // Add specific project queries dynamically
    portfolioData.projects.forEach(project => {
        base.push({
            question: [`tell me about ${project.title}`, `what is ${project.title}`, `${project.title} details`],
            answer: `**Title:** ${project.title}\n**Description:** ${project.description}\n**Technologies:** ${project.technologies.join(', ')}\n**URL:** [Link](${project.code || project.liveDemo})`,
            relatedCommand: 'projects',
            keywords: [project.title.toLowerCase(), ...project.technologies.map(t => t.toLowerCase())]
        });
    });

    return base;
};

const knowledgeBase = createKnowledgeBase();

const fuseOptions = {
    keys: [
        { name: 'keywords', weight: 0.6 },
        { name: 'question', weight: 0.4 }
    ],
    threshold: 0.6, // Increased for better typo tolerance
    includeScore: true,
    ignoreLocation: true
};

const fuse = new Fuse(knowledgeBase, fuseOptions);

// NLP Helper: Remove stopwords to focus on intent
const cleanQuery = (query: string): string => {
    const stopwords = ['what', 'is', 'the', 'a', 'an', 'do', 'you', 'have', 'can', 'tell', 'me', 'about', 'show', 'my', 'your', 'i', 'want', 'to', 'are', 'of'];
    return query
        .toLowerCase()
        .replace(/[?.,!]/g, '') // Remove punctuation
        .split(' ')
        .filter(word => !stopwords.includes(word))
        .join(' ');
};

export const processQuery = (query: string): ChatResponse => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        return { text: "I'm listening! Ask me anything about my portfolio." };
    }

    // 1. Try exact match on cleaned query (best for "skills", "projects")
    const cleaned = cleanQuery(trimmedQuery);

    // 2. Fuzzy search using Fuse.js
    const results = fuse.search(cleaned || trimmedQuery); // Fallback to original if cleaned is empty

    if (results.length > 0 && results[0].score! < 0.7) {
        const bestMatch = results[0].item;
        return {
            text: bestMatch.answer,
            relatedCommand: bestMatch.relatedCommand,
            type: bestMatch.type || 'text',
            topic: bestMatch.topic,
            choices: bestMatch.choices
        };
    }

    // Fallback for unknown queries
    return {
        text: "I'm not sure about that one. Try asking about my 'skills', 'projects', or 'contact' info!",
        relatedCommand: 'help'
    };
};
