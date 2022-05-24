const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
};

function userInfoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_INFO':
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email };
  default:
    return state;
  }
}
export default userInfoReducer;
