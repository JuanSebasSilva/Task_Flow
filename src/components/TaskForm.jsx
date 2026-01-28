export default function TaskForm({ createTask, title, onChangeTitle, description, onChangeDescription, editing }) {
  return (
    <form className='flex flex-col gap-3 mb-8' onSubmit={createTask}>
      <input className="p-3 border border-gray-300 rounded-md text-base" type="text" placeholder='Titulo' value={title} onChange={onChangeTitle} />
      <textarea className="p-3 border border-gray-300 rounded-md text-base resize-y min-h-[80px]" placeholder='Descripción' value={description} onChange={onChangeDescription} />
      <button className="self-start px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition" type='submit'>{editing ? 'Guardar cambios' : 'Agregar tarea'}</button>
    </form>
  )
}
