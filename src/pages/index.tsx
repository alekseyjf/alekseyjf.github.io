import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import MainLayout from '../layouts/mainLayout';
import Ticket from './ticket';

const Router = () => (
  <Routes>
    <Route path={"/"} element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path={"ticket/:id"} element={<Ticket />} />

      <Route path="*" element={<h2>Сторінка не знайдена</h2>} />
    </Route>
  </Routes>
);

export default Router;
