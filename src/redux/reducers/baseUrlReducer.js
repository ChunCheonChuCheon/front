const initialState = 'https://api.chucheon.com';

const baseUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BASE_URL':
      return action.payload;
    default:
      return state;
  }
};

export default baseUrlReducer;
