class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const StoredBooks = [];

class Display {
  static addtolist() {
    const Title = document.getElementById('title').value;
    const Author = document.getElementById('author').value;
    const list = document.getElementById('book-list');
    const newDiv = document.createElement('div');
    newDiv.classList.add('book');
    const newbook = new Books(Title, Author);
    StoredBooks.push(newbook);

    newDiv.innerHTML += `
    <span>${newbook.title}</span><span> by</span><span> ${newbook.author}</span>
      <button class="delete">Delete</button>
    `;

    list.appendChild(newDiv);
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }

  static addtolocal() {
    localStorage.setItem('books', JSON.stringify(StoredBooks));
  }

  static delBook(e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();
    }
  }

  static removelocal(e) {
    StoredBooks.forEach((newbook, i) => {
      if (
        e.target.parentElement.firstElementChild.textContent === newbook.title
      ) {
        StoredBooks.splice(i, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(StoredBooks));
  }

  static preservelocal() {
    const stores = JSON.parse(localStorage.getItem('books'));
    stores.forEach((store) => {
      const newDiv = document.createElement('div');
      newDiv.classList.add('book');
      newDiv.innerHTML += `
      <div class="info">
      <p class="line">"${store.title}" by ${store.author}</p>
      </div>
      <button class="delete">Delete</button>
    `;
      const list = document.getElementById('book-list');

      list.appendChild(newDiv);
    });
  }
}

const add = document.getElementById('add');

add.addEventListener('click', (e) => {
  e.preventDefault();
  Display.addtolist();
  Display.addtolocal();
});
document.getElementById('book-list').addEventListener('click', (e) => {
  e.preventDefault();
  Display.delBook(e);
  Display.removelocal(e);
});

window.addEventListener('load', () => {
  Display.preservelocal();
});