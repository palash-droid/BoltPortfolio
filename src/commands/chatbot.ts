import { Command } from './types';
import { processQuery, getProjectDetails, getContactDetails } from '../utils/ChatbotBrain';
import { TerminalOutputItem } from '../contexts/TerminalContext';

export const ask: Command = {
    name: 'ask',
    description: 'Ask the AI assistant a question',
    handler: (args, context) => {
        const query = args.join(' ');
        if (!query) {
            return [{ type: 'info', content: "I'm listening! Ask me anything." }];
        }

        const response = processQuery(query);

        // Handle interactive choices (Disambiguation)
        if (response.type === 'choice' && response.choices && Array.isArray(response.choices)) {
            const output: TerminalOutputItem[] = [
                { type: 'info', content: `🤖 ${response.text}`, className: 'text-green-400 font-bold' }
            ];

            response.choices.forEach((choice: { label: string; action: 'navigate' | 'view'; value: string }, index: number) => {
                output.push({
                    type: 'info',
                    content: `${index + 1}. ${choice.label}`,
                    className: 'pl-4 text-gray-300'
                });
            });

            output.push({ type: 'info', content: "Type '1' or '2' to select:", className: 'text-gray-500 italic text-sm mt-2' });

            // Set up the input override for the next user interaction
            if (context.setInputOverride) {
                // Capture triggerTransition in closure so it's available inside the callback
                const triggerTransition = context.triggerTransition;

                // Create named function for better reliability across browsers (especially mobile)
                const handleChoiceInput = (input: string, addOutput: (item: TerminalOutputItem) => void) => {
                    const choiceIndex = parseInt(input) - 1;
                    const choice = response.choices?.[choiceIndex];

                    if (choice) {
                        if (choice.action === 'navigate') {
                            addOutput({ type: 'success', content: `Navigating to ${choice.label}...` });
                            triggerTransition?.(choice.value === 'projects' ? 'projects' : 'contact');
                        } else if (choice.action === 'view') {
                            let details = '';
                            if (choice.value === 'projects') {
                                details = getProjectDetails();
                            } else if (choice.value === 'contact') {
                                details = getContactDetails();
                            }
                            addOutput({ type: 'info', content: details, className: 'whitespace-pre-wrap text-gray-300' });
                        }
                    } else {
                        addOutput({ type: 'error', content: "Invalid choice. Please try asking again." });
                    }
                };

                // Wrap in arrow function so React doesn't treat it as a state updater
                context.setInputOverride(() => handleChoiceInput);
                console.log('[CHATBOT] inputOverride SET');
            }

            return output;
        }

        // Standard text response
        const output: TerminalOutputItem[] = [
            { type: 'info', content: `🤖 ${response.text}`, className: 'text-green-400 font-bold' }
        ];

        if (response.relatedCommand) {
            output.push({
                type: 'info',
                content: `Tip: Run \"${response.relatedCommand}\" for more details.`,
                className: 'text-gray-500 italic text-sm'
            });
        }

        return output;
    },
};
