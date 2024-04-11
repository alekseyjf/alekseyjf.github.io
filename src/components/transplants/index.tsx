import React from 'react';
import { countTransplants, getDiffTime } from '../../utils';
import { TransplantsType } from '../../types';
import './styles.scss';

type Props = {
  transplants: Array<TransplantsType>,
};

const Transplants = (props: Props) => {
  const { transplants } = props;

  return (
    <div className="transplants">
      {transplants.map((item: TransplantsType) => {
        return (
          <div key={item.id} className="transplants__item">
            <div className="transplants__field">
              <div className="transplants__placeholder">
                {item.fromTo}
              </div>

              <div className="transplants__info">
                {item.timeFrom} - {item.timeTo}
              </div>
            </div>

            <div className="transplants__field">
              <div className="transplants__placeholder">
                В ДОРОЗІ
              </div>

              <div className="transplants__info">
                {getDiffTime({
                  timeFrom: item.timeFrom,
                  timeTo: item.timeTo,
                })}
              </div>
            </div>

            <div className="transplants__field">
              <div className="transplants__placeholder">
                {countTransplants(item.countTransplants)}
              </div>

              {!!item?.countTransplants && (
                <div className="transplants__info">
                  {item.transplants}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default React.memo(Transplants);
