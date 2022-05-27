import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { mockBom, mockRuim, mockMedio } from './helpers/initialStates';

describe('testando a pagina feedback', () => {
  it('deve existir um header', () => {
    renderWithRouterAndRedux(<App />, mockMedio, '/feedback');
    const imgHeader = screen.getByTestId('header-profile-picture');
    expect(imgHeader).toBeInTheDocument();
    const nameHeader = screen.getByTestId('header-player-name');
    expect(nameHeader).toBeInTheDocument();
    const scoreHeader = screen.getByTestId('header-score');
    expect(scoreHeader).toBeInTheDocument();
  })
  it('exibe o score do jogagor e suas assertions', () => {
    renderWithRouterAndRedux(<App />, mockMedio, '/feedback');
    const totalAssertions = screen.getByTestId('feedback-total-question');
    expect(totalAssertions).toBeInTheDocument();
    const totalScore = screen.getByTestId('feedback-total-score');
    expect(totalScore).toBeInTheDocument();
  })
  it('testando o botao "play again"', () => {
    const { history } = renderWithRouterAndRedux(<App />, mockMedio, '/feedback');
    // const playAgain = screen.getByRole('button', { name: /playagain/i })
    const playAgain = screen.getByTestId("btn-play-again");
    expect(playAgain).toBeInTheDocument;
    userEvent.click(playAgain);
    expect(history.location.pathname).toBe('/')
  })
  it('testando o botao "ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />, mockMedio, '/feedback');
    // const ranking = screen.getByRole('button', { name: /ranking/ });
    const ranking = screen.getByTestId("btn-ranking");
    expect(ranking).toBeInTheDocument();
    userEvent.click(ranking);
    expect(history.location.pathname).toBe('/ranking');
  })
  it('testando a mensagem boa recebida pelo jogador', () => {
    renderWithRouterAndRedux(<App />, mockBom, '/feedback');
    const feedbackMessage = screen.getByRole('heading', { level: 3, name: /well done!/i })
    expect(feedbackMessage).toBeInTheDocument();
  })
  it('testando a mensagem ruim recebida pelo jogador', () => {
    renderWithRouterAndRedux(<App />, mockRuim, '/feedback');
    const feedbackMessage = screen.getByRole('heading', { level: 3, name: /could be better.../i })
    expect(feedbackMessage).toBeInTheDocument();
  })
})
