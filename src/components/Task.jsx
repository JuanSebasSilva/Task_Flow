export default function Task({ task, onCompleted, onEdit, onDelete }) {
  return (
    <div key={task.id} className={`p-4 rounded-md bg-gray-50 border border-gray-200 ${task.completed ? ' p-4 rounded-md bg-emerald-50 border border-gray-200 line-through text-gray-500' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
        <div className="flex gap-2">
          <button className='px-3 py-1.5 text-sm rounded cursor-pointer bg-blue-500 text-white hover:opacity-85' onClick={() => onCompleted(task)}>❎</button>
          <button className='px-3 py-1.5 text-sm rounded cursor-pointer bg-amber-500 text-white hover:opacity-85' onClick={() => onEdit(task)}>✏️</button>
          <button className='px-3 py-1.5 text-sm rounded cursor-pointer bg-red-500 text-white hover:opacity-85' onClick={() => onDelete(task.id)}>🚮</button>
        </div>
      </div>
    </div>
  )
}
