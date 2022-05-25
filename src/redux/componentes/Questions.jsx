import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import actionQuest from '../actions/userInfo';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      indexAlternativa: 0,
      loading: true,
    };
  }

  componentDidMount() {
    const { sendQuestion } = this.props;
    sendQuestion();
    this.setState({ loading: false });
    this.questions();
  }

  questions = () => async (dispatch) => {
    try {
      const numberErro = 3;
      const token = localStorage.getItem('token');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const result = await response.json();
      if (result.response_code === numberErro) {
        const { history } = this.props;
        token.localStorage.removeItem('token');
        history.push('/');
      } else {
        dispatch(actionQuest(result));
      }
    } catch (error) {
      console.log(error);
    }
  };

  proximaQuestao = () => {
    this.setState((state) => ({
      indexAlternativa: (state.indexAlternativa + 1),
    }));
  }

  render() {
    const { result } = this.props;
    const { indexAlternativa, loading } = this.state;
    let indexAtual = {};
    let alternativas = [];
    if (result !== undefined) {
      indexAtual = result[indexAlternativa];
      alternativas = [...indexAtual.incorrect_answers, indexAtual.correct_answer];
      const number = 0.5;
      alternativas = alternativas.sort(() => Math.random() - number);
    }

    return (
      <div>
        {
          loading ? <Loading />
            : (
              <div>
                <h2 data-testid="question-category">{ indexAtual.category }</h2>
                <h3 data-testid="question-text">{ indexAtual.question }</h3>
                <div data-testid="answer-options">
                  {
                    alternativas.map((element, i) => (
                      <button
                        key={ i }
                        type="button"
                        data-testid={
                          element === indexAtual.correct_answer ? 'correct_answer'
                            : `wrong-answer-${i}`
                        }
                        onClick={ this.proximaQuestao }
                      >
                        {element}
                      </button>
                    ))
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.game.questions.results,
  code: state.game.questions.response_code,
});

Question.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  result: PropTypes.array,
  code: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Question);
