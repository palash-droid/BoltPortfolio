import { Command } from './types';
import { processQuery } from '../utils/ChatbotBrain';
import { TerminalOutputItem } from '../contexts/TerminalContext';

export const ask: Command = {
    name: 'ask',
    description: 'Ask the AI assistant a question',
    handler: (args) => {
        const query = args.join(' ');
        if (!query) {
            return [
                { type: 'error', content: 'Usage: ask <question>' },
                { type: 'info', content: 'Example: ask what are your skills?' }
            ];
        }

        const response = processQuery(query);

        const output: TerminalOutputItem[] = [
            { type: 'info', content: `🤖 ${response.text}`, className: 'text-green-400 font-bold' }
        ];

        if (response.relatedCommand) {
            output.push({
                type: 'info',
                content: `Tip: Run "${response.relatedCommand}" for more details.`,
                className: 'text-gray-500 italic text-sm'
            });
        }

        return output;
    },
};
