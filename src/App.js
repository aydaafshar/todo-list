import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [todos, setDotos] = useState([]);
  const [todo, setDoto] = useState("");
  useEffect(() => {
    const stordTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setDotos(stordTodos);
  }, []);
  useEffect(() => {
    if (todos.length === 0) {
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    if (todo.trim() !== "") {
      const newTodos = [...todos, { text: todo, completed: false }];
      setDotos(newTodos);
      setDoto("");
    }
  }

  function removeTodo(idx) {
    const newTodo = todos.filter((todo, i) => idx !== i);
    setDotos(newTodo);
  }

  function completedTodo(idx) {
    const newTodos = [...todos];
    newTodos[idx].completed = !newTodos[idx].completed;
    setDotos(newTodos);
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form id="form" onSubmit={addTodo}>
        <input
          type="text"
          id="text"
          className="text"
          placeholder="enter your todo"
          autoComplete="off"
          value={todo}
          onChange={(e) => setDoto(e.target.value)}
        />
        <ul className="todos" id="todos">
          {todos.map((task, idx) => (
            <li
              key={idx}
              onClick={() => completedTodo(idx)}
              onContextMenu={() => removeTodo(idx)}
              className={task.completed ? "completedd" : ""}
            >
              {task.text}
            </li>
          ))}
        </ul>
      </form>

      <small>
        left click to toggle complete <br />
        right click to delete
      </small>
    </div>
  );
}

export default App;
