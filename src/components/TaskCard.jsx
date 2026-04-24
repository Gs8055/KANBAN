import { useState } from "react";

function TaskCard({ task, deleteTask, moveTask, editTask }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  return (
    <div className={`task ${task.priority}`}>
      
      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            editTask(task.id, text);
            setEditing(false);
          }}
        />
      ) : (
        <p onClick={() => setEditing(true)}>{task.text}</p>
      )}

      <button className="delete" onClick={() => deleteTask(task.id)}>X</button>

      {task.status !== "todo" && (
        <button onClick={() => moveTask(task.id, "todo")}>To Do</button>
      )}

      {task.status !== "progress" && (
        <button onClick={() => moveTask(task.id, "progress")}>In Progress</button>
      )}

      {task.status !== "done" && (
        <button onClick={() => moveTask(task.id, "done")}>Done</button>
      )}
    </div>
  );
}

export default TaskCard;