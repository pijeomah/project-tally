import supabase from '../config/supabase.js'
import { generateNextAccountCode } from '../utils/accountUtils.js';

export const getAll = async(req,res)=> {
    try {
        const userId = req.user.id
        const {data,error} = await supabase 
            .from('accounts')
            .select('*')
            .eq('user_id', userId)
            .order('type', {ascending: true})
            .order('name', {ascending: true})
            .select()

            res.status(200).json({data: 'Request successful'})

    } catch (error) {
       res.status(500).json({error: error.message}) 
    }

}

export const getOne =  async(req,res)=> {
   try {
         const accountId = req.params.id
    const userId = req.user.id
    const { data: accountData, error: accountError } = await supabase
            .from('accounts')
            .select('*')
            .eq('id', accountId)
            .eq('user_id', userId)
            .single()

        if(error?.code === 'PGRST116' || !data){
            return res.status(404).json({error:`Account not found`})
        }

        return res.status(200).json({data: 'Account found!'})

   } catch (error) {
    res.status(500).json({error: error.message}) 
   }
 
}

export const createAccount = async(req,res)=> {
    try {
        const userId = req.user.id
        const {
           
            created_at, 
            account_code,
            account_name,
            account_type,
        } = req.body

        if(!account_name || !account_type || !account_code){
            return res.status(400).json({error: 'Account name, type or code are required'})
        }

        const validTypes = ['asset', 'liability', 'equity', 'income', 'expense']
        if( !validTypes.includes(account_type.toLowerCase())){
            return res.status(400).json({error:`Invalid account type. Must be one of: ${validTypes.join(', ')}` })
        }
        if (!account_code) {
            try {
                // Pass the supabase client, user ID, and type
                account_code = await generateNextAccountCode(supabase, userId, account_type);
            } catch (genError) {
                return res.status(400).json({ error: genError.message });
            }
        }
        const normal_balance = ['asset', 'expense'].includes(account_type.toLowerCase()) ? 'debit' : 'credit';
         
        const {data: accountData, error: accountError} = await supabase
                .from('accounts')
                .insert({
                    user_id: userId,
                    created_at, 
                    account_code,
                    account_name,
                    account_type: account_type.toLowerCase(),
                    normal_balance,
    
                })
                .select()
                .single()
                if(accountError) {
                    if(accountError.code === '23505'){
                        return res.status(409).jsom({error:`An account with this code already exists `})
                    }
                    throw accountError
                }
                return res.status(201).json({
                    message: 'Account created ',
                    account: accountData})
        
    } catch (error) {
        console.error("Account Error:", error.message);
    res.status(500).json({ error: error.message });
    }

}