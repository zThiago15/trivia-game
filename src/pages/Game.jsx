import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Questions from '../redux/componentes/Questions';
import Header from '../redux/componentes/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      css: false,
    };
  }

  proximaQuestao = () => {
    this.setState(() => ({
      // indexAlternativa: .indexAlternativa + 1,
      css: true,
    }));
  };

  changeHistory = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { css } = this.state;
    return (
      <>
        <Header />
        <Questions
          changeHistory={ this.changeHistory }
          proximaQuestao={ this.proximaQuestao }
          css={ css }
        />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Game;
