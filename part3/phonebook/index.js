const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :response-time :body'))


let phonebook = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
    `
    <p>Phonebook has info for ${phonebook.length} people</p> 
    <p>${date.toString()}</p>
    `
  )
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phonebook.find( p => p.id === id)

  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phonebook = phonebook.filter(p => p.id !== id);
  response.status(204).end()
})

const generateRandomId = () => {
  const max = 900
  const min = 10
  const id = phonebook.length > 0
    ? Math.floor(Math.random() * (max - min) + min)
    : 0
  return String(id)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!request.body.number || !request.body.name){
    return response.status(400).json({
      error: 'name or number missing'
    })
  } else if(phonebook.find( p => p.name == request.body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateRandomId(),
    name: body.name,
    number: String(body.number)
  }

  phonebook = phonebook.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)