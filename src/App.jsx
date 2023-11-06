import AddTodoItem from "./Components/AddTodoItem";
import Header from "./Components/Header";
import React, { useState } from "react";
import ShowTodoItems from "./Components/ShowTodoItems";
import TodoItemService from "./Services/TodoItemService";

function App() {
  const [todos, setTodos] = useState([]);
  const getAllTodos = () => {
    const todo = TodoItemService.getTodoItems();
    setTodos([...todo]);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <ShowTodoItems item={todos} onUpdateTodos={getAllTodos} />
        </div>
        <div className="col-6">
          <AddTodoItem onUpdateTodos={getAllTodos} />
        </div>
      </div>
    </>
  );
}

export default App;
