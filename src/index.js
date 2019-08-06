import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TodoListReducer from "./redux/TodoListReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk"

const reducers = combineReducers({
    todoList: TodoListReducer
});

const middleware = applyMiddleware(thunk);

let store = createStore(reducers, middleware);

let renderPage = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById('root'));
};

renderPage();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
