import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import configureStore from 'store/store'
import { taskCompleted, titleChanged, taskDeleted, loadTasks, getTasks, getTasksLoadingStatus } from 'store/task'
import { getError } from './store/error'
import { createTask } from './store/task'

const store = configureStore()

function App (params) {

    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    }, [])

    const newTask = {
        title: 'Some new task',
        completed: false,
    }

    const completeTask = id => dispatch(taskCompleted(id))
    const changeTitle = id => dispatch(titleChanged(id))
    const deleteTask = id => dispatch(taskDeleted(id))
    const addTask = () => dispatch(createTask(newTask))

    if (isLoading)
        return <h1>Loading...</h1>

    if (error)
        return <p>{error}</p>

    return (
        <>
            <h1>App</h1>
            <div>
                <button onClick={addTask}>Add task</button>
            </div>
            <ul>
                {
                    state.map(el => {
                        return (
                            <li key={el.id}>
                                <p>{el.title}</p>
                                <p>Completed: {el.completed.toString()}</p>
                                <button onClick={() => completeTask(el.id)}>Complete</button>
                                <button onClick={() => changeTitle(el.id)}>Change title</button>
                                <button onClick={() => deleteTask(el.id)}>Delete</button>
                                <hr/>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
