'use client';

import { Component, Fragment, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  retryKey: number;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, retryKey: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (typeof console !== 'undefined' && console.error) {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 text-red-400 mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400 text-sm mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              type="button"
              onClick={() =>
                this.setState((state) => ({
                  hasError: false,
                  error: undefined,
                  retryKey: state.retryKey + 1,
                }))
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/50 font-medium hover:bg-blue-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
            <p className="text-gray-500 text-xs mt-4">
              If the problem persists, please contact me via the links in the footer.
            </p>
          </div>
        </div>
      );
    }
    return <Fragment key={this.state.retryKey}>{this.props.children}</Fragment>;
  }
}
