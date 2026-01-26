export default function TaskForm({ createTask, title, onChangeTitle, description, onChangeDescription, editing }) {
  return (
    <form className='task-form' onSubmit={createTask}>
      <input type="text" placeholder='Titulo' value={title} onChange={onChangeTitle} />
      <textarea placeholder='Descripción' value={description} onChange={onChangeDescription} />
      <button type='submit'>{editing ? 'Guardar cambios' : 'Agregar tarea'}</button>
    </form>
  )
}
