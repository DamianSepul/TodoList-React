
import { TaskRow } from "./TaskRow"
export const TaskTable = ({tasks,toggleTask,showCompleted=false,title}) =>{


    const taskTableRows = (doneValue) => {


        return(
            tasks
            .filter(task=>task.done===doneValue)
            .map(task => (
                <TaskRow task = {task} key={task.name} toggleTask={toggleTask}/>
              ))
        )
    }
    return (
        <table className="table table-dark table-striped table-bordered border-secondary">
        <thead>
          <tr className="table primary text-white">
            <th> {title}</th>
          </tr>
        </thead>
        <tbody>
            {taskTableRows(showCompleted)}
        </tbody>
      </table>
    )
}