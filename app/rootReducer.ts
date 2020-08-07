import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import selectedComponentReducer from './reducers/selectedComponent';
import dataTabReducer from './reducers/dataTab';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    selectedComponent: selectedComponentReducer,
    dataTab: dataTabReducer,
  });
}
