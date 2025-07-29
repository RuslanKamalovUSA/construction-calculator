const initialState = {
    services: []
}

const NEW_DATA_SERVICES = 'NEW_DATA_SERVICES'

const servicesReducer = (state = initialState, action) => {
    switch(action.type) {
        case NEW_DATA_SERVICES: 
            return {...state, services: [...action.payload]}
        default:
            return state;
    }
}

export default servicesReducer;
  