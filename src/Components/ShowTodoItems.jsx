import Checkbox from "@mui/material/Checkbox";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import TodoItemService from "../Services/TodoItemService";

function ShowTodoItems(props) {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [filterTodo, setFilterTodo] = useState("");
  const [hovered, setHovered] = useState(false);

  const filteredTodos = props.item.filter((todo) =>
    todo.desc.toLowerCase().includes(filterTodo.toLowerCase())
  );

  const todos = filteredTodos.map((todo) => {
    const isCompleted = completedTodos.includes(todo.id);
    return (
      <tr
        className={isCompleted ? "text-decoration-line-through" : "none"}
        key={todo.id}>
        <td>{todo.desc}</td>
        <td>{todo.due}</td>
        <td>
          <Checkbox
            className="text-dark"
            checked={isCompleted}
            onChange={() => todoCompleted(todo.id)}
          />
        </td>
        <td>
          <IconButton
            aria-label="delete"
            size="large"
            className={`${hovered ? "text-dark opacity-100" : "opacity-0"}`}
            onMouseOver={() => {
              setHovered(true);
            }}
            onMouseOut={() => {
              setHovered(false);
            }}>
            <DoNotDisturbOnIcon onClick={() => removeTodoItem(todo.id)} />
          </IconButton>
        </td>
      </tr>
    );
  });

  const removeTodoItem = (id) => {
    TodoItemService.deleteItem(id);
    props.onUpdateTodos();
  };

  const todoCompleted = (id) => {
    if (completedTodos.includes(id)) {
      setCompletedTodos(completedTodos.filter((todoId) => todoId !== id));
    } else {
      setCompletedTodos([...completedTodos, id]);
    }
  };

  return (
    <>
      <div className="row p-2">
        <div className="col">
          <h3>ToDo Items</h3>
        </div>
      </div>
      <hr />
      <div className="row p-2 mx-1">
        <div className="col">
          <form>
            <TextField
              id="filled-basic"
              label="Todo Filter"
              variant="filled"
              value={filterTodo}
              onChange={(e) => setFilterTodo(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-10">
          <table className="table table-striped table-borderless">
            <thead>
              <tr>
                <th>Description</th>
                <th>Due Date</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{todos}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ShowTodoItems;
