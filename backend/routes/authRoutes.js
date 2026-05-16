import { userSignup, loginUser, userProfile, getAllUser, logoutUser } from "../controller/authController.js";
import express from 'express'
import protect from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/signup', userSignup)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
// router.get('/' , protect)
router.get('/profile', protect, userProfile)
router.get('/users', getAllUser)


export default router