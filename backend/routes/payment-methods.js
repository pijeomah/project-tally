import express from  'express'
import sanitizeInput from '../middleware/sanitizeInput.js'
import validateUUID from '../middleware/validateUUID.js'

const router = express.Router()
import { getAll, createPayment,updatePayment, deletePayment }from '../controllers/payment-methods.js'
import { requireAuth } from '../middleware/auth.js'

router.get('/', requireAuth, getAll )
router.post('/create', requireAuth, createPayment)
router.put('/:id', requireAuth, updatePayment)
router.delete('/:id', requireAuth, deletePayment)



export default router