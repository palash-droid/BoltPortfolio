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
    certifications
};

export interface ChatResponse {
    text: string;
    relatedCommand?: string;
}

// Define the knowledge base structure
interface KnowledgeItem {
    question: string[];
    answer: string;
    relatedCommand?: string;
    keywords: string[];
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
            answer: `I've built several projects including:\n\n${portfolioData.projects.map(p => `• ${p.title}`).join('\n')}\n\nRun 'projects' to see details!`,
            relatedCommand: 'projects',
            keywords: ['project', 'projects', 'app', 'website', 'github', 'built', 'work']
        },
        {
            question: ['contact', 'email', 'socials', 'how to reach you', 'hire you', 'contact info', 'phone number'],
            answer: `You can reach me at:\n• Email: ${portfolioData.about.email}\n• GitHub/LinkedIn: Check the contact section!`,
            relatedCommand: 'contact-me',
            keywords: ['email', 'github', 'linkedin', 'twitter', 'phone', 'contact', 'reach', 'hire']
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
            relatedCommand: bestMatch.relatedCommand
        };
    }

    // Fallback for unknown queries
    return {
        text: "I'm not sure about that one. Try asking about my 'skills', 'projects', or 'contact' info!",
        relatedCommand: 'help'
    };
};
