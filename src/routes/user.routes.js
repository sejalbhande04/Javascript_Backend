import {Router} from "express"
// curly braces mai import tbhi kr skte hai jb export mai bhi curly braces ho
// agar export default hai to import krte time curly braces nahi lagate
import { registerUser } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/register").post(
    upload.fields([
        {name: "avatar",
            maxCount: 1 // maxCount is used to limit the number of files uploaded for a field
        },
        {
            name: "coverImage",
            maxCount: 1
        },
    

    ]),
    registerUser)

// router.route("/login").post(loginUser)

export default router