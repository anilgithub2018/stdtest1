const express = require('express')
const app = express()

console.log("entering the app");
app.get('/', (req, res) => res.send('Hello from Google App Engine!' + process.env.PORT + 'humm'))
console.log(process.env);

app.get('/teapot', (req, res) => {
  res.status(418).send("Hello I'm a teapot running on Node Standard GAE")
})

console.log("started to listen" +  process.env.PORT );
app.listen(process.env.port || 8080, () =>
  console.log('Example app listening on port 8080!')
)