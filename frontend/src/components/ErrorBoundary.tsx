import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const fallbackStyle: React.CSSProperties = {
  border: '1px solid rgba(220, 38, 38, 0.28)',
  borderRadius: 12,
  background: 'rgba(254, 242, 242, 0.96)',
  color: '#7f1d1d',
  padding: '1rem',
};

const fallbackTitleStyle: React.CSSProperties = {
  margin: '0 0 0.35rem',
  fontSize: '1rem',
  fontWeight: 700,
};

const fallbackMessageStyle: React.CSSProperties = {
  margin: 0,
  color: '#991b1b',
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Dashboard render error boundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section role="alert" style={fallbackStyle}>
          <h3 style={fallbackTitleStyle}>
            {this.props.fallbackTitle ?? 'This section could not be displayed'}
          </h3>
          <p style={fallbackMessageStyle}>
            {this.props.fallbackMessage ??
              'The rest of the dashboard is still available. Refresh the page or try again shortly.'}
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
