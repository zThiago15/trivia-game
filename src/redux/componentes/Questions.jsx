import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { actionQuest } from '../actions/userInfo';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      indexAlternativa: 0,
      loading: true,
    };
  }

  async componentDidMount() {
    // const { sendQuestion } = this.props;
    // sendQuestion();
    this.questions();
  }

  questions = async () => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const numberErro = 3;
        const token = localStorage.getItem('token');
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&token=${token}`,
        );
        const result = await response.json();
        if (result.response_code === numberErro) {
          const { changeHistory } = this.props;
          // token.localStorage.removeItem('token');
          changeHistory();
        } else {
          const { actionQuestFunc } = this.props;
          actionQuestFunc(result);
          this.setState({
            loading: false,
          });
        }
      },
    );
  };

  proximaQuestao = () => {
    this.setState((state) => ({
      indexAlternativa: state.indexAlternativa + 1,
    }));
  };

  render() {
    const { result } = this.props;
    const { indexAlternativa, loading } = this.state;
    let indexAtual = {};
    let alternativas = [];
    if (result !== undefined) {
      indexAtual = result[indexAlternativa];
      alternativas = [
        ...indexAtual.incorrect_answers,
        indexAtual.correct_answer,
      ];
      const number = 0.5;
      alternativas = alternativas.sort(() => Math.random() - number);
    }
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h2 data-testid="question-category">{indexAtual.category}</h2>
            <h3 data-testid="question-text">{indexAtual.question}</h3>
            <div data-testid="answer-options">
              {alternativas.map((element, i) => (element === indexAtual.correct_answer ? (
                <button
                  key={ i }
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.proximaQuestao }
                >
                  {element}
                </button>
              ) : (
                <button
                  key={ i }
                  type="button"
                  data-testid={ `wrong-answer-${indexAtual.incorrect_answers.indexOf(
                    element,
                  )}` }
                  onClick={ this.proximaQuestao }
                >
                  {element}
                </button>
              )))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.game.questions.results,
  code: state.game.questions.response_code,
});

const mapDispatchToProps = (dispatch) => ({
  actionQuestFunc: (questions) => dispatch(actionQuest(questions)),
});
Question.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  result: PropTypes.array,
  code: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
