import React from 'react';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const responseAPI = {
    "response_code":0,
    "response_message":"Token Generated Successfully!",
    "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}

const tokenInvalido = {
    "response_code": 3,
    "response_message":"Token Generated Successfully!",
    "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
}

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

describe('Teste tela de jogo', () => {
  test('Verifica elementos na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(responseAPI)
      }));
      
      global.fetch = jest.fn(() => Promise.resolve({
          json: () => Promise.resolve(result)
      }));

    const { history } = renderWithRouterAndRedux(<App/>);

    const email = screen.getByLabelText('E-mail');
    expect(email).toBeInTheDocument();

    const nome = screen.getByLabelText('Nome');
    expect(nome).toBeInTheDocument();

    userEvent.type(nome, 'julia');
    userEvent.type(email, 'julia@julia.com');

    const btnPlay = screen.getByRole('button', { name: /Play/i });
    expect(btnPlay).toBeInTheDocument();
    userEvent.click(btnPlay);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    });

    const img = screen.getByTestId('header-profile-picture');
    expect(img).toBeInTheDocument();

    const name = screen.getByTestId('header-player-name');
    expect(name).toBeInTheDocument();

    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();

    const button = await screen.findByTestId('correct-answer');
    expect(button).toBeInTheDocument();

    const timer = screen.getByTestId('timer');
    expect(timer).toBeInTheDocument();

    const question = screen.getByTestId('question-category');
    expect(question).toBeInTheDocument();

    userEvent.click(button);

    const btnNext = screen.getByTestId('btn-next');
    expect(btnNext).toBeInTheDocument();

    userEvent.click(btnNext);

    expect(question).toBeInTheDocument();

    const button1 = await screen.findByTestId('correct-answer');
    expect(button1).toBeInTheDocument();

    userEvent.click(button1);

    const btnNext1 = screen.getByTestId('btn-next');
    expect(btnNext1).toBeInTheDocument();

    userEvent.click(btnNext1);

    const button2 = await screen.findByTestId('correct-answer');
    expect(button2).toBeInTheDocument();

    userEvent.click(button2);

    const btnNext2 = screen.getByTestId('btn-next');
    expect(btnNext2).toBeInTheDocument();
    
    userEvent.click(btnNext2);

    const button3 = await screen.findByTestId('correct-answer');
    expect(button3).toBeInTheDocument();

    userEvent.click(button3);

    const btnNext3 = screen.getByTestId('btn-next');
    expect(btnNext3).toBeInTheDocument();
    
    userEvent.click(btnNext3);

    const button4 = await screen.findByTestId('correct-answer');
    expect(button4).toBeInTheDocument();

    userEvent.click(button4);

    const btnNext4 = screen.getByTestId('btn-next');
    expect(btnNext4).toBeInTheDocument();

    userEvent.click(btnNext4);

    const { pathname } = history.location
    expect(pathname).toBe('/feedback');
  })
  test('Verifica timer', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(responseAPI)
    }));
      
      global.fetch = jest.fn(() => Promise.resolve({
          json: () => Promise.resolve(result)
    }));

    jest.useFakeTimers();
    const teste = jest.spyOn(global, 'setTimeout');
    
    renderWithRouterAndRedux(<App/>)

    const email = screen.getByLabelText('E-mail');
    expect(email).toBeInTheDocument();

    const nome = screen.getByLabelText('Nome');
    expect(nome).toBeInTheDocument();

    userEvent.type(nome, 'julia');
    userEvent.type(email, 'julia@julia.com');

    const btnPlay = screen.getByRole('button', { name: /Play/i });
    expect(btnPlay).toBeInTheDocument();
    userEvent.click(btnPlay);

    const timer = await screen.findByTestId('timer');
    expect(timer).toHaveTextContent(30);

    expect(teste).toHaveBeenCalled();

    const button = await screen.findByTestId('correct-answer');
    expect(button).not.toBeDisabled();

    //Função pega na documentação
    //Link: https://jestjs.io/docs/timer-mocks

    jest.advanceTimersByTime(40000);

    expect(button).toBeDisabled();
})
});
