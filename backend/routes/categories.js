import express from  'express'
const router = express.Router()
import { getAll, createCategories,updateCategories, deleteCategories }from '../controllers/categories.js'
import { requireAuth } from '../middleware/auth.js'

router.get('/', requireAuth, getAll )
router.post('/create', requireAuth, createCategories)
router.put('/update/:id', requireAuth, updateCategories)
router.delete('/delete/:id', requireAuth, deleteCategories)



export default router
