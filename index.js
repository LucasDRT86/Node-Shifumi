const express = require("express")
const app = express()
const pifeciRouter = require("./pifeciRouter/pifeciRouter")

app.use(express.json())

app.listen(3000, () => {
    console.log('App running on port 3000');
  });

app.use("/product", pifeciRouter)