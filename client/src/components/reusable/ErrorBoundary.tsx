import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};
type ErrorState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, ErrorState> {
  state = { hasError: false };

  static getDerivedStateFromError(): ErrorState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
