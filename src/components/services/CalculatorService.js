import { useHttp } from "../../hooks/http.hook";

const CalculatorService = () => {

    const {loading, request,  error, cleanError} = useHttp();

    const _baseApi = "https://open.er-api.com/v6/latest/USD"; // https://www.exchangerate-api.com/docs/free
    const _proxiApi = "http://localhost:3003/api/rates";
    const _operations = "http://localhost:3001/operations";
    const _squares = "http://localhost:3001/squares";
    const _admins = "http://localhost:3001/admins";
    const _adminsDB = "http://localhost:5000/getAdmins";
    const _dataBaseUrl = "http://localhost:5000/getData"

    const getCurrentUAHRate = async () => {
        console.log(_baseApi)
        const res = await request(_baseApi);
        return res.rates.UAH;
    }

    const getCurrentUAHRateProxy = async () => {
        const res = await fetch(_proxiApi)
        .then((responce) => responce.json())
        .then(data => data.rates.UAH)
        return res;
    }

    const getDataBase = async () => {
        const res = await request(_dataBaseUrl);
        return res;
    }

    const getOperations = async () => {
        const res = await request(_operations);
        return res;
    }

    const getRoomsArea = async () => {
        const res = await request(_squares);
        return res;
    }

    const getAdminsCredentials = async () => {
        const res = await request(_admins);
        return res;
    }

    const getAdminsCredentialsDB = async () => {
        const res = await request(_adminsDB);
        return res;
    }
    // const getRoomsArea = async () => {
    //     const res = await fetch(_squares)
    //     .then((responce) => responce.json())
    //     .then(data => data)
    //     return res;
    // }

    
    
    // const getCurrentUAHRate = () => {
    //     const res = fetch(_baseApi)
    //     .then((responce) => responce.json())
    //     .then(data => data.rates.UAH)
    //     return res;
    // }

    return {
        loading, 
        error, 
        cleanError,
        getCurrentUAHRate,
        getCurrentUAHRateProxy,
        getDataBase,
        getOperations,
        getRoomsArea,
        getAdminsCredentials,
        getAdminsCredentialsDB
    };
}

export default CalculatorService;