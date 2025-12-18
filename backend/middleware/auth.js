import  supabase  from '../config/supabase.js'

export const requireAuth = async(req, res, next) => {
        
try {
    const authHeader = req.headers.authorization
        if(!authHeader) return res.status(401).json({error: 'Authorization token required'})
    const token = authHeader.split(' ')[1]
    console.log("1. Token received:", token.substring(0, 10) + "...")
    const { data: { user }, error} = await supabase.auth.getUser(token)
    console.log("2. Supabase User found?", user ? "YES" : "NO")
    if(error || !user){
         console.log("3. Error:", error?.message)
        return res.status(401).json({error: 'Request is not authorized'})
    }
    req.user = user
    console.log("4. User authenticated:", user.email)
    next()
} catch (error) {
    res.status(401).json({ error: 'Request is not authorized' })
}
}