import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import player from '../redux/actions/userInfo';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      nome: '',
      email: '',
      disabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.handleButton());
  }

  handleButton = () => {
    const { nome, email } = this.state;

    if (nome && email) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  getToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { token } = data;

    const { history, sendInfo } = this.props;
    const { nome, email } = this.state;

    sendInfo({ name: nome, email });

    localStorage.setItem('token', token);
    history.push('/game');
  }

  onClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { nome, email, disabled } = this.state;
    return (
      <>
        <form>
          <label htmlFor="nome">
            Nome
            <input
              data-testid="input-player-name"
              id="nome"
              name="nome"
              value={ nome }
              onChange={ this.handleChange }
              type="text"
            />
          </label>
          <br />
          <label htmlFor="email">
            E-mail
            <input
              data-testid="input-gravatar-email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              type="email"
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabled }
            onClick={ this.getToken }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.onClickSettings }
        >
          Settings
        </button>
      </>
    );
  }
}

const mapDispatchToProps = ((dispatch) => ({
  sendInfo: (state) => dispatch(player(state)),
}));

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  sendInfo: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
