const initialState = 'http://43.203.29.5';
  
const baseUrlReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_BASE_URL':
            return action.payload;
        default:
            return state;
    }
};

export default baseUrlReducer;