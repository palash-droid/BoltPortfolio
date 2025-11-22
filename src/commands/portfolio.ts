import { Command } from './types';
import { projects } from '../data/portfolio';
import { cat } from './fileSystem';

export const projectsCmd: Command = {
    name: 'projects',
    description: 'List my projects',
    handler: () => {
        const projectList = projects.map(p => {
            const filename = `${p.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
            return `${filename.padEnd(40)} - ${p.title}`;
        }).join('\n');
        return [
            { type: 'info', content: 'My Projects:', className: 'text-blue-300 font-bold' },
            { type: 'text', content: projectList, className: 'text-gray-300' },
            { type: 'warning', content: '\nUse "cat <filename>" or "cat <project-title>" to see details.', className: 'text-yellow-400' },
            { type: 'info', content: 'Tip: Interested? Run "contact" or "contact-me-gui" to get in touch.', className: 'text-blue-300 italic' }
        ];
    },
};

export const about: Command = {
    name: 'about',
    description: 'Display information about me',
    handler: () => {
        const output = cat.handler(['about.txt'], { currentPath: '~/', setCurrentPath: () => { } });
        return [
            ...output,
            { type: 'info', content: '\nTip: Check out my work by running "projects".', className: 'text-blue-300 italic' }
        ];
    },
};

export const contact: Command = {
    name: 'contact-me',
    description: 'Show contact information',
    handler: () => {
        const output = cat.handler(['contact.txt'], { currentPath: '~/', setCurrentPath: () => { } });
        return [
            ...output,
            { type: 'info', content: '\nTip: Want to see the full site? Run "simple" or "contact-me-gui".', className: 'text-blue-300 italic' }
        ];
    },
};

export const contactMeGui: Command = {
    name: 'contact-me-gui',
    description: 'Go to contact section in GUI',
    handler: () => [],
};
