const mysql = require('mysql');

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
  connectionLimit : 100,
}

const pool = mysql.createPool(config);

const initPeopleTable = () => {
  const stmt =  `CREATE TABLE IF NOT EXISTS people(
                  ID INT PRIMARY KEY AUTO_INCREMENT,
                  name VARCHAR(255) NOT NULL);`

  pool.query(stmt, (err) => {
    if (err) {
      console.error('error: ' + err.stack);
      return;
    }
  });
}

const insertRandomName = () => {
  const code = Date.now().toString()
  const stmt = `INSERT INTO people (name) VALUES("Akira-${code}")`
  
  pool.query(stmt, (err, _results, _fields) => {
    if (err) {
      console.error(err)
      return;
    }
  })
}

const returnAllNames = async (callback) => {
  const stmt = "SELECT * FROM people"

  await pool.query(stmt, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(results)
  })
}

module.exports = {
  insertRandomName,
  returnAllNames,
  initPeopleTable,
}