import { ADD_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO, UPDATE_CHECKED, UPDATE_TIME, CANCEL_UPDATE} from './constant'
export const addTodo =(task)=>{
    return{
        type: ADD_TODO,
        payload: task
    }
}
export const deleteTodo = (taskId) => {
    return {
        type: DELETE_TODO,
        payload: taskId
    }
}
export const editTodo = (taskId,isEditing)=>{
    return{
        type: EDIT_TODO,
        payload: { taskId, isEditing}
    }
}

export const updateTodo = (taskId,isEditing, updatedTask)=>{
    return {
        type: UPDATE_TODO,
        payload: { taskId,isEditing, updatedTask }
    }
}

export const updateChecked=(taskId, checked)=>{
    return{
        type: UPDATE_CHECKED,
        payload: { taskId, checked }
    }
}

export const updateTime = (taskId, time) => {
    return {
        type: UPDATE_TIME,
        payload: { taskId, time }
    }
}

export const cancelUpdate = (taskId, isEditing)=>{
return {
    type: CANCEL_UPDATE,
    payload: { taskId, isEditing }
}
}
