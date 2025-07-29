
const initialState = {
    baseServicesRooms: [],
    customerServices: [],
    prices: [],
    totalArea: [],
    height: 0,
    admins: []
}

const SERVICES = 'SERVICES';
const NEW_DATA_SERVICES = 'NEW_DATA_SERVICES';
const CHANGE_PRICES = "CHANGE_PRICES";
const NEW_DATA = "NEW_DATA";
const ADD_HEIGHT = "ADD_HEIGHT";

const calculatorServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERVICES:
            return {...state, baseServicesRooms: [...action.payload]}
        case NEW_DATA_SERVICES: 
            return {...state, customerServices: [...action.payload]}
        case CHANGE_PRICES: 
            return {...state, prices: action.payload}
        case NEW_DATA: 
            return {...state, totalArea: action.payload}
        case ADD_HEIGHT:
            return {...state, height: action.payload}
        default: return state
    }
}

export default calculatorServiceReducer;    

    




