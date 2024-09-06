const bookSearchButton = document.getElementById('book-search-button');
const bookInput = document.getElementById('book-input');
const bookResult = document.getElementById('book-result');

bookSearchButton.addEventListener('click', () => {
  const query = bookInput.value;

  fetch('https://www.googleapis.com/books/v1/volumes?q=' + query)
  .then(response => response.json())
  .then(data => {
    bookResult.innerHTML = '';
    data.items.forEach(book => {
      bookResult.innerHTML += `
        <div>
          <h4><a href="${book.volumeInfo.previewLink}" target="_blank">${book.volumeInfo.title}</a></h4>
          <p>By: ${book.volumeInfo.authors.join(', ')}</p>
          <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title} cover">
        </div>
      `;
    });
  })
  .catch(error => {
    console.error('Error fetching book data:', error);
  });
}); 


