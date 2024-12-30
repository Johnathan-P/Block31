// imports here for express and pg
const express = require('express');
const app = express();
const pg = require('pg');

const client = new pg.Client({
    host:'localhost',
    port:5432,
    user:'postgres',
    password:'root',
    database:'postgres'
});
// static routes here (you only need these for deployment)


// app routes here
app.listen(3000, function() { 
    console.log("listening on port 3000")
})

app.get('/api/employees', async (req, res, next) => {
    try {
        const SQL = `
          SELECT * FROM employees;
        `
        const response = await client.query(SQL)
        res.send(response.rows)

    } catch (error) {
        next(error)
    }
})

// create your init function
async function init() {
    await client.connect();

    await client.query('drop table if exists employees')
    await client.query(`create table employees(
    id serial primary key,
    name varchar(50),
    is_admin boolean not null
    )`);
    await client.query(`insert into employees(name, is_admin) values('Aaron', false)`)
    await client.query(`insert into employees(name, is_admin) values('Samantha', true)`)

}
// init function invocation
init();