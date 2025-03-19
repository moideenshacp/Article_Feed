import express from 'express'
import  { signIn, signUp, updateUserProfile } from '../controllers/authController'

const router = express.Router()

router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.patch('/update-profile', updateUserProfile)

export default router