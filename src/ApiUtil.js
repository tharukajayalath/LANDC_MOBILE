/**
 * Created by Tharuka Jayalath on 07/14/2018
 */
import {App} from './Constants';
const backendUrl = App.BACKEND_URL;

export const executGetApiCall= async(url)=>{
        try{
            const response = await fetch(backendUrl+url);
            const responseData = await response.json();
            return responseData;
        }catch (e) {
            console.log(e);
        }
    };
export const executePostApiCall = async(url, data)=>{
        try{console.log('data:',data);
            console.log(JSON.stringify(data));

            const response = await fetch(backendUrl+url,{
                method: 'POST',
                headers: {
                    Accept: 'applicaion/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            const responseData = await response.json();
            // console.log(responseData);
            console.log('################################333');
            console.log(responseData);
            return responseData;
        }catch (e) {
            console.log(e);
        }
    };

export const executePutApiCall= async(url, data)=>{
        try{
            const response = await fetch(backendUrl+url,{
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        }catch (e) {
            console.log(e);
        }
    };

