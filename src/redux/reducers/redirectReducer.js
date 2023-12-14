const initialState = '/';

const redirectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REDIRECT_PATH':
      return action.payload;
    default:
      return state;
  }
};

export default redirectReducer;
