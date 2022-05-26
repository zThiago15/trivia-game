import React, { Component } from 'react';
import Header from '../redux/componentes/Header';
import Questions from '../redux/componentes/Questions';

class Game extends Component {
  changeHistory = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <>
        <Header />
        <Questions changeHistory={ this.changeHistory } />
      </>
    );
  }
}

export default Game;
