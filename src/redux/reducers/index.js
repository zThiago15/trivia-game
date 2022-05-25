import { combineReducers } from 'redux';
import player from './userInfo';
import game from './questions';

const rootReducer = combineReducers({
  player,
  game,
});
export default rootReducer;
