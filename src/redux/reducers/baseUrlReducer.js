const initialState = 'http://3.37.88.24';
  
const baseUrlReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_BASE_URL':
            return action.payload;
        default:
            return state;
    }
};

export default baseUrlReducer;