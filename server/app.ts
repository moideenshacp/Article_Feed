import express from 'express'
import cors  from 'cors'
import dotenv from 'dotenv'
import connectDb from './src/config/db'
import authRoute from './src/routes/authRoute'
import articleRoute from './src/routes/articleRoute'
dotenv.config()

connectDb()
const app = express()
app.use(
    cors({
      origin: process.env.FRONT_URL,
      methods: ["GET", "POST","PUT","PATCH"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    })
  );
app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/article',articleRoute)
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`app started to listed at port ${PORT}`)
})