import express from 'express';
const app = express()

import { json } from 'body-parser';
app.use(json())

import cors from 'cors';
app.use(cors())

token('postwhat', function(req,res) {
  if (req.method === 'POST') {
  return JSON.stringify(req.body) }
})

import morgan, { token } from 'morgan';
app.use(morgan(':method :url :status :res[content-length] :response-time ms :postwhat'))

let persons = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
]

app.get('/', (req, res) => {
  res.send('<h1>Try /api/persons </h1>')
})
    
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.write('<p>Phonebook has info for '+ persons.length +' persons</p>')
  res.write('<p>' + Date() + '</p>')
  res.end()
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const generateId = () => {
  const bigNumber = 100000
  const newId = Math.floor(Math.random() * bigNumber)
  return newId
}
  
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name)  {
    return res.status(400).json({ 
      error: 'persons name missing' 
    })
  }

  if (!body.number)  {
    return res.status(400).json({ 
      error: 'persons phonenumber missing' 
    })
  }

  sameName = persons.find(p => p.name === body.name)  
  if (sameName) {
  if (sameName.name === body.name)   {
    return res.status(400).json({ 
      error: 'person name must be unique' 
    })
  }
  }
  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
