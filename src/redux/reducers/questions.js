import { USER_QUEST } from '../actions/userInfo';

const INITIAL_STATE = {
  questions: {},
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_QUEST:
    return { ...state,
      questions: action.questions };
  default:
    return state;
  }
}

export default game;
