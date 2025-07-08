import {Router} from "express"
// curly braces mai import tbhi kr skte hai jb export mai bhi curly braces ho
// agar export default hai to import krte time curly braces nahi lagate
import { registerUser } from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(registerUser)
// router.route("/login").post(loginUser)

export default router