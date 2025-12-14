import React, { createContext,useState,useEffect,useContext } from 'react'
import {supabase} from '../services/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


useEffect(()=> {
    const getSession= async ()=>{
        const {data : {session}} = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        setLoading(false)

    }
    getSession()

    const {data : {subscription} } = supabase.auth.onAuthStateChange((_event, session) =>{
        setUser(session?.user ?? null)
        setLoading(false)
    })
        return ()=> subscription.unsubscribe()

    }, [])

    const signUp = async(email, password ) =>{
        const response = await supabase.auth.signUp({
            email, 
            password
        })
        return response 
    }

     const signIn = async(email, password) => {
        const response = await supabase.auth.signInWithPassword({
            email,
            password
        })

        return response
    }

    const signOut = async()=>{
        const response = await supabase.auth.signOut()
        setUser(null)

        return response
    }
    const value = {
        user, 
        signUp, 
        signIn,
        signOut, 
        loading
    }

   

    return (
        <AuthContext.Provider value ={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> {
    return useContext(AuthContext)
}