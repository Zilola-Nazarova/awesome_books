const container = document.querySelector('.container');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const submit = document.querySelector('#add-button');
const form = document.querySelector('.form');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  ShowCards() {
    const removeDivs = document.querySelectorAll('.card');
    removeDivs.forEach((div) => {
      div.remove();
    });
    cards.forEach((card) => {
      const div = document.createElement('div');
      div.classList.add('card');
      const heading = document.createElement('h1');
      const paragraph = document.createElement('p');
      const deleteBook = document.createElement('button');
      deleteBook.classList.add('delete-book');
      heading.textContent = `${card.title}`;
      paragraph.textContent = `${card.author}`;
      deleteBook.textContent = 'Remove';
      div.appendChild(heading);
      div.appendChild(paragraph);
      div.appendChild(deleteBook);
      container.appendChild(div);
  
      deleteBook.addEventListener('click', (e) => {
        cards.splice(cards.indexOf(card), 1);
        e.target.parentNode.remove();
        const dataMarker = JSON.stringify(cards);
        localStorage.setItem('data', dataMarker);
      });
    });
  }
}

let cards = [];


function addBook(title, author) {
  const book = new Books(title, author);
  cards.push(book);
  book.ShowCards();
  const dataMarker = JSON.stringify(cards);
  localStorage.setItem('data', dataMarker);
}
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('data')) {
    cards = JSON.parse(localStorage.getItem('data'));
  }
  for(i = 0; i < cards.length; i++) {
    let book = new Books(cards[i].title, cards[i].author);
    book.ShowCards();
  }
});

submit.addEventListener('click', () => {
  if (titleInput.value === '' && authorInput.value === '') {
    return null;
  }
  addBook(titleInput.value, authorInput.value);
  return form.reset();
});