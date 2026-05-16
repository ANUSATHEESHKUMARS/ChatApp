import { sentMessage ,getMessage , saveMessage} from "../controller/messageController.js";
import express from 'express'
import protect from "../middleware/authMiddleware.js";
const router = express.Router()

router.post('/send' ,protect, sentMessage)
router.get('/:id', protect , getMessage)
router.post('/save'  ,saveMessage)

export default router