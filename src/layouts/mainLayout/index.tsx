import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logo from '../../icon/icon-logo.svg';
import './styles.scss';

const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <header className="header">
        {
          pathname !== '/' ?
            <Link to={"/"}><img src={Logo} alt="logo" /></Link>
            : <img src={Logo} alt="logo" />
        }
      </header>

      <div className="container">
        <Outlet />
      </div>
    </>
  )
};

export default MainLayout;
