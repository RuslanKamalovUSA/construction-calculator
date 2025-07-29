import React, { useEffect, useState } from 'react';
import '../services/CalculatorService'
import '../resultPanel/resultPanel.scss';
import CalculatorService from '../services/CalculatorService';
import { useSelector } from 'react-redux';

const ResultPanel = (props) => {

    //const price = props.price;
    const [rate, setRate] = useState(0);
    const [priceUAH, setPriceUAH] = useState(0);
    const [priceUSD, setPriceUSD] = useState(0);

    // const area = useSelector(state => state.area.totalArea)
    // const prices = useSelector(state => state.prices.prices)
    // const services = useSelector(state => state.services.services)
    // const height = useSelector(state => state.area.height)

    const area = useSelector(state => state.calculatorServiceReducer.totalArea)
    const prices = useSelector(state => state.calculatorServiceReducer.prices)
    const services = useSelector(state => state.calculatorServiceReducer.customerServices)
    const height = useSelector(state => state.calculatorServiceReducer.height)
    
    const {getCurrentUAHRate, getCurrentUAHRateProxy, loading, error, cleanError} = CalculatorService();

    const onRequest = () => {
        getCurrentUAHRateProxy().then(onDataLoaded).catch(error => console.log(error))
    }

    const onDataLoaded = (data) => {
        const rateData = data
        setRate(rateData);
        console.log('rate', rateData)
        //const convertedToUsdData = (price / data).toFixed(2)
        //setPriceUSD(convertedToUsdData);
    }

    useEffect(() => {
        onRequest();
        calculateTotalPrice(area, height, services, prices);
    }, [area, prices, services])

    const calculateTotalPrice = (area, height, services, prices) => {
     
        const square = area.map(el => (el.value)).reduce((a, b) => a + b, 0)
        
        const tileArea = area.filter(el => el.id === 'bathroom' || el.id === 'restroom' || el.id === 'corridor_2').reduce((a, b) => a + b.value, 0)
        
        let totalServices = []
        for (let el of prices) {
            for (let item of services) {
                if (el.id === item.id && item.approved === true) {
                    totalServices.push(el);
                }
            }
        }

        let res = totalServices.map(el => {
            return formule(height, square, el.count, el.id, tileArea)
        }).reduce((a, b) => a + b, 0)

        let priceUAH = Math.round(res)
        let usdPrice = Math.round(priceUAH/rate)
        
        setPriceUAH(priceUAH)
        setPriceUSD(usdPrice)
    }

    function formule(height, square, count, id, tileArea){
        
        switch (id) {
            case 'destruction': 
                return square * count;
            case 'wall_putty':
                return 4 * Math.sqrt(square) * height * count;
            case 'walls_putty':
                return 4 * Math.sqrt(square) * height * count;
            case 'wallpaper':
                return 4 * Math.sqrt(square) * height * count;
            case 'wall_painting':
                return 4 * Math.sqrt(square) * height * count;
            case 'ceiling_installation': 
                return square * count;
            case 'ceiling_painting': 
                return square * count;
            case 'silence_putty':
                return square * count;
            case 'silence':
                return square * count;
            case 'floor_laying': 
                return square * count;
            case 'moldings': 
                return square * count;
            case 'windows':
                return Math.round(square/7.5) * count
            case 'doors':
                return Math.round(square/25) * count
            case 'door': 
                return count
            case 'tile_floors': 
                return tileArea * count
            case 'plumbing_installation':
                return count
            case 'electrical_wiring':
                return count
            default:
                return count;
        }

    }
    return (
        <div className='container__result-panel'>
            <p className='container__result-panel__price'>{priceUAH} грв</p>
            <p className='container__result-panel__title'>Примерная<br></br>общая стоимость работ</p>
            <p className='container__result-panel__price'>{priceUSD} $</p>
            <p className='container__result-panel__title'>Сумма в долларах США по текущему курсу</p>
        </div>
    );
};

export default ResultPanel;