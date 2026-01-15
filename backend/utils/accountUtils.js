// utils/accountUtils.js

const RANGES = {
    asset: { min: 1000, max: 1999 },
    liability: { min: 2000, max: 2999 },
    equity: { min: 3000, max: 3999 },
    income: { min: 4000, max: 4999 },
    expense: { min: 5000, max: 5999 }
};

export const generateNextAccountCode = async (supabase, userId, accountType) => {
    const typeKey = accountType.toLowerCase();
    const range = RANGES[typeKey];

    if (!range) throw new Error("Invalid account type for code generation");

    // 1. Find the highest code currently used by this user in this range
    const { data, error } = await supabase
        .from('accounts')
        .select('account_code')
        .eq('user_id', userId)
        .gte('account_code', range.min) // Greater than or equal to min
        .lte('account_code', range.max) // Less than or equal to max
        .order('account_code', { ascending: false })
        .limit(1)
        .maybeSingle(); // Use maybeSingle to handle 0 results gracefully

    if (error) throw error;

    // 2. Logic: If no accounts exist, start at min. Otherwise, increment max by 1.
    let nextCode;
    if (!data) {
        nextCode = range.min;
    } else {
        nextCode = parseInt(data.account_code) + 1;
    }

    // 3. Safety check: Did we run out of numbers?
    if (nextCode > range.max) {
        throw new Error(`Account limit reached for ${accountType}`);
    }

    return nextCode.toString();
};