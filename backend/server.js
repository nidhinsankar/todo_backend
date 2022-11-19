// import express from 'express

const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const cors = require('cors');
const todos = require('./routes/todoRoutes')
const users = require('./routes/userRoutes')
const https = require('https');
const fs = require('fs')
const path = require('path')

const app = express();
dotenv.config();

const port = process.env.DEV_PORT || 8080

connectDB()
app.use(cors());
app.use(express.urlencoded())
app.use(express.json())


app.use('/api/todos',todos)   //http:localhost:5000/api/todos
app.use('/api/users',users)

const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
  )
  
  sslServer.listen(3443, () => console.log('Secure server 🚀🔑 on port 3443'))

// app.listen(port,()=>console.log('server ready',port))


