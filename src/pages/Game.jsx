import React, { Component } from 'react';
import Header from '../redux/componentes/Header';
import Questions from '../redux/componentes/Questions';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Questions />
      </>
    );
  }
}

export default Game;
