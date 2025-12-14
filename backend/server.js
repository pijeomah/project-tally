import express from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
dotenv.config()

 const app = express()
 const PORT = process.env.PORT || 5000

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY

)

app.use(cors())
app.use(express.json())

// Add this test route
app.get('/api/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(1)
    
    if (error) throw error
    
    res.json({ 
      success: true, 
      message: 'Database connection working!',
      data 
    })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    })
  }
})

app.get('/', (req, res) =>{
    res.json({message: 'Hello World'})

})

app.listen(PORT, ()=>{
    console.log(`Sever running on ${PORT}. Try catching it`)

})