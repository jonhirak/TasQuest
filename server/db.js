const {Client} = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'jonhirak',
  port: '5432',
  password: 'hirak1992',
  database: 'tasQuest'
})

client.connect();

client.query('select * from test', (err, res) => {
  if (err) {
    console.log('Error!')
  } else {
    console.log('RESPONSE!');
  }
});