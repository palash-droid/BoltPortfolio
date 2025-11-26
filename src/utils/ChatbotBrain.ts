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
    choices?: { label: string; action: 'navigate' | 'view'; value: string }[];
    data?: any;
}

// Define the knowledge base structure
interface KnowledgeItem {
    question: string[];
    answer: string;
    relatedCommand?: string;
    keywords: string[];
    type?: 'text' | 'choice';
    choices?: { label: string; action: 'navigate' | 'view'; value: string }[];
}

// Transform portfolio data into a knowledge base
const createKnowledgeBase = (): KnowledgeItem[] => {
    const base: KnowledgeItem[] = [
        {
            question: ['who are you', 'about you', 'introduction', 'tell me about yourself', 'what is your name', 'who is palash'],
            answer: `I'm ${portfolioData.about.name}, a ${portfolioData.about.title}.\n\n${portfolioData.about.description}`,
            relatedCommand: 'about',
            keywords: ['name', 'title', 'role', 'bio', 'who', 'about']
        },
        {
            question: ['skills', 'tech stack', 'technologies', 'what do you know', 'programming languages', 'what are your skills', 'experience'],
            answer: `I work with the following technologies:\n\n${portfolioData.skills.map(s => `• ${s.name}`).join('\n')}`,
            relatedCommand: 'about',
            keywords: ['react', 'typescript', 'javascript', 'node', 'css', 'html', 'skill', 'skills', 'stack', 'tech']
        },
        {
            question: ['projects', 'work', 'portfolio', 'what have you built', 'show me your code', 'my projects', 'recent work'],
            answer: "Would you like to navigate to the Projects section, or view the details here?",
            relatedCommand: 'projects',
            keywords: ['project', 'projects', 'app', 'website', 'github', 'built', 'work'],
            type: 'choice',
            choices: [
                { label: 'Go to Projects', action: 'navigate', value: 'projects' },
                { label: 'View Details', action: 'view', value: 'projects' }
            ]
        },
        {
            question: ['contact', 'email', 'socials', 'how to reach you', 'hire you', 'contact info', 'phone number'],
            answer: "Would you like to navigate to the Contact section, or view the details here?",
            relatedCommand: 'contact-me',
            keywords: ['email', 'github', 'linkedin', 'twitter', 'phone', 'contact', 'reach', 'hire'],
            type: 'choice',
            choices: [
                { label: 'Go to Contact', action: 'navigate', value: 'contact' },
                { label: 'View Details', action: 'view', value: 'contact' }
            ]
        },
        {
            question: ['help', 'commands', 'what can you do', 'guide', 'features', 'how to use'],
            answer: "I can help you navigate! Try asking about:\n• Skills\n• Projects\n• Contact Info\n\nOr type 'help' for a command list.",
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
            answer: `${project.title}:\n${project.description}\n\nTech Stack:\n${project.technologies.map(t => `• ${t}`).join('\n')}`,
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
            choices: bestMatch.choices
        };
    }

    // Fallback for unknown queries
    return {
        text: "I'm not sure about that one. Try asking about my 'skills', 'projects', or 'contact' info!",
        relatedCommand: 'help'
    };
};

export const getProjectDetails = () => {
    return portfolioData.projects.map(p =>
        `Title: ${p.title}\nTechnologies: ${p.technologies.join(', ')}\nDescription: ${p.description}\nLink: ${p.code || p.liveDemo}`
    ).join('\n\n---\n\n');
};

export const getContactDetails = () => {
    return `You can reach me at:\n• Email: ${portfolioData.about.email}\n• Phone: ${contactInfo.phone}\n• Location: ${contactInfo.location}`;
};
