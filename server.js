const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT,REDIS_URL,REDIS_PORT,SESSION_SECRET} = require('./config/config')
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const redis = require("redis")
const cors = require("cors")
let redisStore = require("connect-redis")(session)
let redisClient = redis.createClient({
    host:REDIS_URL,
    port:REDIS_PORT
})
const app = express()
app.use(express.json())
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")
const connectwithRetry = () =>{
    mongoose.connect(mongoURL)
    .then(()=>{
        console.log("Successfully connected to MongoDB")
    })
    .catch((err)=>{
        console.log(err)
        setTimeout(()=>{connectwithRetry},5000)
    })
}
connectwithRetry()
app.enable("trust proxy")
app.use(cors({}))
app.use(session({
    store:new redisStore({client:redisClient}),
    secret:SESSION_SECRET,
    cookie:{
        secure:false,
        resave: false,
        saveUninitialized: true,
        httpOnly:true,
        maxAge:30000
    }
}))

app.get("/api/v1",async(req,res)=>{
    res.send("<p>Dems route for testing</p>")
})
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter)


const port = process.env.PORT || 3000


app.listen(port,async(req,res)=>{
    console.log("Server started on port 3000")
})