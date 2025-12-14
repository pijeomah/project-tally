// LoginPage

import  React, { useState }  from "react";
import {useAuth} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'




const LoginPage = ()=>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading ] = useState(false)
    const [error, setError] = useState(null)
    const {signIn} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setError('')
        if(!email || !password){
        setError('Please fill in all fields')
        return
        }
        setLoading(true)

        try {
            const {error} = await signIn(email, password)
            if(error){
                setError('Failed to Login. Please check your credentials')

            }else{
                navigate('/dashboard')
            }
        } catch (error) {
            setError("An unexpected error occurred")
        }finally{
            setLoading(false)
        }
    }

return(
    <div>
        <h1>Login</h1>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">
                <input id="email" value={email} type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label htmlFor="password">
                 <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            </label>
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
            </button> 
        </form>
    </div>
)
}

export default LoginPage