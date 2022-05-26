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
    };
  }

  async componentDidMount() {
    this.questions();
  }

  questions = async () => {
    this.setState(
      async () => {
        const numberErro = 3;
        const token = localStorage.getItem('token');
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&token=${token}`,
        );
        const result = await response.json();

        const number = 0.5;
        const randowResult = result.results.map((element) => {
          const alternativas = [
            ...element.incorrect_answers,
            element.correct_answer,
          ];
          return { ...element,
            alternativas: alternativas.sort(() => Math.random() - number) };
        });

        if (result.response_code === numberErro) {
          const { changeHistory } = this.props;
          changeHistory();
        } else {
          const { actionQuestFunc } = this.props;
          actionQuestFunc(randowResult);
        }
      },
    );
  };

  render() {
    const { verificarResposta, css, timer, disabled, result, btnNext } = this.props;
    const { indexAlternativa } = this.state;

    return (
      <div>
        { result.length === 0 ? (
          <Loading />
        ) : (
          <div>
            <h1>{ timer }</h1>
            <h2 data-testid="question-category">{result[indexAlternativa].category}</h2>
            <h3 data-testid="question-text">{result[indexAlternativa].question}</h3>
            <div data-testid="answer-options">
              {result[indexAlternativa].alternativas
                .map((element, i) => (element === result[indexAlternativa]
                  .correct_answer ? (
                    <button
                      style={
                        css ? { border: '3px solid rgb(6, 240, 15)' }
                          : { color: 'black' }
                      }
                      key={ i }
                      type="button"
                      id="true"
                      data-testid="correct-answer"
                      disabled={ disabled }
                      onClick={ verificarResposta }
                    >
                      {element}
                    </button>
                  ) : (
                    <button
                      style={
                        css ? { border: '3px solid red' }
                          : { color: 'black' }
                      }
                      key={ i }
                      id="false"
                      type="button"
                      data-testid={ `wrong-answer-${indexAlternativa}` }
                      disabled={ disabled }
                      onClick={ verificarResposta }
                    >
                      {element}
                    </button>
                  )))}
              { btnNext && (
                <button
                  data-testid="btn-next"
                  type="button"
                >
                  Next

                </button>
              )}
              ;
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.game.questions,
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
