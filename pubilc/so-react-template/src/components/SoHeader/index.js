import React from 'react';
import './index.css';
import { title } from 'process';

export default function Header({
  dataSource = {
    title: 'So Drag UI',
  },
} = {}) {
  return <div className="so-header">{title}</div>;
}
