import config from "./config.js"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import "./connect-db.js"
import userRouter from "./routes/user.router.js"
import postRouter from "./routes/post.router.js"
// import commentRouter from "./routes/comments.router.js"
import { errorHandler404, errorHandlerGeneric } from "./lib/error-handler.js"
import commentRouter from "./routes/comment.router.js"

const app = express()

app.use(morgan("dev")) // log all requests to API
app.use(cors()) // this is enough setup for token exchange
app.use(express.json({limit: "300KB"})) // JSON Parser => req.body

app.get("/", (req, res) => {
  res.send("Hello from API!")
})

// load ROUTERS
app.use("/user", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

/// 404 error handler
app.use( errorHandler404 )

// GENERIC error handler
// ALL errors in our code, are automatically
// forwarded from express to here
app.use(errorHandlerGeneric)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
