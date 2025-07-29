const initialState = {
    prices: []
}

const CHANGE_PRICES = "CHANGE_PRICES";

const setPricesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PRICES:
            return {...state, prices: action.payload}
        default:
            return state;
    }
}

export default setPricesReducer;