const express=require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const authRoutes=require("./routes/authRoutes")
const careerRoutes=require("./routes/careerRoutes")

const app=express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: true,
    credentials: true
}))

app.use("/api/auth",authRoutes)
app.use("/api/career",careerRoutes)

module.exports=app