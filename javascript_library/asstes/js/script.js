// books
function Book(title, author, pages, genre, read) {
	//constructor
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.genre = genre;
	this.read = read;
	this.activeBook;

	//methods
	this.markRead = function () {
		this.read = true;
	};
}

class My_library {
	constructor() {
		this.books = [
			{
				title: 'The Great Gatsby',
				author: 'F. Scott Fitzgerald',
				pages: 180,
				genre: 'Novel',
				read: true,
			},
			{
				title: 'To Kill a Mockingbird',
				author: 'Harper Lee',
				pages: 281,
				genre: 'Novel',
				read: true,
			},
		];
	}

	removeBook(book) {
		const title = book.title;
		let bookDeleted = false;

		this.books.forEach((currentBook, index) => {
			if (currentBook.title === title) {
				this.books.splice(index, 1);
				this.displayAllBooks(this.books);
				console.log('Deleted book:', title);
				bookDeleted = true; // Mark as deleted
			}
		});

		if (!bookDeleted) {
			console.log('Book not found');
			return 'Book not found';
		}
		// close modal
		document.querySelector('.modal-container').classList.remove('shown');
		return 'Deleted';
	}
	displayAllBooks() {
		const shelf = document.querySelector('#shelf');
		shelf.innerHTML = ''; // clear previous content
		this.books.forEach((book, index) => {
			const bookcard = document.createElement('div');
			bookcard.classList.add('bookcard');
			bookcard.innerHTML = `
        <h2>${book.title.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
					letter.toUpperCase()
				)}</h2>
        <p>by: ${book.author.toUpperCase()}</p>
        <p>${book.pages}pages</p>
        `;
			bookcard.addEventListener('click', () => {
				this.activeBook = book;
				const modal = document.querySelector('.modal-container');
				modal.classList.add('shown');
				const modalTitle = document.querySelector('.modal h2');
				const modalAuthor = document.querySelector('.modal p:nth-child(2)');
				const modalGenre = document.querySelector('.modal p:nth-child(3)');
				modalTitle.textContent = book.title;
				modalAuthor.textContent = `by: ${book.author}`;
				modalGenre.textContent = `Genre: ${book.genre}`;
			});
			shelf.appendChild(bookcard);
		});
	}
	addBookToLibrary(title, author, pages, genre, read = false) {
		const book = new Book(title, author, pages, genre, read);
		this.books.push(book);
		console.log(this.books);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const my_library = new My_library();
	my_library.displayAllBooks(my_library.books);

	//handle form events
	const form = document.querySelector('#book-form');
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const title = document.querySelector('#title').value;
		const author = document.querySelector('#author').value;
		const pages = document.querySelector('#pages').value;
		const genre = document.querySelector('#genre').value;
		const read = document.querySelector('#read').checked;

		if (!title || !author || !pages || !genre) {
			alert('Please fill in all the fields');
			title.classList.add('tried');
			author.classList.add('tried');
			pages.classList.add('tried');
			genre.classList.add('tried');
			return;
		}
		const book = new Book(title, author, pages, genre, read);
		title.value = '';
		author.value = '';
		pages.value = '';
		genre.value = '';
		read.value = false;
		my_library.addBookToLibrary(title, author, pages, genre, read);
		my_library.displayAllBooks(my_library.books);
	});

	// close modal
	document.querySelectorAll('.close-modal').forEach((button) => {
		button.addEventListener('click', () => {
			const modal = document.querySelector('.modal-container');
			modal.classList.remove('shown');
		});
	});

	// delete book
	document.querySelector('.delete-book').addEventListener('click', () => {
		const activeBook = my_library.activeBook;
		my_library.removeBook(activeBook);
	});
});
