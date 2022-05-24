const actionUserInfo = (nome, email) => ({
  type: 'USER_INFO',
  payload: {
    nome,
    email,
  },
});

export default actionUserInfo;
