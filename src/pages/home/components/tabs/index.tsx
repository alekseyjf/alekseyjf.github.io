import React, { useEffect } from 'react';
import { useActions } from '../../../../hooks';
import './styles.scss'

const tabs = [
  'Найдешевший', 'Найшвидший', 'Оптимальний',
];

const Tabs = () => {
  const { onSortedTickets } = useActions();

  useEffect(() => {
    onSortedTickets(0);
  }, []);

  const onSortTickets: React.ChangeEventHandler<HTMLInputElement> =
    (e) => onSortedTickets(+e.target.value);

  return (
    <form className="tab-tickets">
      {tabs.map((item, idx) => {
        return (
          <label key={item} className="tab-tickets__label">
            <input
              onChange={onSortTickets}
              defaultChecked={idx === 0}
              className="tab-tickets__input"
              name="sort-tickets"
              type="radio"
              value={idx}
            />

            <p className="tab-tickets__name">{item}</p>
          </label>
        )
      })}
    </form>
  );
};

export default React.memo(Tabs);
