import { ADD_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO, UPDATE_CHECKED, UPDATE_TIME, CANCEL_UPDATE } from '../redux/constant'
const initState = [
    {
        id: 1,
        title: 'Hit the gym', 
        description: '',
        image: '',
        file: '',
        checked: false,
        time: '', 
        isEditing: false
    },
    {
        id: 2,
        title: 'Pay bills',
        description: '',
        image: '',
        file: '',
        checked: true,
        time: '',
        isEditing: false
    },
    {
        id: 3,
        title: 'Meet George',
        description: '',
        image: '',
        file: '',
        checked: false,
        time: '',
        isEditing: false
    },
    {
        id: 4,
        title: 'Buy eggs',
        description: '',
        image: '',
        file: '',
        checked: false,
        time: '',
        isEditing: false
    },
    {
        id: 5,
        title: 'Read a book',
        description: '',
        image: '',
        file: '',
        checked: false,
        time: '',
        isEditing: false
    }
]
const todoReducer=(state=initState, action)=>{

    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload];

        case DELETE_TODO:
            return state.filter((task)=>task.id!= action.payload) 
        case EDIT_TODO:
            return state.map((task) => task.id == action.payload.taskId ? {
                ...task, isEditing: action.payload.isEditing
            }: task)
        case UPDATE_TODO:
            return state.map((task) => {
                if (task.id == action.payload.taskId) {
                    return {
                        ...task,
                        isEditing: action.payload.isEditing,
                        ...action.payload.updatedTask
                    };
                }
                return task;
            });
        case UPDATE_CHECKED:
            return state.map((task)=>{
                if(task.id==action.payload.taskId){
                    return{
                        ...task,
                        checked:action.payload.checked
                    }
                }
                return task 
            })
        case UPDATE_TIME:
            return state.map((task) => {
                if (task.id == action.payload.taskId) {
                    if (task.checked == true) {
                        return {
                            ...task,
                            time: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
                        }
                    } if(task.checked == false){
                        return {
                            ...task,
                            time:''
                        }
                    }
                }
                return task
                
            })
        case CANCEL_UPDATE:
            return state.map((task) => {
                if (task.id === action.payload.taskId) {
                    return {
                        ...task,
                        isEditing: action.payload.isEditing
                    };
                }
                return task;
            })

        default:
            return state;
    }
}

export default todoReducer