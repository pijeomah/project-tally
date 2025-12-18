import supabase from '../config/supabase.js'

// Helper function for account id
const getAccountId = async(userId) => {
    
    const {data : account, error} = await supabase
        .from('accounts')
        .select('id')
        .eq('user_id', userId)
        .single()
        console.log("SEARCH RESULT:", account)
            if(!account || error){
                return null
            }
            return account.id
        
}
export const getAll = async (req, res) => {
        try {
            const userId = req.user.id
            const accountId = await getAccountId(userId)
            if(!accountId) return res.status(404).json({error: 'Account not found'})
            const {data, error} = await supabase
                    .from('categories')
                    .select('*')
                    .eq('account_id', accountId)
                     if(error){ res.status(500).json({error: error.message})}
                else res.status(200).json(data)
        } catch (error) {
            console.error("CRASH REPORT:", error.message)
           res.status(500).json({error: 'An unexpected error occurred'})

        }
    }

export const createCategories = async(req,res) =>{
    const {name, type, is_active} = req.body
    const authUserId = req.user.id
    if(!name || !type){
        return res.status(400).json({error: 'Name and type are required'})

    }
        try {
            const {name, type} = req.body
            if (!name || !type) {
            return res.status(400).json({ error: 'Name and type are required' })
        }
            const accountId = await getAccountId(authUserId)
            if (!accountId) return res.status(404).json({ error: 'Account not found' })
           
            const {data, error} = await supabase
                .from('categories')
                .insert([
                    {
                        name,
                        type,
                        account_id: accountId,
                        user_id: authUserId, 
                        is_active: is_active !== undefined ? is_active : true,
                        is_system: false,


                    }
                ])
                .select()
                .single()
                if (error) return res.status(500).json({ error: error.message })
        return res.status(201).json(data)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
}


export const updateCategories = async(req,res)=> {
        try {
            const {id} = req.params
            const userId = req.user.id

                const accountId = await getAccountId(userId)
                if(!accountId){
                    return(res.status(500).json({error: 'Unauthorized user account'}))
                }

            const { data,error } = await supabase 
            .from('categories')
            .update(req.body)
            .eq('id', id)
            .eq('account_id', accountId)
            .select()
            .single()
            if(error){
                res.status(500).json({error: 'Internal server occurred'})
            }else{
                return res.status(200).json(data[0])
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }

}

export const deleteCategories = async(req,res)=> {
    try {
        
        const {id} = req.params
        const userId = req.user.id
        const accountId = await getAccountId(userId)
        if (!accountId) return res.status(404).json({ error: 'Account not found' })
                const { data,error } = await supabase 
            .from('categories')
            .update({is_active: false})
            .eq('id', id)
            .eq('account_id', accountId)
            .select()
             if(error){
                res.status(500).json({error: 'Internal server occurred'})
            }else{
                return res.status(200).json(data[0])
            }

    } catch (error) {
         res.status(500).json({error: error.message})
    }

}