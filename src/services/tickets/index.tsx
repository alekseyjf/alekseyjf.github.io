import tickets from './fixture-tickets.json';

const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));

export const getTicketsService = async () => {
  return await delay(1000).then(() => tickets);
};
