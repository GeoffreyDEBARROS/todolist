import React, { useState, useEffect } from "react";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks((prevTasks) => [...prevTasks, task]);
    localStorage.setItem("task", task);
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
    setTask("");
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const deleteTask = (index) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task, i) => i !== index);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  return (
    <div className="home">
      <div className="title">
        <h1>To Do List</h1>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Faire la vaisselle..."
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>
      <div className="task-container">
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <div className="btn-container">
                {/* <button id="task-done">Fait</button> */}
                <button id="delete-task" onClick={() => deleteTask(index)}>
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
