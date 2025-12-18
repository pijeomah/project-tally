import express from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'
import categoriesRoutes from './routes/categories.js'
import authRoutes from './routes/auth.js'
// import transactionRoutes from './routes/transactions'
// import accountsRoutes from './routes/accounts'
// import transactionLinesRoutes from './routes/transaction-lines'
// import paymentMethodRoutes from './routes/payment-methods'
import  supabase  from './config/supabase.js'


dotenv.config()

 const app = express()
 const PORT = process.env.PORT || 5000


app.use(cors())
app.use(express.json())



app.get('/', (req, res) =>{
    res.json({message: 'Hello World'})

})


app.use('/api/auth', authRoutes)
app.use('/api/categories', categoriesRoutes)
// app.use('/api/transactions', transactionRoutes)
// app.use('/api/transaction-lines', transactionLinesRoutes)
// app.use('/api/accounts', accountsRoutes)
//app.use('/api/payment-methods', paymentMethodRoutes)

// Server Error handling
app.use((err, req,res,next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})


app.use((req,res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

app.listen(PORT, ()=>{
    console.log(`Sever running on ${PORT}. Try catching it`)

})