export const USER_INFO = 'USER_INFO';
export const USER_QUEST = 'USER_QUEST';

const actionUserInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const actionQuest = (questions) => ({
  type: USER_QUEST,
  questions,
});

export const Questions = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();
    dispatch(actionQuest(result));
  } catch (error) {
    console.log(error);
  }
};

export default actionUserInfo;
