import React, { Component } from 'react';

export default class Login extends Component {
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

  render() {
    const { nome, email, disabled } = this.state;
    return (
      <form>
        <label htmlFor="nome">
          Nome
          <input
            data-testid="input-player-name"
            name="nome"
            value={ nome }
            onChange={ this.handleChange }
            type="text"
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            type="email"
          />
        </label>
        <button data-testid="btn-play" type="button" disabled={ disabled }>Play</button>
      </form>
    );
  }
}
