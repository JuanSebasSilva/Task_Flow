import { useState } from 'react'
import '../styles/login.css'
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
    <div className="login-cont">
      <div className="login-card">
        <h2>Iniciar sesión</h2>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <p className="login-link">
          ¿No tienes cuenta?
          <Link to="/register"> Regístrate</Link>
        </p>
      </div>
    </div>
  )
}