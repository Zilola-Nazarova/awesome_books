/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

const container = document.querySelector('.container');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const submit = document.querySelector('#add-button');
const form = document.querySelector('.form');

class Cards {
  constructor() {
    this.array = [];
  }

  AddCard(book) {
    this.array.push(book);
  }
}

const collection = new Cards();

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
    collection.array.forEach((card) => {
      const div = document.createElement('div');
      div.classList.add('card');
      const paragraph = document.createElement('p');
      const deleteBook = document.createElement('button');
      deleteBook.classList.add('delete-book');
      paragraph.textContent = `"${card.title}" by ${card.author}`;
      deleteBook.textContent = 'Remove';
      div.appendChild(paragraph);
      div.appendChild(deleteBook);
      container.appendChild(div);
      deleteBook.addEventListener('click', (e) => {
        collection.array.splice(collection.array.indexOf(card), 1);
        e.target.parentNode.remove();
        const dataMarker = JSON.stringify(collection.array);
        localStorage.setItem('data', dataMarker);
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('data')) {
    const retrievedData = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < retrievedData.length; i += 1) {
      const book = new Books(retrievedData[i].title, retrievedData[i].author);
      collection.AddCard(book);
      book.ShowCards();
    }
  }
});

submit.addEventListener('click', () => {
  if (titleInput.value === '' && authorInput.value === '') {
    return null;
  }
  const book = new Books(titleInput.value, authorInput.value);
  collection.AddCard(book);
  book.ShowCards();
  const dataMarker = JSON.stringify(collection.array);
  localStorage.setItem('data', dataMarker);
  return form.reset();
});