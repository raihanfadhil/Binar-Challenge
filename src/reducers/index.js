import { FETCHING_BOOK,
            FETCH_LOGIN,
                FETCHING_BOOK_SPESIFIC,
            FETCHING_DATA,
            FETCHING_DATA_SUCCESS,
            FETCHING_DATA_FAILURE,
            FETCHING_REGISTER} from "../types";

const initialState= {
    books:null,
    login:null,
    idbooks:null,
    data: null,
    name :null,
    username: '',
    password: '',
    token:null,
    dataFetched: false,
    isFetching: false,
    error: false,
    emailRegis:'',
    nameRegis:null,
    passwordRegis:'',
    ceklogin:'BELUM_LOGIN'
};


const TodosReducer = (state = initialState,action) => {
    switch(action.type){
            case FETCHING_BOOK:
            return{
                ...state,
                books:action.payload,
            };
            case FETCHING_BOOK_SPESIFIC:
            return{
                ...state,
                idbooks:action.bookSpesific,
            };

            case FETCH_LOGIN:
            return{
                ...state,
                login:action.payload,
            };
            case FETCHING_DATA:
            return {
                ...state,
                data: action.data,
                isFetching: true,
                username: action.username,
                name:action.name,
                password: action.password,
                token: action.token,
                ceklogin: "SUDAH_LOGIN"
            };
            case FETCHING_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload
            };
            case FETCHING_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
             
            case FETCHING_REGISTER:
            return {
                ...state,
                isFetching: false,
                emailRegis: action.usernameReg,
                nameRegis:action.nameReg,
                passwordRegis: action.passwordReg,
            };
            default:
                return state;
    }
};

export default TodosReducer

