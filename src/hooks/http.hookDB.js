import { useDispatch, useSelector } from 'react-redux';

 const useHttpDB = (operations) => {
    const dispatch = useDispatch();
    dispatch({type: "CHANGE_PRICES", payload: operations})
}

export default useHttpDB;