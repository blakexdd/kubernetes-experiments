import express from 'express'
import Knex from 'knex'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

const port = 3001
const knex = Knex({
  client: 'postgres',
  connection: {
    host : 'postgres',
    user : 'postgresadmin',
    password : 'admin123',
    database : 'postgresdb'
  }
})

async function initKnex(){
  await knex.schema.createTableIfNotExists('users',  (table) => {
    table.increments();
    table.string('name');
    table.timestamps();
  })
}

app.get("/", async (_, response) => {
  await initKnex()
  response.send("<h1>Главная страница</h1>");
});
app.get("/users", async (_, response) => {
   const data = await knex.select('*').from('users')
  response.send(data);
});
app.post("/users",async (request, response) => {
  const name = request.body.name
  await knex('users').insert({name})
  response.end(`Saved user with name: ${name}`)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})