import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState({
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
    unplanned: []
  });

  useEffect(() => {
    // Simulating initial tasks in 'Unplanned'
    const initialUnplannedTasks = Array.from({ length: 10 }, (_, index) => ({
      id: `task-${index + 1}`,
      content: `Unplanned Task ${index + 1}`
    }));
    setTasks(prevTasks => ({
      ...prevTasks,
      unplanned: initialUnplannedTasks
    }));
  }, []);

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, blockName) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const task = tasks[blockName].find(t => t.id === taskId);
    if (task) {
      // Remove from previous block
      const updatedTasks = {
        ...tasks,
        [blockName]: [...tasks[blockName], task],
        [task.block]: tasks[task.block].filter(t => t.id !== taskId)
      };
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="App">
      <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'today')}>
        <h2>Today</h2>
        {tasks.today.map(task => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.content}
          </div>
        ))}
      </div>
      <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'tomorrow')}>
        <h2>Tomorrow</h2>
        {tasks.tomorrow.map(task => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.content}
          </div>
        ))}
      </div>
      <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'thisWeek')}>
        <h2>This Week</h2>
        {tasks.thisWeek.map(task => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.content}
          </div>
        ))}
      </div>
      <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'nextWeek')}>
        <h2>Next Week</h2>
        {tasks.nextWeek.map(task => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.content}
          </div>
        ))}
      </div>
      <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'unplanned')}>
        <h2>Unplanned</h2>
        {tasks.unplanned.map(task => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
