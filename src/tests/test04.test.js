import React from 'react';
import Login from '../pages/Login';
import App from '../App';
import { waitFor } from '@testing-library/react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const result = {
  results: [
      {
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'medium',
        question: 'Nintendo started out as a playing card manufacturer.',
        correct_answer: 'True',
        incorrect_answers: [
          'False'
        ]
      },
      {
        category: 'Geography',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Which country does Austria not border?',
        correct_answer: 'France',
        incorrect_answers: [
          'Slovenia',
          'Switzerland',
          'Slovakia'
        ]
      },
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'medium',
        question: 'How many normal endings are there in Cry Of Fear&#039;s campaign mode?',
        correct_answer: '4',
        incorrect_answers: [
          '5',
          '3',
          '6'
        ]
      },
      {
        category: 'Celebrities',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which TV chef wrote an autobiography titled &quot;Humble Pie&quot;?',
        correct_answer: 'Gordon Ramsay',
        incorrect_answers: [
          'Jamie Oliver',
          'Ainsley Harriott',
          'Antony Worrall Thompson'
        ]
      },
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'hard',
        question: 'The word &quot;abulia&quot; means which of the following?',
        correct_answer: 'The inability to make decisions',
        incorrect_answers: [
          'The inability to stand up',
          'The inability to concentrate on anything',
          'A feverish desire to rip one&#039;s clothes off'
        ]
      }
    ]
};

describe('Requisito 4', () => {
  test('Verificando se existe inputs de nome, e-mail e botão', () => {
    renderWithRouterAndRedux(<Login />);

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

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(result)
  }));

    const { history } = renderWithRouterAndRedux(<App />);

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
      expect(pathname).toBe('/')
    });
  })

  test('Verifica se irá para a página de Settings na rota "/settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnSettings= screen.getByRole('button', { name: /settings/i });
    expect(btnSettings).toBeInTheDocument();

    userEvent.click(btnSettings);

    const { pathname } = history.location;

    expect(pathname).toBe('/settings');

  })
})

