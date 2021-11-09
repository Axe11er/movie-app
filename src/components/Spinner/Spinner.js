import React from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import s from './Spinner.module.css';

export default function Spinner() {
   return <Spin className={s.spinner} size="large" />;
}
