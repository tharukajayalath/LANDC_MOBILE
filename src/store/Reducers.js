/**
 * Created by Tharuka Jayalath on 07/14/2018
 */
import {Pages} from '../Constants';
import Actions from './Actions';


const initialState = {
    currentPage: Pages.HOME_PAGE,
    users: null,
    orders: null
};


const adminPortal = (state = initialState, action)=>{

    switch (action.type){
        case Actions.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };

        case Actions.SET_ORDERS:
            return{
                ...state,
                orders: action.payload
            };

        case Actions.SET_USERS:
            return{
                ...state,
                users:action.payload
            };

        default:
            return state;
    }

};


export const setCurrentPage = (page)=>{
  return (dispatch)=>{
      dispatch({type: Actions.SET_CURRENT_PAGE, payload: page});
  }
};

export const setUsers = (users)=>{
    return (dispatch)=>{
        dispatch({type: Actions.SET_USERS, payload: users});
    }
};

export const setOrders = (orders) =>{
    return (dispatch)=>{
        dispatch({type: Actions.SET_ORDERS, payload: orders});
    }
};

export default  adminPortal;
