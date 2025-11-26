import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="text-red-500 p-2 border border-red-500 rounded my-2">
                    <h3 className="font-bold">Rendering Error</h3>
                    <p className="text-sm">{this.state.error?.message}</p>
                    <p className="text-xs text-gray-400 mt-1">Check console for details.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
