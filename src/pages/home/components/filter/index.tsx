import React from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as IconCheck } from '../../../../icon/icon-check.svg';
import { useActions } from '../../../../hooks';
import { TicketsState } from '../../../../types';
import { RootState } from '../../../../store';
import { defaultFilters, DefaultFilters } from './filterTypes';
import './styles.scss'

const Filter = () => {
  const { filters }: TicketsState = useSelector(({ ticketsSlice }: RootState) => ticketsSlice);
  const { onFilteredTickets } = useActions();

  const onFilterTickets: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onFilteredTickets(e.target.value);
  };

  return (
    <form className="filter">
      <p className="filter__title">Кількість білетів</p>

      {defaultFilters.map((item: DefaultFilters) => (
        <div key={item.id} className="filter__field">
          <input
            id={item.id}
            type="checkbox"
            className="filter__input"
            checked={filters.includes(item.value)}
            onChange={onFilterTickets}
            value={item.value}
          />

          <IconCheck className="filter__icon-check" />

          <label htmlFor={item.id} className="filter__label">
            {item.name}
          </label>
        </div>
      ))}
    </form>
  );
};

export default React.memo(Filter);
