import { useState } from 'react'
/* import '../styles/login.css' */
import { auth } from '../services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Campos obligatorios')
      return
    }

    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/tasks')
    } catch (err) {
      if (err.code === 'auth/invalid-credential') setError("Correo o contraseña invalidos")
      else if (err.code === 'auth/user-not-found') setError("Usuario inexistente")
      else setError("Error iniciando sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 w-[320px] rounded-lg shadow-lg">
        <h2 className='text-center mb-6 text-xl font-semibold'>Iniciar sesión</h2>

        {error && <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            className='w-full p-2.5 mb-4 border border-gray-300 rounded'
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
          />

          <input
            className='w-full p-2.5 mb-4 border border-gray-300 rounded'
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
          />

          <button className='w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-800 transition' type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta?
          <Link className='text-indigo-600 font-semibold hover:underline' to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}