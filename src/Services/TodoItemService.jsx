const TodoItemService = {
  todoItemList: [],

  addItem: (item) => {
    TodoItemService.todoItemList.push(item);
  },

  deleteItem: (id) => {
    const index = TodoItemService.todoItemList.findIndex(
      (todo) => todo.id === id
    );
    if (index !== -1) {
      TodoItemService.todoItemList.splice(index, 1);
    }
  },

  getTodoItems: () => {
    return TodoItemService.todoItemList;
  },
};

export default TodoItemService;
