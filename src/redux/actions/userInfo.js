export const USER_INFO = 'USER_INFO';
export const USER_QUEST = 'USER_QUEST';
export const USER_SCORE = 'USER_SCORE';
export const USER_TOTAL = 'USER_TOTAL';
export const CLEAR_REDUX = 'CLEAR_REDUX';

const actionUserInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const actionQuest = (questions) => ({
  type: USER_QUEST,
  questions,
});

export const mudarPlacar = (pontos) => ({
  type: USER_SCORE,
  pontos,
});

export const totalAcertos = () => ({
  type: USER_TOTAL,
});

export const limparRedux = () => ({
  type: CLEAR_REDUX,
  score: 0,
  assertions: 0,
});

export default actionUserInfo;
