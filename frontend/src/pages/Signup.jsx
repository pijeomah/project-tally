// Signup.jsx

import React, { useState }  from "react";
import {useAuth} from '../context/AuthContext'
import { useNavigate} from 'react-router-dom'


const SignupPage = ()=> {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { signUp} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e)=> {
        e.preventDefault()
        setError('')
        if(!email || !password){
            setError('Please fill in all the fields')
            return
        }
         setLoading(true)
    try {
        const { error} = await signUp(email, password)
        if(error){
            setError('Failed to Login, Please check your credentials')
        }else{
            navigate('/dashboard')
        }
    } catch (error) {
        setError(`An unexpected error occurred`)
    }finally{
        setLoading(false)
    }}

return(
    <div>
        <h1>
            Sign Up 
        </h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">
            <input type="email" name="" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}  />
            </label>
            <label htmlFor="password">
            <input type="password" name="" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
            </button>
        </form>
    </div>
)
}

export default SignupPage