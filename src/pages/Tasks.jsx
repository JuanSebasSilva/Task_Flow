import { useEffect, useState } from 'react'
import { auth, db } from '../services/firebase'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import '../styles/tasks.css'
import { signOut } from 'firebase/auth'
import TaskForm from '../components/TaskForm'
import Task from '../components/Task'
import Taskfilter from '../components/Taskfilter'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all')

  const user = auth.currentUser

  // LISTAR TAREAS
  useEffect(() => {
    if (!user) return

    const userTasks = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    )

    const unsubscribe = onSnapshot(userTasks, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setTasks(tasksData)
    })

    return () => unsubscribe()
  }, [user])

  // AGREGAR TAREAS
  const createTask = async (e) => {
    e.preventDefault()

    if (!title || !description) {
      alert("Todos los campos deben ser llenados")
      return
    }

    if (editingId) {
      const taskRef = doc(db, "tasks", editingId)
      await updateDoc(taskRef, { title, description })
      setEditingId(null)
    } else {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        completed: false,
        createAt: serverTimestamp(),
        userId: user.uid
      })
    }

    setTitle('')
    setDescription('')
  }

  const taskCompleted = async (task) => {
    const taskRef = doc(db, 'tasks', task.id)
    await updateDoc(taskRef, {
      completed: !task.completed
    })
  }

  //EDITAR TAREA
  const taskEdit = (task) => {
    setEditingId(task.id)
    setTitle(task.title)
    setDescription(task.description)
  }

  // ELIMINAR TAREA
  const deleteTask = async (id) => {
    if (!confirm("¿Deseas eliminar esta tarea?")) return
    await deleteDoc(doc(db, "tasks", id))
  }

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className='tasks-cont'>
      <h2>TAREAS</h2>

      <TaskForm
        title={title}
        description={description}
        editing={!!editingId}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeDescription={(e) => setDescription(e.target.value)}
        createTask={createTask}
      />

      <Taskfilter filter={filter} setFilter={setFilter} />

      <div className='task-list'>
        {tasks.length === 0 && <p>No hay tareas</p>}
        {tasks.filter(task => {
          if (filter === 'completed') return task.completed
          if (filter === 'pending') return !task.completed
          return true
        }).map(task => (
          <Task
            key={task.id}
            task={task}
            onCompleted={taskCompleted}
            onEdit={taskEdit}
            onDelete={deleteTask}
          />
        ))}
      </div>
      <button className='logout-btn' onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  )
}
