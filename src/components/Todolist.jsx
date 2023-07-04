import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo, updateTodo, updateChecked, updateTime, cancelUpdate } from '../redux/action'
import './Todolist.scss'

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


export default function Todolist() {
    const firebaseConfig = {
        apiKey: 'AIzaSyCbQA929Qt-sOyUzkc50WSQ7jtVLOrHsCI',
        authDomain: 'todolist-redux-131c5.firebaseapp.com',
        databaseURL: 'https://todolist-redux-131c5-default-rtdb.firebaseio.com/',
        projectId: 'todolist-redux-131c5',
        storageBucket: 'todolist-redux-131c5.appspot.com',
        messagingSenderId: '1053211425159',
        appId: '1:1053211425159:web:78993964af56e3b1d6bb22',
        measurementId: 'G-BDLK8CED19',
    };
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const storage=getStorage()
    
   
    
    const todoList = useSelector((state) => state.todoReducer)
    const dispatch = useDispatch() 
    const [inputTitle, setInputTitle]=useState('')
    const [inputDescription, setInputDescription]=useState('')
    const [inputImage, setInputImage] = useState(null)
    const handleInputImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`); 
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setInputImage((prev) => ({ ...prev, url })); 
                });
            });
        }
    };
    const [inputFile, setInputFile]=useState(null)
    const handleInputFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `files/${file.name}`);
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setInputFile((prev) => ({ ...prev, url }));
                });
            });
        }
    }
    const handleAddTask=()=>{
        const newTask={
            id: Date.now(),
            title: inputTitle,
            description: inputDescription,
            image: inputImage,
            file: inputFile,
            checked: false,
            time: '',
            isEditing: false
        }
        dispatch(addTodo(newTask))
       
  
        setInputTitle('')
        setInputDescription('')
        setInputImage(null)
        setInputFile(null)
    }
    const handleDeleteTask = (taskId) => {
        dispatch(deleteTodo(taskId))
    }
    const handleEditTask = (taskId)=>{
        dispatch(editTodo(taskId,true))
    }
 
    // edit: 
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editImage, setEditImage] = useState(null)
    const handleEditImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setEditImage((prev) => ({ ...prev, url }));
                });
            });
        }
    }
    const [editFile, setEditFile] = useState(null)
    const handleEditFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `files/${file.name}`);
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setEditFile((prev) => ({ ...prev, url }));
                });
            });
        }
    }
    const handleUpdateTask = (taskId, updatedTask) => {
        const editTask = {
            id: Date.now(),
            title: editTitle,
            description: editDescription,
            image: editImage,
            file: editFile,
        }
        dispatch(updateTodo(taskId, false, updatedTask = editTask))

        setEditTitle('')
        setEditDescription('')
        setEditImage(null)
        setEditFile(null)
    }
   
    //search:
    const [search, setSearch]=useState('')
const resultSearch = todoList.filter((task) => (task.title || 
            task.description).toLowerCase().includes(search.toLowerCase())
    
        )
    const handleToggerTask = (taskId, time)=>{
        const task = todoList.find((task) => task.id === taskId); 
        const updatedTask = { ...task, checked: !task.checked }; 
        dispatch(updateChecked(taskId, updatedTask.checked))
        dispatch(updateTime(taskId, time))

    }
   
    const handleCancelUpdate = (taskId, isEditing) => {
        dispatch(cancelUpdate(taskId, isEditing)); 
        setEditTitle('')
        setEditDescription('')
        setEditImage(null)
        setEditFile(null)
    };

   
  return (
    <>
          <div className="header text-center" >
              <h2>My To Do List</h2>
             
                <p>
                      <input type='text' placeholder='Type Title...'
                          value={inputTitle}
                          onChange={(e) => { setInputTitle(e.target.value) }}>
                      </input>
                      <input type='file' accept='image/*' placeholder='Add Image...'
                          onChange={handleInputImage}>
                      </input>
                </p>
                <p>
                      <input type='text' placeholder='Type Description...'
                          value={inputDescription}
                          onChange={(e) => { setInputDescription(e.target.value) }}>
                      </input>
                </p>
                  <p>
                      
                      <input type='file' multiple placeholder='Add File...'
                          onChange={handleInputFile}>
                      </input>
                  </p>
                  <p className="addBtn" onClick={handleAddTask}>ADD</p>
              <div className='total'>
                  <p>Total Task: {todoList.length}</p>
                  <p>Finished Tasks: {todoList.filter((task) => task.checked == true).length}</p>
                  <p>Unfinished Tasks: {todoList.filter((task) => task.checked == false).length}</p>
              </div>
             
                  <input type='text' placeholder='Search...'
                      value={search}
                      onInput={(e) => { setSearch(e.target.value) }}></input>
              
              
              
              
             
          </div>
          <table class="table table-success table-striped" >
            <thead>
                <tr >
                      <th scope="col" >No.</th>
                      <th scope="col" >Check</th>
                      <th scope="col" >Title</th>
                      <th scope="col" >Description</th>
                      <th scope="col" className="text-center">Image</th>
                      <th scope="col" className="text-center">File</th>
                      <th scope="col" className="text-center">Completion Time</th>
                      <th scope="col" className="text-center">Action</th>
                </tr>
            </thead>

              <tbody class="table-group-divider">
                  {resultSearch.map((task, index) => (
                      <tr key={task.id}>
                         
                              {task.isEditing ? (
                              <><td className="text-center align-middle" >{index+1}</td>
                                  <td>{task.checked}</td>
                                      <td><input type='text' placeholder='Type Title...'
                                          value={editTitle}
                                          onChange={(e) => { setEditTitle(e.target.value) }}>
                                      </input></td>
                                      <td><input type='text' placeholder='Type Description...'
                                          value={editDescription}
                                          onChange={(e) => { setEditDescription(e.target.value) }}>
                                      </input></td>
                                      <td>
                                          <input  type='file' placeholder='Add Image...'
                                              onChange={handleEditImage}>
                                          </input>
                                      </td>
                                      <td>
                                          <input type='file' placeholder='Add File...'
                                              onChange={handleEditFile}>
                                          </input>
                                      </td>
                                      <td></td>
                                      <td>
                                        
                                          <button onClick={() => handleUpdateTask(task.id)}>
                                              Update
                                          </button>
                                      <button onClick={() => handleCancelUpdate(task.id)}>
                                          Cancle
                                      </button>
                                      </td>                                     
                                 </>
                              ) : (
                                  <>
                                      <td >{index + 1}</td>
                                      <td className={task.checked == true ? 'checked' : ''}></td>
                                          <td>{task.title}</td>
                                          <td>{task.description}</td>
                                      <td className="text-center align-middle"> {task.image && (
                                          <a href={task.image.url}>
                                              {task.image.url.split('/').pop().split('.').slice(0, -1).join('.')}
                                          </a>
                                      )}</td>
                                      <td className="text-center align-middle">{task.file && (
                                          <a href={task.file.url}>
                                              {task.file.url.split('/').pop().split('.').slice(0, -1).join('.')}
                                          </a>
                                      )}</td>
                                      <td className="text-center align-middle"> {task.time}</td>
                                      <td className="text-center align-middle close0" ><span className='close1' onClick={() => handleEditTask(task.id)}>Edit</span>
                                          <span className='close' onClick={() => handleDeleteTask(task.id)}>Delete</span>
                                          <span className='close2' onClick={() => handleToggerTask(task.id)}>Check</span></td>
                                                 
                                  </>
                              )}
                         
                      </tr>
                  ))}
            </tbody>
             
          </table>
       
          
             
          
          

    
    </>
  )
}
