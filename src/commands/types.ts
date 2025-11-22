import { TerminalOutputItem } from '../contexts/TerminalContext';

export type CommandHandler = (args: string[], context: { currentPath: string; setCurrentPath: (path: string) => void }) => TerminalOutputItem[];

export interface Command {
    name: string;
    description: string;
    handler: CommandHandler;
}
