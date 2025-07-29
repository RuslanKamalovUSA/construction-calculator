import React, { useEffect, useState } from 'react';
import Calculator from '../calculator/Calculator';
import ResultPanel from '../resultPanel/ResultPanel';

import './main.scss';
import CalculatorService from '../services/CalculatorService';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';

const Main = () => {
    const [data, setData] = useState([]);
    const {loading, error, cleanError, getDataBase} = CalculatorService();

    const dispatch = useDispatch();
    //const dataFromStorage = useSelector(state => console.log("MAIN ====>>> from storage", state))
    //const services = useSelector(state => state.servicesFromDataBase.servicesFromDataBaseReducer)
    const services = useSelector(state => state.calculatorServiceReducer.baseServicesRooms)

    const onRequest = () => {
        getDataBase().then(onDataLoaded).catch(error => console.log(error))
    }

    const onDataLoaded = (list) => {
        setData(list.data)
        console.log("MAIN =====>>> data from data base", list.data, data)
        store.dispatch({type:'SERVICES', payload: list.data})
        console.log("STORAGE SERVICES", services)
    }

    useEffect(() => {
        onRequest();
    }, [])

    // useEffect(() => {
    //     console.log(dataFromStorage)
    // }, [data, dataFromStorage])

    return (
        <>
            <div className="container__calculator">
                <Calculator></Calculator>
                <div className="container__result">
                    <ResultPanel price={200}></ResultPanel>
                </div>
            </div> 
        </>
    );
};

export default Main;