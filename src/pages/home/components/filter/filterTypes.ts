export type DefaultFilters = {
  id: string,
  value: string,
  name: string,
};

export const defaultFilters: Array<DefaultFilters> = [
  {
    id: 'all',
    value: 'all',
    name: 'Всі',
  },
  {
    id: '0transplant',
    value: '0',
    name: 'Без пересадок',
  },
  {
    id: '1transplant',
    value: '1',
    name: '1 пересадка',
  },
  {
    id: '2transplants',
    value: '2',
    name: '2 пересадки',
  },
  {
    id: '3transplants',
    value: '3',
    name: '3 пересадки',
  },
];
