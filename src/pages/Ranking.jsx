import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { limparRedux } from '../redux/actions/userInfo';

class Ranking extends React.Component {
  componentDidMount() {
    const { clearRedux } = this.props;
    clearRedux();
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankingSort = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        { rankingSort.map(({ score, nome, email }, index) => {
          const converteEmail = md5(email).toString();
          return (
            <div key={ index }>
              <img
                alt="avatar"
                src={ `https://www.gravatar.com/avatar/${converteEmail}` }
              />
              <h2 data-testid={ `player-name-${index}` }>{ nome }</h2>
              <h2 data-testid={ `player-score-${index}` }>{ score }</h2>
            </div>
          );
        })}
        <p data-testid="ranking-title">Ranking</p>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  clearRedux: () => dispatch(limparRedux()),
});

Ranking.propTypes = {
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
