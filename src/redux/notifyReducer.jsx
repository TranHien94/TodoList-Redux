import {
    ADD_TODO, DELETE_TODO, UPDATE_TODO,
    READY_ADD_TODO, ADD_SUCCESS, DELETE_SUCCESS, UPDATE_SUCCESS, UPDATE_CHECKED, HANDLE_CHECKED } from "./constant";


const initState= READY_ADD_TODO
const notify=(state=initState, action)=>{
    switch(action.type){
        case ADD_TODO:
            state = ADD_SUCCESS
            return state
        case DELETE_TODO:
            state = DELETE_SUCCESS
     
            return state
        case UPDATE_TODO:
            state = UPDATE_SUCCESS
        case UPDATE_CHECKED:
            state = HANDLE_CHECKED
            return state
        default:
            return state
    }
    
}
export default notify