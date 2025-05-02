import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorInfo: null
    };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        console.error("Error caught by Error Boundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center text-red-500">
                    <h2>Something went wrong. Please try again later.</h2>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
