import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../redux/componentes/Header';

class Feedback extends React.Component {
  componentDidMount() {
    const { score, nome, email } = this.props;
    const userInfo = [{ score, nome, email }];
    if (localStorage.getItem('ranking') !== null) {
      const rank = [...JSON.parse(localStorage.getItem('ranking')), ...userInfo];
      localStorage.setItem('ranking', JSON.stringify(rank));
    } else {
      localStorage.setItem('ranking', JSON.stringify(userInfo));
    }
  }

  render() {
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <div>
        <p data-testid="feedback-text">Feedback</p>
        { assertions < three
          ? <h3 data-testid="feedback-text">Could be better...</h3>
          : <h3 data-testid="feedback-text">Well Done!</h3>}
        <p data-testid="feedback-total-question">{ assertions }</p>
        <Header />
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">Ranking</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  nome: state.player.name,
  email: state.player.gravatarEmail,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
