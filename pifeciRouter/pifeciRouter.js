const controller = require("../pifeciController/pifeciController")

const express = require("express")
const router = express.Router()

router.get("/play/:choice", controller.play)
router.get("/score/ ", controller.scoreDisplay)
router.post("/reset/",  controller.reset)
router.put("/score/:wins/:loses/:ties", controller.cheat)

module.exports = router
