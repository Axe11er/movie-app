import { Pagination } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Paginator.module.css';

export default function Paginator({ onChange, total, page }) {
  return (
    <Pagination
      className={s.paginator}
      current={page}
      onChange={onChange}
      defaultCurrent={1}
      total={total}
      defaultPageSize={20}
      showSizeChanger={false}
      responsive
    />
  );
}

Paginator.defaultProps = {
  onChange: () => {},
  total: 0,
  page: 1,
};

Paginator.propTypes = {
  onChange: PropTypes.func,
  total: PropTypes.number,
  page: PropTypes.number,
};
