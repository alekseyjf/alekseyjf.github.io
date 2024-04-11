import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Transplants from '../../../../components/transplants';
import { currencyFormatter } from '../../../../utils';
import { useActions } from '../../../../hooks';
import { TicketsState, TicketType } from '../../../../types';
import { IconsSVG } from '../../../../icon';
import { RootState } from '../../../../store';
import './styles.scss';

const Tickets = () => {
  const [countTickets, setCountTickets] = useState<number>(5);

  const {
    error,
    isLoading,
    tickets,
    visibleTickets,
  }: TicketsState = useSelector(({ ticketsSlice }: RootState) => ticketsSlice);
  const { getAsyncTickets } = useActions();

  useEffect(() => {
    if (!tickets.length) {
      getAsyncTickets();
    }
  }, []);

  if (isLoading) return <h2>Завантеження білетів...</h2>;

  if (error) return <h2>Помилка в завантежені спробейте презавантажити сторінку</h2>;

  const isShowMore = visibleTickets.length > countTickets;

  const onShowMore = () => {
    if (visibleTickets.length >= countTickets) {
      setCountTickets(countTickets + 5);
    }
  };

  const renderCardTickets = () => {
    const tempVisibleTickets = [...visibleTickets];
    if (!visibleTickets?.length) {
      return <div>Білетів немає</div>
    }

    return (
      tempVisibleTickets.slice(0, countTickets).map((item: TicketType) => {
        const IconComponent = IconsSVG[item.airline];

        return (
          <Link to={`ticket/${item.id}`} key={item.id} className="ticket-card">
            <div className="ticket-card__header">
              <div className="ticket-card__price">
                {currencyFormatter(item.price)}
              </div>

              <IconComponent className="ticket-card__logo" />
            </div>

            <Transplants transplants={item.transplants} />
          </Link>
        );
      })
    );
  };

  const renderShowMore = () => {
    const diffTicketsLength = visibleTickets.length - countTickets;
    const resultShowMore = diffTicketsLength >= 5 ? 5 : diffTicketsLength;

    return (
      !isShowMore ? null
        : <button
          onClick={onShowMore}
          className="tickets__show-more"
        >
          Показати ще {resultShowMore} квитків
        </button>
    );
  };

  return (
    <div className="tickets">
      {renderCardTickets()}

      {renderShowMore()}
    </div>
  );
};

export default React.memo(Tickets);
