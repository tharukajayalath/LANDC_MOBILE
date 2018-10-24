/**
 * Created by Tharuka Jayalath on 07/14/2018
 */
import {App} from './Constants';
const backendUrl = App.BACKEND_URL;

export const executGetApiCall= async(url)=>{
        try{
            const response = await fetch(backendUrl+url);
            const responseData = await response.json();
            console.log(response);
            console.log(responseData);
            return responseData;
        }catch (e) {
            console.log(e);
        }
    };
export const executePostApiCall = async(url, data)=>{
        try{
            console.log(JSON.stringify(data));

            const response = await fetch(backendUrl+url,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            

            return await response.json();
        }catch (e) {
            console.log(e);
        }

       /* return fetch(backendUrl+url,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json());*/


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

