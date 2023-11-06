import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import TodoItemService from "../Services/TodoItemService";

function AddTodoItem(props) {
  const description = useRef();
  const dueDate = useRef();
  const [count, setCount] = useState(1);
  const [isEmptyDescription, setIsEmptyDescription] = useState(false);
  // const [isEmptyDueDate, setIsEmptyDueDate] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const displaySaveButton = () => {
    if (
      description.current.value.length !== 0
      // && dueDate.current.value.length !== 0
    ) {
      setIsSaveButtonEnabled(true);
    } else {
      setIsSaveButtonEnabled(false);
    }
  };

  const inputValidations = (choice) => {
    if (choice === "description") {
      setIsEmptyDescription(description.current.value === "");
    }
    // if (choice === "dueDate") {
    //   setIsEmptyDueDate(dueDate.current.value === "");
    // }
    displaySaveButton();
  };

  const resetTodoForm = (event) => {
    event.preventDefault();
    description.current.value = "";
    dueDate.current.value = "";
  };

  const todoFormSubmitted = (event) => {
    event.preventDefault();
    setCount(count + 1);
    const data = {
      desc: description.current.value,
      due: dueDate.current.value,
      id: count,
    };
    TodoItemService.addItem(data);
    props.onUpdateTodos();
    description.current.value = "";
    dueDate.current.value = "";
    setIsSaveButtonEnabled(false);
  };

  return (
    <>
      <div className="row mt-4 p-2">
        <div className="col">
          <h3>Add New Item</h3>
        </div>
        <hr />
      </div>
      <div className="row">
        <div className="col">
          <form>
            <div className="row">
              <div className="col-5">
                <TextField
                  id="txtDescription"
                  label="Description*"
                  variant="filled"
                  fullWidth
                  inputRef={description}
                  error={isEmptyDescription}
                  helperText={
                    isEmptyDescription ? "Please enter description*" : ""
                  }
                  onBlur={() => {
                    inputValidations("description");
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="mt-5"
                    id="pickerDueDate"
                    label="Due Date*"
                    inputVariant="filled"
                    inputRef={dueDate}
                    // error={isEmptyDueDate}
                    // helperText={
                    //   isEmptyDescription ? "Please enter Due Date*" : ""
                    // }
                  />
                </LocalizationProvider>
              </div>
            </div>
          </form>
          <div className="row mt-3">
            <div className="col">
              <button className="btn shadow mt-4" onClick={resetTodoForm}>
                Cancel
              </button>
              <button
                className="btn btn-primary shadow mt-4 mx-3"
                disabled={!isSaveButtonEnabled}
                onClick={todoFormSubmitted}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTodoItem;
