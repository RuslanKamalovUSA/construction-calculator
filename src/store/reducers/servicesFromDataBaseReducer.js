const initialState = {
    servicesFromDataBase: []
}

const SERVICES = 'SERVICES'

const servicesFromDataBaseReducer = (state = initialState, action) => {
    switch(action.type) {
        case SERVICES: 
            return {...state, servicesFromDataBase: [...action.payload]}
        default:
            return state;
    }
}

export default servicesFromDataBaseReducer;
  