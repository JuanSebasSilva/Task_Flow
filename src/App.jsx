import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from './services/firebase'

import './styles/index.css'
import Tasks from './pages/Tasks'
import Login from './pages/Login.jsx'
import Signin from './pages/Signin'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <p>Cargando...</p>

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/signin' />}></Route>
        <Route path='/signin' element={!user ? <Signin /> : <Navigate to='/tasks' />}></Route>
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/tasks' />}></Route>
        <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/register" />} />
        <Route path='*' element={<Navigate to='/signin' />}></Route>
      </Routes>
    </Router>
  )
}

export default App