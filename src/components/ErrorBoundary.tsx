import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <img 
                src="/paddy-losty.jpg" 
                alt="Paddy Losty" 
                className="w-20 h-20 rounded-full border-4 border-destructive shadow-lg object-cover mx-auto mb-4 grayscale"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-3xl font-celtic text-destructive mb-2">
                Ah, Something's Gone Wrong! 🍺
              </h1>
              <p className="text-muted-foreground mb-4">
                "Well, that's not supposed to happen!" - Paddy Losty
              </p>
            </div>
            
            <div className="bg-card border border-destructive rounded-lg p-4 mb-6 text-left">
              <h3 className="font-bold text-destructive mb-2">Error Details:</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {this.state.error?.message || 'Unknown error occurred'}
              </p>
              {this.state.errorInfo && (
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer hover:text-foreground">
                    Technical Details (Click to expand)
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-40">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🔄 Reload the Pub
              </button>
              <p className="text-sm text-muted-foreground">
                If the problem persists, try refreshing your browser or clearing your cache.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}