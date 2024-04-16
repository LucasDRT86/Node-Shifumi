const { scoreDisplay, update, cheat, play } = require("../pifeciController/pifeciController")

const express = require("express")
const router = express.Router()

router.get("/play/", play)
router.get("/score ", scoreDisplay)
router.post("/reset",  update)
router.put("/score/:wins/:loses/:ties", cheat)

module.exports = router
