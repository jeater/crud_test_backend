const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001

//middlewares
app.use(morgan('dev'));
app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
});
app.use(bodyParser.json());


//mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: 'Password01-',
    port: 3306,
    database: "users_list"
})

//endpoints
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            res.json(result)
        } else {
            res.send([]);
        }
    })
});

app.post('/addUser', (req, res) => {
    const sql = 'INSERT INTO users SET ?';
    const sqlGet = 'SELECT * FROM users';

    const user = {
        name: req.body.name,
        email: req.body.email
    }

    connection.query(sql, user, error => {
        if (error) throw error;

        connection.query(sqlGet, (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                res.json(result)
            } else {
                res.send([]);
            }
        })
    })
});

app.put('/updateUser/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = `UPDATE users SET name = '${name}', email = '${email}' WHERE id = ${id}`;
    const sqlGet = 'SELECT * FROM users';

    connection.query(sql, error => {
        if (error) throw error;
        
        connection.query(sqlGet, (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                res.json(result)
            } else {
                res.send([]);
            }
        })
    })
});

app.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = ${id}`;
    const sqlGet = 'SELECT * FROM users';

    connection.query(sql, error => {
        if (error) throw error;
        
        connection.query(sqlGet, (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                res.json(result)
            } else {
                res.send([]);
            }
        })
    })
});

connection.connect(error => {
    if (error) throw error; 
    console.log("Database Server Running")
})

//start server
app.listen(PORT, () => console.log(`Server on port ${PORT}`));