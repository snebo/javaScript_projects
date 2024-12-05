my_library = []

function Book(title, author, pages, genre, read){
    //constructor
    this.title = title
    this.author = author
    this.pages = pages
    this.genre = genre
    this.read = read
}

function addBookToLibrary(title, author, pages, genre, read=false){
    const book = new Book(title, author, pages, genre, read)
    my_library.push(book)
}

function displayAllBooks(library) {
    library.forEach((book, index) => {
        //get the books container
        const shelf = document.querySelector('#shelf')
        shelf.innerHTML='' // clear previous content

        bookcard = document.createElement('div')
        bookcard.classList.add('bookcard')
        bookcard.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Genre: ${book.genre}</p>
        <p>Read: ${book.read? 'Yes' : 'No'}</p>
        <button class="delete" data-index="${index}">Delete</button>
        `;
        shelf.appendChild(bookcard);
    })
 }