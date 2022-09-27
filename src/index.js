const express = require("express");

const {  insertRandomName, returnAllNames, initPeopleTable } = require("./database/mysql");

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  returnAllNames((names) => {
    const htmlNames = names.map(person => `<p>${person.name}</p>`)
                .join('');
    res.send(`
    <h1>Full Cycle Rocks!</h1>

    <section>
      <h2> Lista de nomes </h2>
      ${htmlNames}
    </section>
    `)
  });
});


const startServer = () => {
  initPeopleTable();
  insertRandomName();

  app.listen(PORT, () => console.log('listening on port ' + PORT));
}

startServer();
