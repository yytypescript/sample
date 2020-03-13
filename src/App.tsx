import React from 'react';
import './App.css';
import { Side } from './Side';
import { Main } from './Main';

export const App = () => {
  return (
    <div className="container">
      <header></header>

      <Side></Side>
      <Main></Main>
    </div>
  );
}
