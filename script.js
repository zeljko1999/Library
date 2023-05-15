const myLibrary = []
const table = document.querySelector('.bookshelf')
const addBookButton = document.getElementById('show-form-button')
const formContainer = document.getElementById('form-container')
const form = document.querySelector('form')
addBookButton.addEventListener('click', function () {
  formContainer.style.display = 'flex'
})
form.addEventListener('submit', function (event) {
  event.preventDefault()
  const bookName = form.elements['book-name']
  const bookAuthor = form.elements['book-author']
  const bookPages = form.elements['book-pages']
  const bookRead = form.elements['book-read']
  let isChecked = ''
  if (bookRead.checked) { isChecked = 'Read' } else { isChecked = 'Not read' }
  const book = new Book(bookName.value, bookAuthor.value, bookPages.value, isChecked)
  formContainer.style.display = 'none'
  addToTable(book, table, myLibrary)
  addBookToLibrary(myLibrary, book)
  form.reset()
})

class Book {
  constructor (title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

  info () {
    return (`${this.title} by ${this.author},${this.pages
    } pages, ${this.read}.`)
  }
}

function addBookToLibrary (library, book) {
  library.push(book)
}

function addToTable (book, table, library) {
  const newRow = table.insertRow()
  const counter = library.length
  newRow.dataset.dataRow = `${library.length}`
  for (const key in book) {
    if (book.hasOwnProperty(key) && typeof book[key] !== 'function') {
      const newCell = newRow.insertCell()
      newCell.innerHTML = book[key]
    }
  }
  const newCell = newRow.insertCell()
  const button = document.createElement('button')
  button.innerHTML = 'DELETE BOOK'
  button.classList.add('delete-button')
  button.dataset.dataRow = `${library.length}`
  button.addEventListener('click', function () {
    newRow.parentNode.removeChild(newRow)
    library.splice(counter, 1)
  })
  newCell.appendChild(button)

  const newCell2 = newRow.insertCell()
  const button2 = document.createElement('button')
  button2.innerHTML = 'TOGGLE READ'
  button2.dataset.dataRow = `${library.length}`
  button2.addEventListener('click', function () {
    toggleRead(book)
    const readCell = newRow.querySelector('td:nth-of-type(4)')
    readCell.innerHTML = book.read
  })
  newCell2.appendChild(button2)
}

function toggleRead (book) {
  if (book.read === 'Read') { book.read = 'Not read' } else { book.read = 'Read' }
}
