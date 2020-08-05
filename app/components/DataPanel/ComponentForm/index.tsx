import React, { useContext } from 'react';
import { Context } from '../../../containers/MainPage';

export default function ComponentForm() {
  // const MainContext = useContext(Context);

  return <Context.Consumer>{(value) => value.state.name}</Context.Consumer>;
}
