import { Command } from './types';

export const clear: Command = {
    name: 'clear',
    description: 'Clear the terminal output',
    handler: () => [],
};

export const sudo: Command = {
    name: 'sudo',
    description: 'Execute a command as another user',
    handler: () => [{ type: 'error', content: 'Permission denied: You are not the admin.' }],
};

export const rm: Command = {
    name: 'rm',
    description: 'Remove files',
    handler: (args) => {
        if (args.includes('-rf') && (args.includes('/') || args.includes('*'))) {
            return [
                { type: 'warning', content: 'Deleting system files...' },
                { type: 'error', content: 'ACCESS DENIED. System integrity protection enabled.' },
                { type: 'info', content: 'Nice try though! 😉' }
            ];
        }
        return [{ type: 'error', content: 'rm: permission denied' }];
    },
};

export const whoami: Command = {
    name: 'whoami',
    description: 'Print the current user',
    handler: () => [{ type: 'text', content: 'guest', className: 'text-green-400' }],
};

export const matrix: Command = {
    name: 'matrix',
    description: 'Enter the matrix',
    handler: () => [{ type: 'text', content: 'Wake up, Neo...\nThe Matrix has you...', className: 'text-green-500 animate-pulse' }],
};

export const matrixrain: Command = {
    name: 'matrix-rain',
    description: 'Let it rain code',
    handler: () => [],
};

export const simple: Command = {
    name: 'simple',
    description: 'Switch to Simple (GUI) Mode',
    handler: () => [],
};

export const gui: Command = {
    name: 'gui',
    description: 'Alias for simple',
    handler: () => [],
};
