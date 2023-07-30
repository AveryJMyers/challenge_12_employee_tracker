const express = require('express')
const mysql = require('mysql2')

const port = process.env.PORT || 3001;
const app = express()

// express middleware 

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to db

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'employee_db'
    },
    console.log('Connected to the employee database')
)

app