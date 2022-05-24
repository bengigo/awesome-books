const add = document.getElementById('add');
const awesomeBooks = [];
add.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');

  const book = {
    Title: title.value,
    Author: author.value,
  };

  awesomeBooks.push(book);

  localStorage.setItem('books', JSON.stringify(awesomeBooks));

  const list = document.getElementById('book-list');

  const newDiv = document.createElement('div');
  newDiv.classList.add('book');

  newDiv.innerHTML += `
        <p>${book.Title}</p>
        <p>${book.Author}</p>
      <button class="delete">Delete</button>      
      `;

  list.appendChild(newDiv);

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
});
document.getElementById('book-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
  awesomeBooks.forEach((book, i) => {
    if (e.target.parentElement.firstElementChild.textContent === book.Title) {
      awesomeBooks.splice(i, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(awesomeBooks));
});
