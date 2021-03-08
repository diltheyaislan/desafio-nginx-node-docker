const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database:'nodedb'
};

const connection = mysql.createConnection(config);

const createPeopleTable = `create table if not exists people (
		id int primary key auto_increment,
		name varchar(255) not null
)`;
connection.query(createPeopleTable);

const sql = `INSERT INTO people(name) values('Dilthey')`;
connection.query(sql);
connection.end();

app.get('/', (_req, res) => {
	res.send('<h1>Full Cycle Rocks!</h1>');
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});