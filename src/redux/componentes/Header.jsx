import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const converteEmail = md5(gravatarEmail).toString();

    return (
      <header>
        <img
          alt="avatar"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${converteEmail}` }
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h3 data-testid="header-score">
          { score }
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
