import { TicketsState } from '../../../types';

export const allFilters = ['all', '0', '1', '2', '3'];

export const initialState: TicketsState = {
  tickets: [],
  visibleTickets: [],
  isLoading: false,
  error: null,
  filters: [...allFilters],
};
