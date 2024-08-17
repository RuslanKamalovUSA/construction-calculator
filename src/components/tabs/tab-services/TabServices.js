import React, { useEffect, useState } from 'react';

import '../tab-services/tabServices.scss';
import CalculatorService from '../../services/CalculatorService';
import { useDispatch, useSelector } from 'react-redux';

const TabServices = () => {
    const [operations, setOperations] = useState([]);
    const {getOperations, error, loading, cleanError} = CalculatorService();

    const dispatch = useDispatch();
    const servicesPicked = useSelector(state => state.services)

    const onRequest = () => {
        getOperations().then(onLoaded).catch(err => console.log(err))
    }

    const onLoaded = (data) => {
        console.log(data)
        const arr = data.map(el => ({...el, approved: false}))
        setOperations(arr);
    }
    useEffect(() => {
        onRequest();
    }, [])

    const calculation = () => {
        console.log("CACULATION", operations)
    }
    //Проверка если данные загрузились в стэйт
    useEffect(() => {
        console.log('operationos loaded to state', operations)
    }, [operations])

    const approveOperation = (el, index) => {
        setOperations(operations => operations.map((el, i) => (i === index ? ({...el, approved: !el.approved}) : el)))
        dispatch({type: "SET_SERVICE", payload: {[operations[index].id]: operations[index].approved}})
        console.log("SERVICES PICKED", servicesPicked)
    }
    function renderItems(arr) {
        const items = arr.map((typeOfOperation, index) => {

            let degree;         
            let measurment;

            if (typeOfOperation.unit.includes('2')) {
                measurment = typeOfOperation.unit.slice(0, typeOfOperation.unit.length - 1);
                degree = typeOfOperation.unit.slice(typeOfOperation.unit.length - 1)
            }

            return (    
                <li className='calculator__service-inner'>
                    <div className="parametr">
                        <p>{typeOfOperation.name + " "}
                            <span>{typeOfOperation.count} {measurment !== undefined ? measurment : typeOfOperation.unit}</span>
                            <span className='superscript secondary'>{degree !== undefined ? degree : null }</span>
                        </p>
                    </div>
                    <div className="calculator__parametr-checkbox">
                        <input 
                        key={typeOfOperation.id}
                        onClick={() => {
                            approveOperation(typeOfOperation, index)
                            calculation()
                        }} 
                        className="calculator__input-checkbox" 
                        type="checkbox" 
                        id="checkbox" 
                        checked={typeOfOperation.approved}/>
                    </div>      
                </li>
            )
        })

        return items;
    }

    const listOfOperations = renderItems(operations);

    return (
        <div>
            <div className="calculator__parametr">
                <div className="calculator__header-inner">
                <h3><u className='calculator__underline-text'>Название необходимых работ:</u></h3>
                </div>
            </div>
            <div className="calculator__list">
            <ul className='calculator__list-services'>
                {listOfOperations}
            </ul>
            </div>
            <div className="calculator__notes">
                <ul className='calculator__notes-list'>
                <p>Примечания:</p>
                <li>устанавливайте галочку напротив услуги, если она необходима</li>
                <li>рядом с услугой отображена <span>средняя</span> стоимость на текущий момент.Сюда входит работа и материал. Это может быть стоимость за квадратный или погонный метр, усредненная стоимость всей сантехники для ремонта и тд. Итоговый вариант может отличаться от выбранных вами материалов, но калькулятор даст вам понимание о стоимости ремонта среднего качества.</li>
                </ul>
            </div>
        </div>
    );
};

export default TabServices;