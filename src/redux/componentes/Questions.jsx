import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Questions } from '../actions/userInfo';
import Loading from './Loading';

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
  }

  invalidationToken = () => {
    const tokenSalvo = localStorage.getItem('token');
    const { history } = this.props;
    if (!tokenSalvo) {
      return history.push('/');
    }
  }

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

const mapDispatchToProps = ((dispatch) => ({
  sendQuestion: (state) => dispatch(Questions(state)),
}));

const mapStateToProps = (state) => ({
  result: state.game.questions.results,
});

Question.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  result: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
