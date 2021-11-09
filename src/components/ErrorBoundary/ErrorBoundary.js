import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorIndicator from '../ErrorIndicator';

export default class ErrorBoundary extends Component {
  state = {
    error: { hasError: false, message: '' },
  };

  componentDidCatch(error) {
    this.setState({ error: { hasError: true, message: error.message } });
  }

  render() {
    const {
      error: { hasError, message },
    } = this.state;

    return hasError ? <ErrorIndicator message={message} /> : this.props.children;
  }
}

ErrorBoundary.defaultProps = {
  children: null,
};

ErrorBoundary.propTypes = {
  children: PropTypes.element,
};
