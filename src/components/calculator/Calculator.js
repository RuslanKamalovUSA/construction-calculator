import React, { useState } from 'react';
import TabRoomsArea from '../tabs/tab-rooms-area/TabRoomsArea';
import TabServices from '../tabs/tab-services/TabServices';

import Button from '../button/Button';

import '../calculator/calculator.scss'
//import { Link } from 'react-router-dom/cjs/react-router-dom';


const Calculator = () => {
    const [tabRoomsArea, setRoomsArea] = useState(true)

    // const changeActiveTab = (currentTarget) => {
    //     currentTarget.className += ' activeTab'
    //     console.log(currentTarget.className)
    // }

    let tabStyle = 'calculator__tab ';
    let activeTabStyle = 'calculator__tab activeTab';
    
    return (
            <div className="calculator">
                    <div className="calculator__tabs">
                    <div id='tab-one' className={!tabRoomsArea ? tabStyle : activeTabStyle} onClick={() => setRoomsArea(true)}>
                        <p>Площадь помещения</p>
                        </div>
                    <div id='tab-two'className={tabRoomsArea ? tabStyle : activeTabStyle} onClick={() => setRoomsArea(false)}>
                        <p>Необходимые работы</p>
                    </div>
                </div> 
                <div className="calculator__parametrs-inner">
                    <div className="calculator__parametrs">
                        {tabRoomsArea === true ? <TabRoomsArea/> : <TabServices/>}
                    </div>
                </div>                
                <div className='calculator__button-inner'>
                    <Button btnName={'Войти как администратор'} switchToRoute={"/main/calculator/login"} onClick={() => {}}></Button>
                </div>
            </div>
    );
};

export default Calculator;