export const validateUUID = (paramName = 'id') => {
    return (req,res,next) =>{
        const id = req.params[paramName]
        const UUIDregex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if(!id || !UUIDregex.test(id)){
            return res.status(400).json({error: `${paramName} is not a valid UUID`})
        }
         next()
    }

}