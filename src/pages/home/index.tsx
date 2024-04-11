import React from 'react';
import { Filter, Tabs, Tickets } from './components';
import './styles.scss';

const Home = () => {
  return (
    <div className="home">
      <Filter />

      <div>
        <Tabs />
        <Tickets />
      </div>
    </div>
  )
};

export default React.memo(Home);
