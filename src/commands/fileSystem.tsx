import { Command } from './types';
import { projects, skills, contactInfo, interests } from '../data/portfolio';

// Helper to resolve path
const resolvePath = (currentPath: string, target: string): string => {
    if (target === '~') return '~/';
    if (target === '..') {
        if (currentPath === '~/') return '~/';
        const parts = currentPath.split('/');
        parts.pop();
        const joined = parts.join('/');
        return joined === '~' ? '~/' : (joined || '~/');
    }
    if (target.startsWith('~/')) return target;
    return `${currentPath === '~/' ? '~' : currentPath}/${target}`;
};

export const ls: Command = {
    name: 'ls',
    description: 'List directory contents',
    handler: (_args, { currentPath }) => {
        let contents: { name: string; isDir: boolean }[] = [];

        if (currentPath === '~/' || currentPath === '~') {
            contents = [
                { name: 'projects/', isDir: true },
                { name: 'skills/', isDir: true },
                { name: 'interests/', isDir: true },
                { name: 'about.txt', isDir: false },
                { name: 'contact.txt', isDir: false }
            ];
        } else if (currentPath === '~/projects') {
            contents = projects.map(p => ({ name: `${p.title.replace(/\s+/g, '-').toLowerCase()}.txt`, isDir: false }));
        } else if (currentPath === '~/skills') {
            contents = skills.map(s => ({ name: `${s.name.replace(/\s+/g, '-').toLowerCase()}`, isDir: false }));
        } else if (currentPath === '~/interests') {
            contents = interests.map(i => ({ name: `${i.title.replace(/\s+/g, '-').toLowerCase()}.txt`, isDir: false }));
        }

        if (contents.length === 0) {
            return [{ type: 'text', content: '(empty)', className: 'text-gray-500' }];
        }

        // Format output with colors
        const formattedContent = (
            <div className="flex flex-wrap gap-4">
                {contents.map((item, idx) => (
                    <span key={idx} className={item.isDir ? 'text-blue-400 font-bold' : 'text-gray-300'}>
                        {item.name}
                    </span>
                ))}
            </div>
        );

        return [{ type: 'component', content: formattedContent }];
    },
};

export const cd: Command = {
    name: 'cd',
    description: 'Change directory',
    handler: (args, { currentPath, setCurrentPath }) => {
        const target = args[0];
        if (!target) return [{ type: 'text', content: currentPath, className: 'text-blue-400' }];

        const newPath = resolvePath(currentPath, target);

        // Validate path
        if (
            newPath === '~/' ||
            newPath === '~/projects' ||
            newPath === '~/skills' ||
            newPath === '~/interests'
        ) {
            setCurrentPath(newPath);
            // Auto-list contents
            return ls.handler([], { currentPath: newPath, setCurrentPath });
        }

        return [{ type: 'error', content: `cd: no such file or directory: ${target}` }];
    },
};

export const cat: Command = {
    name: 'cat',
    description: 'View file content',
    handler: (args, { currentPath }) => {
        const target = args.join(' '); // Join arguments to handle spaces
        if (!target) return [{ type: 'error', content: 'usage: cat <file>' }];

        // Handle root files
        if (currentPath === '~/' || currentPath === '~') {
            if (target === 'about.txt') {
                return [
                    {
                        type: 'text',
                        content: `Hi, I'm a Data Analyst and Developer based in ${contactInfo.location}.
I specialize in transforming complex data into actionable insights and building robust applications.
Passionate about Cloud Computing, AI/ML, and Data Science.`,
                    },
                ];
            }
            if (target === 'contact.txt') {
                return [
                    {
                        type: 'text',
                        content: `Email: ${contactInfo.email}\nPhone: ${contactInfo.phone}\nLocation: ${contactInfo.location}`,
                    },
                ];
            }
        }

        // Handle projects
        if (currentPath === '~/projects' || currentPath === '~/' || currentPath === '~') {
            const normalizedTarget = target.toLowerCase();
            const project = projects.find(p => {
                const title = p.title.toLowerCase();
                const filename = title.replace(/\s+/g, '-');
                const filenameWithExt = `${filename}.txt`;

                return (
                    normalizedTarget === title ||
                    normalizedTarget === filename ||
                    normalizedTarget === filenameWithExt
                );
            });

            if (project) {
                const content = (
                    <div className="flex flex-col gap-2">
                        <div className="text-blue-400 font-bold text-lg">{project.title}</div>
                        <div className="text-gray-300"><span className="text-green-400 font-bold">Technologies:</span> {project.technologies.join(', ')}</div>
                        <div className="text-gray-300">{project.description}</div>
                        <div>
                            <span className="text-green-400 font-bold">Link: </span>
                            <a
                                href={project.liveDemo || project.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 underline hover:text-cyan-300"
                            >
                                {project.liveDemo || project.code}
                            </a>
                        </div>
                    </div>
                );
                return [{ type: 'component', content }];
            }
        }

        // Handle interests
        if (currentPath === '~/interests') {
            const interest = interests.find(i => `${i.title.replace(/\s+/g, '-').toLowerCase()}.txt` === target);
            if (interest) {
                return [{
                    type: 'text',
                    content: `Title: ${interest.title}
Description: ${interest.description}`
                }];
            }
        }

        return [{ type: 'error', content: `cat: ${target}: No such file or directory` }];
    },
};
