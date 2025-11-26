
import { ask } from './src/commands/chatbot';
import { TerminalOutputItem } from './src/contexts/TerminalContext';

const context = {
    currentPath: '~/',
    setCurrentPath: () => { },
    setInputOverride: () => { },
    triggerTransition: () => { }
};

try {
    console.log("Running ask projects...");
    const output = ask.handler(['projects'], context);
    console.log("Output:", JSON.stringify(output, null, 2));
} catch (e) {
    console.error("Error executing command:", e);
}
