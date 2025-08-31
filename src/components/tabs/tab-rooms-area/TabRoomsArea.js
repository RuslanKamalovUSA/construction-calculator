import React, { useEffect, useMemo, useRef, useState } from 'react';

import '../tab-rooms-area/tabRoomsArea.scss';
import CalculatorService from '../../services/CalculatorService';
import { useDispatch, useSelector } from 'react-redux';

const TabRoomsArea = () => {

    const [roomsArea, setRoomsArea] = useState([]);
    const [heightValue, setHeightValue] = useState(0)

    const dispatch = useDispatch();
    //const roomsFromDataBase = useSelector(state => state.servicesFromDataBase.servicesFromDataBase[1])
    const roomsFromDataBase = useSelector(state => state.calculatorServiceReducer.baseServicesRooms[1] || [])
    const mainState = useSelector(state => state)

    const {getRoomsArea, error, loading, cleanError} = CalculatorService();

    const onRequest = () => {
      console.log("roomsFromDataBase", roomsFromDataBase)
      setRoomsArea(roomsFromDataBase)
      //getRoomsArea().then(onDataLoaded).catch(error => console.log(error))
    }

    const onDataLoaded = (data) => {
        setRoomsArea(data);
    }   

    const loadDatatoDataBase = () => {
        const arr = [
            {
              "name": "Гостинная",
              "value": 0,
              "id": "living_room"
            },
            {
              "name": "Гостинная кухней(студия)",
              "value": 0,
              "id": "living_room"
            },
            {
              "name": "Коридор №1",
              "value": 0,
              "id": "corridor_2"
            },
            {
              "name": "Коридор №2",
              "value": 0,
              "id": "corridor_2"
            },
            {
              "name": "Кухня",
              "value": 0,
              "id": "kitchen"
            },
            {
              "name": "Спальня №1",
              "value": 0,
              "id": "bedroom"
            },
            {
              "name": "Спальня №2",
              "value": 0,
              "id": "bedroom"
            },
            {
              "name": "Детская №1",
              "value": 0,
              "id": "kids_bedroom"
            },
            {
              "name": "Детская №2",
              "value": 0,
              "id": "kids_bedroom"
            },
            {
              "name": "Санузел (ванная или душ)",
              "value": 0,
              "id": "bathroom"
            },
            {
              "name": "Санузел (туалет)",
              "value": 0,
              "id": "restroom"
            },
            {
              "name": "Лоджия",
              "value": 0,
              "id": "balcony-lodgiya"
            },
            {
              "name": "Кладовая",
              "value": 0,
              "id": "storage"
            },
            {
              "name": "Балкон №1",
              "value": 0,
              "id": "balcony"
            },
            {
              "name": "Балкон №2",
              "value": 0,
              "id": "balcony"
            }
            ]
        fetch("http://localhost:5000/getData")    
    }
    
    useEffect(() => {
        onRequest()   
        updateData()
        //loadDatatoDataBase()
    }, [])

    useEffect(() => {
        console.log("MainState", mainState)
        updateData()
        updateHeight(heightValue)
    }, [roomsArea, heightValue])

    const updateData = () => {
        dispatch({type: "NEW_DATA", payload: roomsArea})
    }

    const updateHeight = (height) => {
        dispatch({type: "ADD_HEIGHT", payload: height})
    }
    
    const calculateArea = (arr) => {
        const squareArea = arr.reduce((a, b) => (a + b.value), 0) * heightValue;
    }

    const addHeight = (e) => {
        if (e.target.value.includes('-')) {
            setHeightValue(0)
        } else {
            setHeightValue(e.target.value)
        }
    }  

    // const inputRefs = useRef([]);

    // const onFocus = (e, index) => {
    //     inputRefs.current[index].focus();
    //     e.target.value = '';
    // }

    const handleChange = (e, index) => {
        const value = e.target.value.includes('-') ? 0 : e.target.value;
        setRoomsArea(roomsArea.map((el, i) => i === index ? {...el, value: Number(value)} : el))
        //console.log("ARR", arr)
        let roomArea = roomsArea.map(el => el.value).reduce((a, b) => a + b, 0)
        let name = [roomsArea[index].name]
        dispatch({type: "ADD_AREA", payload: {[name] : e.target.value}}) 
        // 
        //     
        // 
        //   console.log(totalArea)
    }

    // const handleBlur = (e, index) => {
    //     setRoomsArea(arr => arr.map((el, i) => i === index ? {...el, value: Number(e.target.value)} : el))
    // }

    function renderItems(arr){
      console.log(arr)
        const items = arr.map((typeOfRoom, index) => {
            return (
                    <li className='calculator__list-item'>
                        <div>
                            <label for="height">{typeOfRoom.name}</label>
                        </div>
                        <div className="calculator__title-height">
                            <input 
                            value={typeOfRoom.value} 
                            key={typeOfRoom.id} 
                            type="number" 
                            step="0.1" 
                            placeholder={0} 
                            className="calculator__input-height" 
                            onChange={e => {
                                handleChange(e, index)
                                }
                            }
                            onClick={(e) => e.target.value = ''}
                            //ref={el => inputRefs.current[index] = el} 
                            //  id="height" 
                            //min={0}   
                            // onFocus={e => calculateTotalArea(e)}
                            // onBlur={e => calculateTotalArea(e)}
                            />
                            <p className='calculator__title-height-par'>м</p>
                            <span className='superscript'>2</span>
                            
                        </div>  
                    </li>
            )
        })
        return items;
    }
    const listOfRoomsAreas = renderItems(roomsArea);

    return (
        <>
            <div className="calculator__parametr">
                <div className='calculator__list-inner'>
                    <div className='calculator__list-item' id='height-header'>
                        <div>
                            <label for="height">Высота потолков в квартире:</label>
                        </div>
                        <div className="calculator__title-height ">
                            <input 
                            value={heightValue} 
                            type="number" 
                            id="height" 
                            step="0.1"
                            min={0} 
                            placeholder={0.0}
                            className="calculator__input-height" 
                            onChange={(e) => addHeight(e)} 
                            onClick={(e) => e.target.value === heightValue ? null : e.target.value = ''}
                            ></input>
                            <p className='calculator__title-height-par'>м</p>
                            <span className='superscript'>2</span>
                        </div>  
                    </div>
                </div>
            </div>
            <div className="calculator__list">
                <h3><u className='calculator__underline-text'>Площадь отдельных комнат:</u></h3>
                <ul className='calculator__list-inner'>
                    {listOfRoomsAreas}
                </ul>
            </div>
            <div className="calculator__notes">
                <ul className='calculator__notes-list'>
                <p>Примечания:</p>
                <li>устанавливайте площадь помещений там, где необходим ремонт </li>
                <li>если есть дополнительные комнаты, например, Спальня №3, то добавляйте их площадь к существующим в калькуляторе</li>
                </ul>
            </div>
        </>
    );
};

export default TabRoomsArea;