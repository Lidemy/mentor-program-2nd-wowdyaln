const express = require('express')
const app = express()
var bodyParser = require('body-parser');


app.use(express.static('public'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', (req, res)=> {
  res.send("that's good !" + `${app.locals.title} /  ${app.locals.email}
  / qName:  ${req.query.name} / qAge: ${req.query.age}
  
  `)
})

app.post('/submit', function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});

app.listen('3000', ()=> {
  app.locals.title = "this is a Title"
  app.locals.email = "cool@mail.com"
  console.log("listen port 3000");
})

