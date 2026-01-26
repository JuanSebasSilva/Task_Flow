export default function Taskfilter({ filter, setFilter }) {
  return (
    <div className='task-filters'>
      <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Todas</button>
      <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completas</button>
      <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pendientes</button>
    </div>
  )
}
