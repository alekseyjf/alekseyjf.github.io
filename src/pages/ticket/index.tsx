import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TicketsState, TicketType } from '../../types';
import Transplants from '../../components/transplants';
import { IconsSVG } from '../../icon';
import { currencyFormatter } from '../../utils';
import { useActions } from '../../hooks';
import './styles.scss'
import { RootState } from "../../store";

const Ticket = () => {
  const { pathname } = useLocation();
  const ticketId = Number(pathname.split('/').pop());

  const {
    tickets,
    isLoading,
    error,
  }: TicketsState = useSelector(({ ticketsSlice }: RootState) => ticketsSlice);
  const ticket = tickets.find(item => item.id === ticketId) as TicketType;

  const { getAsyncTickets } = useActions();

  useEffect(() => {
    if (!tickets.length) {
      getAsyncTickets();
    }
  }, []);

  if (isLoading) return <h2>Завантеження білета</h2>;

  if (!ticket) return <div>Білет не знайдено</div>;

  if (error) return <h2>Помилка в завантежені спробейте презавантажити сторінку</h2>;

  const IconAirline = IconsSVG[ticket.airline];

  return (
    <div className="ticket">
      <header className="ticket__header">
        <div>
          <IconAirline />

          <div className="ticket__price">{currencyFormatter(ticket.price)}</div>
        </div>

        <div className="ticket__description">
          <b>Додаткова інформація</b>

          <p>Літак може затримуватись на +/- 30 хвилин</p>
        </div>
      </header>

      <Transplants transplants={ticket.transplants} />

      <button className="ticket__show-more">Обрати білет</button>
    </div>
  );
};

export default React.memo(Ticket);
