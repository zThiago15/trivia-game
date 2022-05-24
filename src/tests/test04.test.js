import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../pages/Login';
import App from '../App';
import { waitFor } from '@testing-library/react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
}

describe('Requisito 4', () => {
  test('Verificando se existe inputs de nome, e-mail e botão', () => {
    const { history } = renderWithRouter(<Login />);

    const email = screen.getByLabelText('E-mail');
    expect(email).toBeInTheDocument();

    const nome = screen.getByLabelText('Nome');
    expect(nome).toBeInTheDocument();

    const btnPlay = screen.getByRole('button', { name: /Play/i });
    expect(btnPlay).toBeInTheDocument();

  })

  test('Verifica se irá para a página de Games na rota "/game"', async () => {
    const responseAPI = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(responseAPI)
    }));

    const { history, debug } = renderWithRouter(<App />);

    const nome = screen.getByRole('textbox' ,{ name: /nome/i });
    expect(nome).toBeInTheDocument();

    const email = screen.getByRole('textbox', { name: /e-mail/i });  
    expect(email).toBeInTheDocument();

    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay).toBeInTheDocument();

    userEvent.type(nome, 'teste');
    userEvent.type(email, 'testeemail@gmail.com');
    userEvent.click(btnPlay);
  
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game')
    });
  })

  test('Verifica se irá para a página de Settings na rota "/settings"', () => {
    const { history } = renderWithRouter(<App />);

    const btnSettings= screen.getByRole('button', { name: /settings/i });
    expect(btnSettings).toBeInTheDocument();

    userEvent.click(btnSettings);

    const { pathname } = history.location;

    expect(pathname).toBe('/settings');

  })
})

