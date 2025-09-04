const express = require('express')
const Book = require('./models/Book')
//express instance
const app = express()
const PORT = 5000

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
      isAvaliable
    })
    // send the response to the user
    res.status(201).json(book)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
  console.log(req.body)
})

app.listen(PORT, console.log('Server is running on port ${PORT}'))
