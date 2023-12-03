const initialState = {
    authToken: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH_TOKEN':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default authReducer;