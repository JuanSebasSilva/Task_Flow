import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../services/firebase"
import '../styles/singin.css'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSingin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert("Todos los campos deben ir llenos")
      return
    }

    if (password.length < 8) {
      alert("La longitud de la contraseña debe ser mayor a 8 caracteres")
      return
    }

    try {
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/tasks')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signin-cont">
      <div className="signin-card">
        <h2>Registro de usuario</h2>
        <form onSubmit={handleSingin}>
          <input type="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="123abc" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</button>
        </form>
        <p className="signin-link">
          ¿Ya tienes cuenta?
          <Link to="/login"> Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
