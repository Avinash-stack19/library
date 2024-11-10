const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Enable CORS for all requests
app.use(cors());

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/librarian', require('./routes/librarian'));
app.use('/api/user', require('./routes/user'));

if(process.env.NODE_ENV === "production"){
    const dirPath = path.resolve();
    app.use(express.static("frontend/build"));
    app.get("*",(req,res)=> {
        res.sendFile(path.resolve(dirPath,"frontend","build","index.html"));
            })
    }
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
