export const validateAmount = (req,res,next)=> {
    const amount = req.body.amount
    if(amount === null || amount === undefined){
    return res.status(400).json({error: 'Amount is required'})
   }
    if(typeof amount !== 'number'){
         return res.status(400).json({error: `Amount must be a number`})
   }

   if(amount <= 0){
    return res.status(400).json({error:`Amount must be greater than 0`})
   }

   if(!Number.isInteger(amount) ){
    return res.status(400).json({error: `Amount must be an integer`})
   }
   
   next()
}