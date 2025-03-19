import express from 'express'
import  { signIn, signUp, updateUserProfile } from '../controllers/authController'
import { authenticate } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.patch('/update-profile',authenticate, updateUserProfile)

export default router