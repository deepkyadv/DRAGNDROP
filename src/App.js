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

  const handleDragStart = (event, taskId, blockName) => {
    event.dataTransfer.setData('text/plain', taskId);
    event.dataTransfer.setData('blockName', blockName);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, blockName) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const sourceBlock = event.dataTransfer.getData('blockName');

    if (sourceBlock !== blockName || blockName === 'unplanned') {
      const task = tasks[sourceBlock].find(t => t.id === taskId);
      if (task) {
        // Remove from source block
        const updatedSourceBlock = tasks[sourceBlock].filter(t => t.id !== taskId);

        // Calculate the drop index
        const dropTarget = event.target.closest('.task') || event.target.closest('.block');
        const dropPosition = event.clientY - dropTarget.getBoundingClientRect().top;

        let dropIndex;
        if (dropTarget.className.includes('task')) {
          // Dropping on a task element
          const taskHeight = dropTarget.clientHeight;
          dropIndex = Array.from(dropTarget.parentElement.children).indexOf(dropTarget);
          if (dropPosition > taskHeight / 2) {
            dropIndex++;
          }
        } else {
          // Dropping in an empty block or at the top of the block
          dropIndex = Array.from(dropTarget.children).findIndex(
            child => event.clientY < child.getBoundingClientRect().top
          );
          if (dropIndex === -1) {
            dropIndex = tasks[blockName].length;
          }
        }

        const updatedTargetBlock = [...tasks[blockName]];
        updatedTargetBlock.splice(dropIndex, 0, task);

        // Add to the target block
        const updatedTasks = {
          ...tasks,
          [blockName]: updatedTargetBlock,
          [sourceBlock]: updatedSourceBlock
        };

        setTasks(updatedTasks);
      }
    }
  };

  return (
    <>    
    <div className='drag'>
    <h1>Task 5: Drag N Drop</h1>
    </div>
    <div className="App">
    <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'today')}>
        <h2>Today</h2>
        {tasks.today.map((task, index) => (
          <div key={task.id} className="task" draggable onDragStart={(e) => handleDragStart(e, task.id, 'today')}>
            {task.content}
          </div>
        ))}
      </div>
      <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'tomorrow')}>
        <h2>Tomorrow</h2>
        {tasks.tomorrow.map((task, index) => (
          <div key={task.id} className="task" draggable onDragStart={(e) => handleDragStart(e, task.id, 'tomorrow')}>
            {task.content}
          </div>
        ))}
      </div>
      <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'thisWeek')}>
        <h2>This Week</h2>
        {tasks.thisWeek.map((task, index) => (
          <div key={task.id} className="task" draggable onDragStart={(e) => handleDragStart(e, task.id, 'thisWeek')}>
            {task.content}
          </div>
        ))}
      </div>
      <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'nextWeek')}>
        <h2>Next Week</h2>
        {tasks.nextWeek.map((task, index) => (
          <div key={task.id} className="task" draggable onDragStart={(e) => handleDragStart(e, task.id, 'nextWeek')}>
            {task.content}
          </div>
        ))}
      </div>
      <div className="block" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'unplanned')}>
        <h2>Unplanned</h2>
        {tasks.unplanned.map((task, index) => (
          <div key={task.id} className="task" draggable onDragStart={(e) => handleDragStart(e, task.id, 'unplanned')}>
            {task.content}
          </div>
        ))}
      </div>
    </div>
    </>

  );
}

export default App;
