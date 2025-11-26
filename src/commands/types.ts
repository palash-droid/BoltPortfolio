import { TerminalOutputItem } from '../contexts/TerminalContext';

export type CommandHandler = (args: string[], context: {
    currentPath: string;
    setCurrentPath: (path: string) => void;
    setInputOverride?: (handler: ((input: string, addOutput: (item: TerminalOutputItem) => void) => void) | null) => void;
    triggerTransition?: (action: 'simple' | 'contact' | 'projects' | 'rain' | 'navigate_projects' | 'navigate_contact') => void;
}) => TerminalOutputItem[];

export interface Command {
    name: string;
    description: string;
    handler: CommandHandler;
}
