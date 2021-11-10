import { Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import s from './SearchField.module.css';

export default function SearchField({ keyword, onChange, setKeyword }) {
  return (
    <div className={s.search}>
      <Input
        placeholder="input search text"
        allowClear
        size="large"
        onChange={(e) => {
          setKeyword(e.target.value);
          onChange(e.target.value);
        }}
        value={keyword}
      />
    </div>
  );
}

SearchField.defaultProps = {
  onChange: () => {},
  setKeyword: () => {},
  keyword: '',
};

SearchField.propTypes = {
  onChange: PropTypes.func,
  setKeyword: PropTypes.func,
  keyword: PropTypes.string,
};
