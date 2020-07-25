import React from 'react';
import './NotefulErrorBoundary.css';

class NotefulErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return (
            <h1>We're sorry. There seems to be a problem with this function ):</h1>
            )
        }
        return this.props.children;
    }
}

export default NotefulErrorBoundary;