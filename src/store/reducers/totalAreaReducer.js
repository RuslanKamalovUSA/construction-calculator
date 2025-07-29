const initialState  = {
    totalArea: [],
    height: 0
}

const NEW_DATA = "NEW_DATA";
const ADD_HEIGHT = "ADD_HEIGHT";

const totalAreaReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_DATA:
            return {...state, totalArea: action.payload}
        case ADD_HEIGHT:
            return {...state, height: action.payload}
        default: 
        return state;
    }
}

export default totalAreaReducer;