import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../services/firebase"
/* import '../styles/singin.css' */

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 w-full max-w-md rounded-lg shadow-lg">
        <h2 className="text-center mb-6 text-gray-800 text-xl font-semibold">Registro de usuario</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSingin}>
          <input className="p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-indigo-600" type="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-indigo-600" type="password" placeholder="123abc" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="p-3 bg-indigo-600 text-white rounded-md text-base hover:bg-indigo-700 transition disabled:bg-indigo-300 disabled:cursor-not-allowed" type="submit" disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿Ya tienes cuenta?
          <Link className="text-indigo-600 font-semibold hover:underline" to="/login"> Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
