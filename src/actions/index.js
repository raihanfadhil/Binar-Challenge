import axios from "axios";
import { FETCHING_BOOK,
            FETCHING_BOOK_SPESIFIC,
            FETCHING_BOOK_REC,
            FETCHING_DATA,
            FETCHING_REGISTER} from "../types";

export const getdataBook = (token) => {
    return async (dispatch) =>{
        const resTodos = await axios.get('http://code.aldipee.com/api/v1/books',
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        if (resTodos.data.results.length > 0){
            dispatch({
                type :FETCHING_BOOK,
                payload:resTodos.data.results}
               )
        }
    }
}

export const getdataBookRec = (token) => {
    return async (dispatch) =>{
        const resTodos = await axios.get('http://code.aldipee.com/api/v1/books?limit=6',
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        if (resTodos.data.results.length > 0){
            dispatch({
                type :FETCHING_BOOK_REC,
                booksrec:resTodos.data.results,
                avgRating:resTodos.data.results.average_rating
            }
               )
        }
    }
}

export const getdataBookSpecific = (token,id) => {
    return async (dispatch) =>{
        const ids = id
        const resTodosId = await axios.get('http://code.aldipee.com/api/v1/books/'+ids,
        {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        
            dispatch({
                type :FETCHING_BOOK_SPESIFIC,
                bookSpesific:resTodosId.data}
               )
        
    }
}

export function fetchingLogin(email,pass) {
    return (dispatch) => axios.post('http://code.aldipee.com/api/v1/auth/login', {
        "email": email,
        "password": pass
    }).then(resLogin => {
        // dispatch
        dispatch({
            type: FETCHING_DATA,
            data: resLogin.data,
            email: resLogin.email,
            password: resLogin.password,
            name: resLogin.data.user.name,
            token: resLogin.data.tokens.access.token
        });
    });
}

export function fetchingRegister(email,pass,name) {
    return (dispatch) => axios.post('http://code.aldipee.com/api/v1/auth/register', {
        "email": email,
        "password": pass,
        "name": name
    }).then(resRegis => {

        dispatch({
            type: FETCHING_REGISTER,
            nameReg: resRegis.name,
            usernameReg: resRegis.email,
            passwordReg: resRegis.password,
        });
    });
}

export function fetchingLoginTest(dataT) {
    return axios.post('http://code.aldipee.com/api/v1/auth/login',{dataT})     
}  
export function fetchingRegisterTest(dataR) {
    return axios.post('http://code.aldipee.com/api/v1/auth/register',{dataR})     
} 

export function fetchingBookTest(dataB) {
    return axios.get('http://code.aldipee.com/api/v1/books',
            {
                headers:{
                    "Authorization": `Bearer ${dataB}`
                }
            }
        );     
} 

export function fetchingBookDetailTest(token,id) {
    const ids = id
    return axios.get('http://code.aldipee.com/api/v1/books/6231453513c01e6f8b566ece',
        {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        );     
} 