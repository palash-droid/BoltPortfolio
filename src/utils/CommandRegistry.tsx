import React from 'react';
import { TerminalOutputItem } from '../contexts/TerminalContext';
import { Command } from '../commands/types';
import * as fileSystem from '../commands/fileSystem';
import * as portfolio from '../commands/portfolio';
import * as system from '../commands/system';

export const commands: Record<string, Command> = {
    help: {
        name: 'help',
        description: 'List available commands',
        handler: () => {
            return [
                {
                    type: 'component',
                    content: (
                        <div className="flex flex-col gap-1">
                            {Object.values(commands).map((cmd) => (
                                <div key={cmd.name} className="grid grid-cols-[140px_1fr] gap-2 sm:grid-cols-[180px_1fr]">
                                    <span className="text-yellow-300">{cmd.name}</span>
                                    <span className="text-blue-300">{cmd.description}</span>
                                </div>
                            ))}
                        </div>
                    ),
                },
                { type: 'info', content: '\nTip: Try running "about" to learn more about me.', className: 'text-gray-400 italic' }
            ];
        },
    },
    // Primary Commands
    about: portfolio.about,
    projects: portfolio.projectsCmd,
    'contact-me': portfolio.contact,
    'contact-me-gui': portfolio.contactMeGui,

    // System/Mode Commands
    clear: system.clear,
    simple: system.simple,
    gui: system.gui,

    // File System
    cat: fileSystem.cat,
    cd: fileSystem.cd,
    ls: fileSystem.ls,

    // Fun / Extras
    matrix: system.matrix,
    'matrix-rain': system.matrixrain,
    rm: system.rm,
    sudo: system.sudo,
    whoami: system.whoami,
};

export const executeCommand = (
    input: string,
    context: { currentPath: string; setCurrentPath: (path: string) => void }
): { output: TerminalOutputItem[]; action?: 'clear' | 'switch_mode' | 'rain' | 'matrix_transition' | 'switch_mode_contact' } => {
    const [cmdName, ...args] = input.trim().split(/\s+/);

    if (!cmdName) return { output: [] };

    const command = commands[cmdName.toLowerCase()];

    if (!command) {
        return {
            output: [{ type: 'error', content: `Command not found: ${cmdName}. Type "help" for available commands.` }],
        };
    }

    if (cmdName.toLowerCase() === 'clear') {
        return { output: [], action: 'clear' };
    }

    if (cmdName.toLowerCase() === 'simple' || cmdName.toLowerCase() === 'gui') {
        return { output: [], action: 'matrix_transition' };
    }

    if (cmdName.toLowerCase() === 'contact-me-gui') {
        return { output: [], action: 'switch_mode_contact' };
    }

    if (cmdName.toLowerCase() === 'matrix-rain') {
        return { output: [], action: 'rain' };
    }

    return { output: command.handler(args, context) };
};
