import { USER_INFO } from '../actions/userInfo';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email };
  default:
    return state;
  }
}

export default player;
