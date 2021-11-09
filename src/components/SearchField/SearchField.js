import { Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import s from './SearchField.module.css';

export default function SearchField({ onChange }) {
  return (
    <div className={s.search}>
      <Input
        placeholder="input search text"
        allowClear
        size="large"
        onChange={onChange}
        // value={keyword}
      />
    </div>
  );
}

SearchField.defaultProps = {
  onChange: () => {},
  //   keyword: '',
};

SearchField.propTypes = {
  onChange: PropTypes.func,
  //   keyword: PropTypes.string,
};
