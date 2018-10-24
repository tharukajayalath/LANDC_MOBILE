/**
 * Created by Tharuka Jayalath on 07/14/2018
 */
import {Pages} from '../Constants';
import Actions from './Actions';


const initialState = {
    currentPage: Pages.HOME_PAGE,
    users: null,
    orders: null,
    displayOrderGrid: false,
    fromTimeHours: null,
    fromTimeMinutes: null,
    toTimeHours:null,
    toTimeMinutes: null,
    fromDate: null,
    toDate: null,
    orderGridData: null,
    usersMap: null,
    ok: localStorage.getItem('ok')==='yes'
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

        case Actions.SET_USERS_MAP:
            return {
                ...state,
                usersMap: action.payload
            };

        case Actions.SET_ORDER_GRID_DATA:
            return {
                ...state,
                 orderGridData: action.payload
            };

        case Actions.SET_DISPLAY_ORDER_GRID:
            return{
                ...state,
                displayOrderGrid: action.payload
            };

        case Actions.SET_DATE_TIME:
            const name = action.payload.name;
            const value = action.payload.value;
            if(name === 'fromDate' || name=== 'toDate'){

                if(name === 'fromDate'){
                    // this.setState({fromDate: value});
                    return{
                        ...state,
                        fromDate: value
                    };
                }else{
                    // this.setState({toDate: value});
                    return{
                        ...state,
                        toDate: value
                    }
                }

            }else if(name === 'fromTime' || name === 'toTime'){
                if(name === 'fromTime'){
                    // this.setState({fromTimeHours: value.getHours(), fromTimeMinutes:value.getMinutes()});
                    return{
                        ...state,
                        fromTimeHours: value.getHours(),
                        fromTimeMinutes: value.getMinutes()
                    }
                }else{
                    // this.setState({toTimeHours: value.getHours(), toTimeMinutes:value.getMinutes()});
                    return{
                        ...state,
                        toTimeHours: value.getHours(),
                        toTimeMinutes: value.getMinutes()
                    }
                }
            }
            break;

        case Actions.SET_OK: {
            return{
                ...state,
                ok: action.payload
            }
        }

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

export const setDisplayOrderGrid  =(displayOrderGrid)=>{
    return (dispatch)=>{
        dispatch({type: Actions.SET_DISPLAY_ORDER_GRID, payload: displayOrderGrid});
    }
};

export const setDateTime = (data)=>{
    return (dispatch)=>{
        dispatch({type: Actions.SET_DATE_TIME, payload: data});
    };
};

export const setOrderGridData = (data)=>{
  return (dispatch)=>{
      dispatch({type: Actions.SET_ORDER_GRID_DATA, payload: data});
  }  ;
};

export const setUsersMap = (usersMap)=>{

    return (dispatch)=>{
        dispatch({type:Actions.SET_USERS_MAP, payload: usersMap});
    };
};

export const setOk = (value)=>{
    return(dispatch)=>{
        dispatch({type: Actions.SET_OK, payload: value});
    };
};

export default  adminPortal;
