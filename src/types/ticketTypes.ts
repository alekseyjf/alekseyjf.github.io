export type TransplantsType = {
  id: number | string,
  fromTo: string,
  timeFrom: string,
  timeTo: string,
  countTransplants: number
  transplants?: string,
};

export type TicketType = {
  id: number | string,
  airline: string,
  price: number,
  transplants: Array<TransplantsType>,
};

export type TicketsState = {
  tickets: Array<TicketType>,
  visibleTickets: Array<TicketType>,
  isLoading: boolean,
  error: null | string,
  filters: Array<string>,
};

export type FetchSuccessTicketActions = {
  payload: [],
};
