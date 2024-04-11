import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTicketsService } from '../../../services/tickets';
import { TicketsState, TicketType } from '../../../types';
import { getDiffTimeStamp } from '../../../utils';
import { allFilters } from './constants';

export const getAsyncTickets = createAsyncThunk('tickets/getTickets', async (_, thunkApi) => {
  try {
    const { data }: any = await getTicketsService();

    return data;
  } catch (e) {
    return thunkApi.rejectWithValue(e);
  }
});

const sortTransplants = (tickets: TicketType[]) => tickets.reduce((acc: TicketType[], item: TicketType) => {
  const tempItem = { ...item };
  const tempTransplants = [...item.transplants];

  tempTransplants.sort((a, b) => {
    const first = getDiffTimeStamp({
      timeFrom: a.timeFrom,
      timeTo: a.timeTo,
    });

    const second = getDiffTimeStamp({
      timeFrom: b.timeFrom,
      timeTo: b.timeTo,
    });

    return first - second;
  });

  tempItem.transplants = [...tempTransplants];

  return [...acc, tempItem];
}, []);

export const sortByOptimal = (tickets: TicketType[]) =>
  sortTransplants(tickets).sort((a: TicketType, b: TicketType) => {
    const [tempFirst] = a.transplants;
    const [tempSecond] = b.transplants;

    const first = getDiffTimeStamp({
      timeFrom: tempFirst.timeFrom,
      timeTo: tempFirst.timeTo,
    });

    const second = getDiffTimeStamp({
      timeFrom: tempSecond.timeFrom,
      timeTo: tempSecond.timeTo,
    });

    const resFirst = first / a.price;
    const resSecond = second / b.price;

    return resFirst - resSecond;
  });

export const sortByTime = (tickets: TicketType[]) =>
  sortTransplants(tickets).sort((a: TicketType, b: TicketType) => {
    const [tempFirst] = a.transplants;
    const [tempSecond] = b.transplants;

    const first = getDiffTimeStamp({
      timeFrom: tempFirst.timeFrom,
      timeTo: tempFirst.timeTo,
    });

    const second = getDiffTimeStamp({
      timeFrom: tempSecond.timeFrom,
      timeTo: tempSecond.timeTo,
    });

    return first - second;
  });

const filterTransplants = (state: TicketsState) => {
  const tempTickets = [...state.tickets];

  state.visibleTickets = tempTickets.map((item => {
    const tempItem = {...item};
    const tempTransplants = [...item.transplants];

    tempItem.transplants = tempTransplants.filter(
      item => state.filters.includes(String(item.countTransplants))
    );

    return tempItem;
  }))
  .filter(item => !!item.transplants.length);
};

export const filteredTicketsAction = (state: TicketsState, payload: string) => {
  const isExist = state.filters.some(elem => elem === payload);
  const tempFilters = [...state.filters];

  if (payload === 'all') {
    if (!isExist) {
      state.filters = allFilters;
    } else {
      state.filters = [];
    }

    filterTransplants(state);

    return;
  }

  if (isExist) {
    const idx = tempFilters.findIndex(item => item === payload);

    tempFilters.splice(idx, 1);
    state.filters = tempFilters;

    if (tempFilters.length === 1 && tempFilters.includes('all')) {
      state.filters = [];
    }

    filterTransplants(state);

    return;
  }

  tempFilters.push(payload);

  if (tempFilters.length === 4 && !tempFilters.includes('all')) {
    state.filters = allFilters;
    filterTransplants(state);

    return;
  }

  state.filters = tempFilters;
  filterTransplants(state);
};
