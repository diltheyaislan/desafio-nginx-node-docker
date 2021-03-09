const express = require('express');
const mysql = require('mysql');
const util = require('util');

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

const insertSql = `INSERT INTO people(name) values(?)`;
const selectSql = `SELECT * FROM people ORDER BY name ASC`;

const query = util.promisify(connection.query).bind(connection);

const peopleNames = ['Dilthey', 'Aislan', 'Paula', 'Noah'];

const configDatabase = async function() {
	await query(createPeopleTable);
	
	for(let name of peopleNames) {
		await query(insertSql, name);
	}
};

const getPeople = async function() {
	return await query(selectSql);
};

const buildBody = async function() {
	const people = await getPeople();
	let body = '<h1>Full Cycle Rocks!</h1>';
	
	body += '<ul>';
	people.forEach(person => {
		body += `<li>${person.name}</li>`;
	});
	body += '</ul>';

	return body;
}

configDatabase();

app.get('/', async (_req, res) => {
	const body = await buildBody();
	res.send(body);
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});