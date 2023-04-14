import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { initiateStore } from 'store/store'
import * as Actions from 'store/actions'

const store = initiateStore()

function App (params) {
    let subscribed = false
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        if (!subscribed) {
            store.subscribe(() => {
                setState(store.getState())
            })
            subscribed = true
        }
    }, [])

    const completeTask = id => store.dispatch(Actions.taskCompleted(id))
    const changeTitle = id => store.dispatch(Actions.titleChanged(id))
    const deleteTask = id => store.dispatch(Actions.taskDeleted(id))

    return (
        <>
            <h1>App</h1>
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
        </>)
}

ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, document.getElementById('root'))
