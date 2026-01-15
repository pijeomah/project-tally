export const sanitizeInput = (req, res, next) => {

    try {
        if(!req.body || Object.keys(req.body).length === 0 ){
        return next()
    }
    const sanitize = (value)=>{
        if( typeof value === 'string'){
            return value.trim()
            .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
        }else if(Array.isArray(value)){
            return value.map(item => sanitize(item))
        }else if(typeof value === 'object'&& value !== null && !Array.isArray(value)){
        Object.keys(value).forEach(key => {
                    value[key] = sanitize(value[key]);
                });
        return value
        }else{return value}
    }
req.body = sanitize(req.body)
next()
    } catch (error) {
        if(error)return res.status(500).json({error: `Error processing request data`})
    }
    
}