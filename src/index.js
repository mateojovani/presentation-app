import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import './index.css'
import Main from './components/main/Main.jsx'

ReactDOM.render(
    <Provider store={configureStore()}>
        <Main />
    </Provider>,
    document.getElementById('root')
)
