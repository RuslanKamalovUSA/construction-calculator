import { combineReducers, createStore } from 'redux';
import totalAreaReducer from './reducers/totalAreaReducer.js';
import servicesReducer from './reducers/servicesReducer.js';
import setPricesReducer from './reducers/setPricesReducer.js';
import servicesFromDataBaseReducer from './reducers/servicesFromDataBaseReducer.js';
import calculatorServiceReducer from './reducers/calculatorServiceReducer.js';

const rootReducer = combineReducers({
    calculatorServiceReducer: calculatorServiceReducer
    // services: servicesReducer,
    // area: totalAreaReducer,
    // prices: setPricesReducer,
    // servicesFromDataBase: servicesFromDataBaseReducer
})
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;