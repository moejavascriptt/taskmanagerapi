const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/Book')
//express instance
const app = express()
const PORT = 5000

//connect to DB
mongoose
  .connect(
    'mongodb+srv://mauriceg:gYQ930Yd33WtI1pR@book-api.ie4d73x.mongodb.net/?retryWrites=true&w=majority&appName=book-api'
  )
  .then(() => {
    console.log('MongoDB Connected')
  })

  .catch(e => {
    console.log(e)
  })

//middlewares
app.use(express.json()) //pass JSON data

// create new book
app.post('/api/v1/books', async (req, res) => {
  try {
    // req.body === the data the user wants to save
    const { title, name, isAvailable, publishedYear, genre, author } = req.body
    //check for duplicate
    const existingBook = await Book.findOne({ title, author })
    if (existingBook) {
      return res.status(409).json({ error: 'Book already exists' })
    }
    // save the new
    const book = await Book.create({
      title,
      author,
      genre,
      publishedYear,
      isAvailable
    })
    // send the response to the user
    res.status(201).json(book)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
  console.log(req.body)
})

//fetch all books
app.get('/api/v1/books', async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//fetch a book
app.get('/api/v1/books/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/v1/books/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//delete a book
app.delete('/api/v1/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Book deleted successfully ' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, console.log('Server is running on port ${PORT}'))
