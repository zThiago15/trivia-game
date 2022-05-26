import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../redux/componentes/Questions';
import Header from '../redux/componentes/Header';
import { mudarPlacar, totalAcertos } from '../redux/actions/userInfo';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      css: false,
      timer: 30,
      disabled: false,
      indexAlternativa: 0,
      btnNext: false,
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

  mostrarBotao = () => {
    this.setState({ btnNext: true });
  };

  resetTimer = () => {
    this.setState({
      timer: 30,
      disabled: true,
    });
    clearInterval(this.intervaloTempo);
  }

  verificarResposta = ({ target: { id } }) => {
    const { perguntas, total } = this.props;
    const { indexAlternativa } = this.state;

    this.setState(() => ({
      css: true,
    }));

    const dificuldade = perguntas[indexAlternativa].difficulty;

    if (id === 'true') {
      this.calcularRanking(dificuldade);
      total();
    }

    this.mostrarBotao();
  }

  nextButton = () => {
    const { indexAlternativa } = this.state;
    const { history } = this.props;
    const numberFour = 4;

    if (indexAlternativa === numberFour) {
      history.push('/feedback');
    }

    this.setState((state) => ({
      indexAlternativa: state.indexAlternativa + 1,
      timer: 30,
      css: false,
      btnNext: false,
    }));
  }

  calcularRanking = (dificuldade) => {
    const { timer } = this.state;
    const { enviarPontuacao } = this.props;
    const numberTen = 10;

    const numberHard = 3;
    const numberMedium = 2;
    const numberEasy = 1;

    if (dificuldade === 'hard') {
      enviarPontuacao((numberTen + (timer * numberHard)));
    } else if (dificuldade === 'medium') {
      enviarPontuacao((numberTen + (timer * numberMedium)));
    } else {
      enviarPontuacao((numberTen + (timer * numberEasy)));
    }
  };

  changeHistory = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { css, timer, disabled, btnNext, indexAlternativa } = this.state;
    return (
      <>
        <Header />
        <Questions
          changeHistory={ this.changeHistory }
          verificarResposta={ this.verificarResposta }
          css={ css }
          timer={ timer }
          disabled={ disabled }
          btnNext={ btnNext }
          nextButton={ this.nextButton }
          indexAlternativa={ indexAlternativa }
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  enviarPontuacao: (pontos) => dispatch(mudarPlacar(pontos)),
  total: () => dispatch(totalAcertos()),
});

const mapStateToProps = (state) => ({
  perguntas: state.game.questions,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  total: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
