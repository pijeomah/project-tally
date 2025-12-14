import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useAuth} from './context/AuthContext'

function App() {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] =useState(true)
  const [error, setError] = useState(null)
   

  const fetchData = async()=>{
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const response = await fetch(apiUrl)
      const data = await response.json()
     
      setMessage(data.message)
      setLoading(false)

    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return(
    <div>
      <h1>
        Backend Test
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {message && <p>Message from the backend: {message}</p>}
    </div>
  )
  
}

export default App
