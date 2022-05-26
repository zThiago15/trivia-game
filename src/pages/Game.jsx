import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Questions from '../redux/componentes/Questions';
import Header from '../redux/componentes/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      css: false,
      timer: 30,
      disabled: false,
    };
  }

  async componentDidMount() {
    const umSegundo = 1000;
    this.intervaloTempo = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, umSegundo);
  }

  componentDidUpdate() {
    const timerZero = 0;
    const { timer } = this.state;
    if (timer === timerZero) {
      this.resetTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervaloTempo);
  }

  resetTimer = () => {
    this.setState({
      timer: 30,
      disabled: true,
    });
    clearInterval(this.intervaloTempo);
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
    const { css, timer, disabled } = this.state;
    return (
      <>
        <Header />
        <Questions
          changeHistory={ this.changeHistory }
          proximaQuestao={ this.proximaQuestao }
          css={ css }
          timer={ timer }
          disabled={ disabled }
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
