import React from 'react';
import './index.css';

export default function Header({ dataSource: { title } }) {

  return <div className="so-header">{title}</div>;
}
