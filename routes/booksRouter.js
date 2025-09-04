const express = require('express')

const bookRouter = express.Router()

// create new book
bookRouter.post('/api/v1/books', async (req, res) => {
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
bookRouter.get('/api/v1/books', async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).json(books)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//fetch a book
bookRouter
.get('/api/v1/books/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

bookRouter
.get('/api/v1/books/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//delete a book
bookRouter
.delete('/api/v1/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Book deleted successfully ' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//update a book
bookRouter
.put('/api/v1/books/:id', async (req, res) => {
  try {
    const bookUpdated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).json(bookUpdated)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})



module.exports = bookRouter
