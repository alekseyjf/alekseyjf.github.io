import { combineReducers } from 'redux';
import { reducer as ticketsSlice, actions as ticketsActions } from './tickets';
import * as ticketsAsyncActions from './tickets/ticketsAction';

export const rootActions = {
  ...ticketsActions,
  ...ticketsAsyncActions,
};

export const rootReducer = combineReducers({
  ticketsSlice,
});
