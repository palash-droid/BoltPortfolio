import React from 'react';
import { Command } from './types';
import { projects } from '../data/portfolio';
import { useTerminal } from '../contexts/TerminalContext';
import { cat } from './fileSystem';

const ProjectList: React.FC = () => {
    const { setPendingCommand } = useTerminal();

    const handleProjectClick = (projectTitle: string) => {
        if (setPendingCommand) {
            setPendingCommand(`cat "${projectTitle}"`);
        }
    };

    return (
        <div className="flex flex-col gap-2 my-2">
            {projects.map((p) => (
                <div
                    key={p.title}
                    onClick={() => handleProjectClick(p.title)}
                    className="group cursor-pointer flex items-center gap-3 p-2 rounded hover:bg-gray-900/50 transition-colors border border-transparent hover:border-gray-800"
                >
                    <span className="text-green-500 group-hover:text-green-400">❯</span>
                    <div className="flex-1">
                        <div className="text-blue-300 group-hover:text-blue-200 font-bold text-lg">{p.title}</div>
                    </div>
                    <span className="text-gray-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                        [click to view]
                    </span>
                </div>
            ))}
        </div>
    );
};

export const projectsCmd: Command = {
    name: 'projects',
    description: 'List my projects',
    handler: () => {
        return [
            { type: 'info', content: 'My Projects:', className: 'text-blue-300 font-bold text-xl mb-2' },
            { type: 'component', content: <ProjectList /> },
            { type: 'info', content: 'Tip: Click on a project to view details.', className: 'text-gray-500 italic mt-2' }
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
