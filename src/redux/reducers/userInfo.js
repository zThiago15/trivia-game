import { USER_INFO, USER_SCORE, USER_TOTAL } from '../actions/userInfo';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email };
  case USER_SCORE:
    return {
      ...state,
      score: state.score + action.pontos,
    };
  case USER_TOTAL:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default player;
