const StoredBooks = [];

class Display {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }

  static addtolist() {
    const Title = document.getElementById("title").value;
    const Author = document.getElementById("author").value;

    if (Title == "" || Author == "") {
      document.querySelector(".alert").innerHTML =
        "Please add a title and an author";
    } else {
      document.querySelector(".alert").innerHTML = "";

      const list = document.getElementById("book-list");
      const newDiv = document.createElement("div");
      newDiv.classList.add("book");
      const newbook = new Display(Title, Author);
      StoredBooks.push(newbook);

      newDiv.innerHTML += `
    <span>${newbook.title}</span><span> by</span><span> ${newbook.author}</span>
      <button class= "delete ${newbook.id}">Delete</button>
    `;

      list.appendChild(newDiv);
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
    }
  }

  static addtolocal() {
    localStorage.setItem("books", JSON.stringify(StoredBooks));
  }

  static delBook(e) {
    e.preventDefault();
    if (e.target.innerHTML === "Delete") {
      e.target.parentElement.remove();
    }
  }

  static removelocal(e) {
    StoredBooks.forEach((newbook, i) => {
      if (
        e.target.parentElement.lastElementChild.classList.contains(newbook.id)
      ) {
        StoredBooks.splice(i, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(StoredBooks));
  }

  static preservelocal() {
    const stores = JSON.parse(localStorage.getItem("books"));
    stores.forEach((store) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("book");
      newDiv.innerHTML += `
      <div class="info">
      <p class="line">"${store.title}" by ${store.author}</p>
      </div>
      <button id="${store.id}" class="delete">Delete</button>
    `;
      const list = document.getElementById("book-list");

      list.appendChild(newDiv);
    });
  }
}

const add = document.getElementById("add");

add.addEventListener("click", (e) => {
  e.preventDefault();
  Display.addtolist();
  Display.addtolocal();
});
document.getElementById("book-list").addEventListener("click", (e) => {
  e.preventDefault();
  Display.delBook(e);
  Display.removelocal(e);
});

window.addEventListener("load", () => {
  Display.preservelocal();
});

let list = document.getElementById("list");
let addNew = document.getElementById("add-new");
let contact = document.getElementById("contact");
let firstPage = document.getElementById("firstPage");
let secondPage = document.getElementById("secondPage");
let thirdPage = document.getElementById("thirdPage");



addNew.addEventListener("click", function () {
  secondPage.style.display = 'flex'
  firstPage.style.display = 'none'
  thirdPage.style.display= 'none'


  
});
contact.addEventListener("click", function () {
  thirdPage.style.display = 'flex'
  secondPage.style.display= 'none'
 firstPage.style.display= 'none'
 
  
});
list.addEventListener('click', function(){
  firstPage.style.display = 'block'
  secondPage.style.display = 'none'
  thirdPage.style.display = 'none'
  
})
