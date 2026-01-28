export default function Taskfilter({ filter, setFilter }) {
  return (
    <div className='mb-5'>
      <button className={`mr-2 px-3 py-1 border rounded-md transition ${filter === 'all' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-300 hover:bg-sky-100'}`} onClick={() => setFilter('all')}>Todas</button>
      <button className={`mr-2 px-3 py-1 border rounded-md transition ${filter === 'completed' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-300 hover:bg-sky-100'}`} onClick={() => setFilter('completed')}>Completas</button>
      <button className={`mr-2 px-3 py-1 border rounded-md transition ${filter === 'pending' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-300 hover:bg-sky-100'}`} onClick={() => setFilter('pending')}>Pendientes</button>
    </div>
  )
}
