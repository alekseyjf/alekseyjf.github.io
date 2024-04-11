import { FetchSuccessTicketActions } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { filteredTicketsAction, getAsyncTickets, sortByOptimal, sortByTime } from './ticketsAction';
import { initialState } from "./constants";

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    onFilteredTickets: (state, { payload }) => {
      filteredTicketsAction(state, payload);
    },
    onSortedTickets: (state, { payload }) => {
      const tickets = [...state.visibleTickets];

      if (payload === 0) {
        state.visibleTickets = tickets.sort((a, b) => {
          return a.price - b.price
        })
      } else if (payload === 1) {
        state.visibleTickets = sortByTime(tickets);
      } else if (payload === 2) {
        state.visibleTickets = sortByOptimal(tickets);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncTickets.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAsyncTickets.fulfilled, (state, { payload }: FetchSuccessTicketActions) => {
      state.tickets = payload;
      state.visibleTickets = payload;
      ticketsSlice.caseReducers.onSortedTickets(state, { payload: 0, type: '' });
      state.isLoading = false;
    })
    .addCase(getAsyncTickets.rejected, (state) => {
      state.isLoading = false;
    });
  },
});


export const { actions, reducer } = ticketsSlice;
