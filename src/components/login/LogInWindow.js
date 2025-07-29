import React, { useEffect, useState } from "react";

import "../login/logInWindow.scss";
import Button from "../button/Button";
import { NavLink, useHistory } from "react-router-dom";

import { Formik } from "formik";
import CalculatorService from "../services/CalculatorService";
const LogInWindow = () => {

    const [adminsCredentials, setAdminCredentials] = useState([]); 
    const [admin, setAdmin] = useState('login')
    
    const [isActive, setIsActive] = useState(false); //стэйт для стиля с красной обводкой и дива с месседжем об ошибке в пароле и имени

    const {getAdminsCredentialsDB, error, loading, cleanError} = CalculatorService();

    const history = useHistory();

    useEffect(() => {
        onRequest();
    }, [])

    // useEffect(() => {
    //     console.log("ADMINS", adminsCredentials)
    //     console.log("admin state ===>>>", admin)
    // }, [adminsCredentials, admin])

    const onRequest = () => {
         //достаем имя и пароль из db.json
        getAdminsCredentialsDB().then(onLoaded).catch(err => console.log(err));
    }

    const onLoaded = (data) => {
        console.log(data.admins[0])
        const adminsCredentialsDB = data.admins[0]
        const adm = [];
        adm[0] = adminsCredentialsDB.login
        adm[1] = adminsCredentialsDB.password
        setAdminCredentials(data.admins[0])
        //console.log(adm)
    }
    

    function validateAdmin(name, password){
        const admin = adminsCredentials;
        let res;
        if ((admin.login === name) && (admin.password === password)) {
            res = true;
            console.log("Valid admin!!!", admin)
            setAdmin("admin")
        }
        return res
    }

    const handleClick = (event, handleSubmit) => {
        event.preventDefault();
        handleSubmit();
    }

    const inputStyle = `login__auth-input ${isActive ? 'redBorder' : ''}`

    return (
        <div>
            <div className="login__inner">
                <h3 class="login__title">Авторизация администратора</h3>
                <div className="login">
                <Formik
                    initialValues={{name: "", password: ""}}
                    validate={values => {
                        const errors = {};
                        // if ((values.name !== adminsCredentials[1].admin.login) || (values.password !== adminsCredentials[1].admin.password) || values.name.length > 20) {
                        //     errors.name = "Неверный логин или пароль"
                        //     errors.password = "Неверный логин или пароль"
                        //     inputStyle = 'login__auth-input redBorder'; 
                        // } 
                        if (values.name.length > 20) {
                            errors.name = "Неверный логин или пароль"
                            //errors.password = "Неверный логин или пароль"
                            //inputStyle = 'login__auth-input redBorder'; 
                        } 
                        // inputStyle ="login__auth-input";
                        // if (!values.name){
                        //     errors.name = "Required";
                        // } else if (
                        //     !/^[A-Za-zА-Яа-яЁё]+(?: [A-Za-zА-Яа-яЁё]+)*$/.test(values.name)
                        // ) {
                        //    errors.name = "Invalid name";
                        // }
                        // if (!values.password) {
                        //     errors.password = "Required";
                        // } else if (
                        //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)
                        // ) {
                        //     errors.password = "Password not strong enough!"
                        // }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('Submitting form')
                        setTimeout(() => {
                          alert(JSON.stringify(values, null, 2));
                          setSubmitting(false);
                        }, 400);
                        if (validateAdmin(values.name, values.password)) {
                            history.push('/main/calculator/admin')
                        } else {
                            setIsActive(true);  
                            //установить стиль с обводкой
                             // показать сообщение о неверном логине и пароле
                        }
                      }}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form 
                    className="login__form"
                    onSubmit={handleSubmit}
                    >
                        <label className="login__form-label">Логин</label>
                        <input 
                        className={inputStyle} 
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        />
                        
                        <label className="login__form-label">Пароль</label>
                        <input 
                        className={inputStyle} 
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        />
                        {errors.name && touched.name && <div className="login__required-password">{errors.name}</div>}
                        {isActive ? <div className="login__required-password">Неверный логин или пароль</div> : true} 
                        {/* //после валидации в случае отказа появляется див с сообщением */}
                        <div className="login__btn-inner">
                            <NavLink to={`/${admin}`} onClick={event => handleClick(event, handleSubmit)}>
                                <button className="login__auth-button" type="submit">Войти</button>
                            </NavLink>
                        </div>
                    </form>
                )}
                </Formik>
                </div>
            </div>
        </div>
    )
}

export default LogInWindow;  