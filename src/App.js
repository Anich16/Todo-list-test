import React from 'react';
import './App.scss';
import TodoFormContainer from "./redux/HOC/TodoFormContainer";
import TodoListContainer from "./redux/HOC/TodoListContainer";

function App() {
  return (
    <div className="App">
        <h1 className="title">ToDo List</h1>
        <TodoFormContainer/>
        <TodoListContainer/>
    </div>
  );
}

export default App;
