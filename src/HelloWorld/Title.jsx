import React from 'react';
import Test from './Test';
export default function Title(props) {
  const { name } = props;
  return <h1><Test name={name} /></h1>
}
