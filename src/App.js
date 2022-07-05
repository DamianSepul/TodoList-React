import { useState ,useEffect } from 'react';
import './App.css';
import {TaskCreator} from './components/TaskCreator'
import {TaskTable} from './components/TaskTable'
import {VisibilityControl} from './components/VisibilityControl'
import {Container} from './components/Container'


function App() {

  const [taskItems,setTasksItems] = useState ([])
  const [showCompleted,setShowCompleted]=useState(false)

  function createNewTask(taskName){
    if (!taskItems.find(task => task.name ===taskName)){
      setTasksItems([...taskItems,{name:taskName ,done:false}])
    }else{
      alert('Esa tarea ya existe padrino')
    }
  }

  const toggleTask = task => {
    setTasksItems(taskItems.map(t => (t.name === task.name)? {...t, done: !t.done}:t))
  }

  useEffect(()=>{
    let data = localStorage.getItem('tasks')
    if (data){
      setTasksItems(JSON.parse(data))
    }
  },[])

  const clearTask = () => {
    setTasksItems(taskItems.filter(task => !task.done ))
    setShowCompleted(false)
  }

  useEffect(()=> {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  },[taskItems])

  return (
    <main className="bg-dark vh-100 text-white">
        <Container>
        <TaskCreator createNewTask={createNewTask} />

<TaskTable tasks={taskItems} toggleTask={toggleTask} title={'Tasks Todo List'} />

<VisibilityControl
  isChecked={showCompleted}
  setShowCompleted={(checked) => setShowCompleted(checked)}
  clearTask={clearTask}
/>

{showCompleted === true && (
  <TaskTable
    tasks={taskItems}
    toggleTask={toggleTask}
    showCompleted={showCompleted}
    title={'Completed Tasks'}
  />
)}
        </Container>
    </main>
  );
}

export default App;
