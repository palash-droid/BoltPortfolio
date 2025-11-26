import React from 'react';
import { Command } from './types';
import { projects } from '../data/portfolio';
import { cat } from './fileSystem';

export const projectsCmd: Command = {
    name: 'projects',
    description: 'List my projects',
    handler: () => {
        const content = (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                {projects.map((p) => (
                    <div key={p.title} className="border border-gray-800 p-3 rounded bg-gray-900/30 hover:bg-gray-900/50 transition-colors">
                        <div className="text-green-400 font-bold text-lg mb-1">{p.title}</div>
                        <div className="text-gray-400 text-sm mb-2 line-clamp-2">{p.description}</div>
                        <div className="flex flex-wrap gap-1 mb-2">
                            {p.technologies.slice(0, 3).map(tech => (
                                <span key={tech} className="text-xs text-blue-300 bg-blue-900/30 px-1.5 py-0.5 rounded">
                                    {tech}
                                </span>
                            ))}
                            {p.technologies.length > 3 && (
                                <span className="text-xs text-gray-500 px-1.5 py-0.5">+{p.technologies.length - 3}</span>
                            )}
                        </div>
                        <div className="text-gray-600 text-xs font-mono">
                            cmd: cat "{p.title}"
                        </div>
                    </div>
                ))}
            </div>
        );

        return [
            { type: 'info', content: 'My Projects:', className: 'text-blue-300 font-bold text-xl mb-2' },
            { type: 'component', content },
            { type: 'info', content: 'Tip: Run "cat <project-name>" to view full details and links.', className: 'text-gray-500 italic mt-2' }
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
