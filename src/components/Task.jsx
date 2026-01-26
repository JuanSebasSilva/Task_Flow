export default function Task({ task, onCompleted, onEdit, onDelete }) {
  return (
    <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
        <div className="task-actions">
          <button className='btn-complete' onClick={() => onCompleted(task)}>❎</button>
          <button className='btn-edit' onClick={() => onEdit(task)}>✏️</button>
          <button className='btn-delete' onClick={() => onDelete(task.id)}>🚮</button>
        </div>
      </div>
    </div>
  )
}
