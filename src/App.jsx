import './App.css'
import { useState, useEffect } from "react";
import Column from "./components/Column";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input,
      status: "todo",
      priority
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  return (
    <div className="app-container">
      <h1>Kanban Board</h1>

      <div className="controls">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task"
        />

        <select onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button onClick={addTask}>Add</button>
      </div>

      <div className="board">
        <Column title="To Do" status="todo" tasks={tasks} deleteTask={deleteTask} moveTask={moveTask} editTask={editTask} />
        <Column title="In Progress" status="progress" tasks={tasks} deleteTask={deleteTask} moveTask={moveTask} editTask={editTask} />
        <Column title="Done" status="done" tasks={tasks} deleteTask={deleteTask} moveTask={moveTask} editTask={editTask} />
      </div>
    </div>
  );
}

export default App;