import express from  'express'
const router = express.Router()
import { getAll, getOne, archive }from '../controllers/transactions.js'
import { requireAuth } from '../middleware/auth.js'

router.get('/', requireAuth, getAll )
router.get('/:id', requireAuth, getOne)
router.put('/:id', requireAuth, archive)
router.post('/create', requireAuth, createTransaction)

export default router
