export const sanitizeInput = (req, res, next) => {

    try {
        if(!req.body || Object.keys(req.body).length === 0 ){
        return next()
    }
    function sanitize(value){
        if( typeof value === 'string'){
            return value.trim().replace(/<[^>]*>/g, '')
        }else if(Array.isArray(value)){
        for(let i = 0; i < value.length; i++){
            value[i] =sanitize(value[i])
            }
            return value
        }else if(typeof value === 'object'&& value !== null && !Array.isArray(value)){
        for(let key in value){
            value[key] = sanitize(value[key])
        }
        return value
        }else{return value}
    }
req.body = sanitize(req.body)
next()
    } catch (error) {
        if(error)return res.status(500).json({error: `Error processing request data`})
    }
    
}