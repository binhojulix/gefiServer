const mysql = require('mysql')

const conexao = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

module.exports = conexao; 