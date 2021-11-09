import { Alert } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ErrorIndicator.module.css';

export default function ErrorIndicator({ message, onClick }) {
  return (
    <div className={s.error} onClick={onClick}>
      <Alert message={message} type="error" />
    </div>
  );
}

ErrorIndicator.defaultProps = {
  message: '',
  onClick: () => {},
};

ErrorIndicator.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func,
};
