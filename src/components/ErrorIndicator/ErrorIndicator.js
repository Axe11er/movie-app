import { Alert } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ErrorIndicator.module.css';

export default function ErrorIndicator({ message }) {
  return (
    <div className={s.error}>
      <Alert message={message} type="error" />
    </div>
  );
}

ErrorIndicator.defaultProps = {
  message: '',
};

ErrorIndicator.propTypes = {
  message: PropTypes.string,
};
