/**
 *Construir uma rota  com express
 * /user
 * deve ter um get pegando todos os usuarios
 * deve ter um post que recebe um usuario e salva num json
 *
 */

// importações
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const fs= require('fs')

const write = ({dados, fileName}) => {
  fs.writeFileSync(fileName,JSON.stringify(dados))
}

//para permitir que o frontEnd faça requisiçoes
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin","*")
  app.use(cors)
  next()
})
app.use(express.json())

//para ler usuário
app.get('/checkUser/:userEmail',(req ,res) => {
  const userEmail = req.params.userEmail; 
  const data = require('./DB/user.json')
  for(let user = 0; user < data.length;user++){
    if(data[user]["email"] == userEmail){
      res.json(data[user])
    }
  }
})
//pegar todos os precatórios
app.get('/precatorios',(req,res) => {
  const data = require('./DB/precatorio.json')
  res.json(data)
})

//para adicionar novos precatórios
app.post('/addPrecatorio',(req,res) => {
  let body = req.body
  let data = require('./DB/precatorio.json')
  let id = data.length + 1
  body["id"] = id
  data.push(body)
  write({dados:data, fileName:'./src/DB/precatorio.json'})

  res.json(body)

})



//para adicionar novo usuário
app.post('/addUser', (req ,res) =>{
  // const fileName = './DB/user.json'
  let body = req.body
  let data = require('./DB/user.json')
  let id = data.length + 1
  body["id"] = id
  data.push(body)
  write({dados:data, fileName:'./src/DB/user.json'})
 
  res.json(body)
}) 
 

app.listen(port)