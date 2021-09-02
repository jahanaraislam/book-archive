const errorMsg = document.getElementById('error-message')
errorMsg.style.display = 'none';
const spinner = document.getElementById('spinner')
spinner.style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
//    clear data
    searchText.value = ''
    // handle empty search result
    if(searchText == ''){
        displayError()
    }
    else{
         // Display Spinner
         document.getElementById('spinner').style.display = 'block';
         // Hide error
         document.getElementById('error-message').style.display = 'none';
         // Clear Search Result
         document.getElementById('search-result').textContent ='';
         // load data
         const url =`https://openlibrary.org/search.json?q=${searchText} `;
         console.log(url);
         fetch(url)
             .then(res => res.json())
             .then(data => displaySearchResult(data));
    }
}
const displayError = () => {
    errorMsg.style.display = 'block';
    spinner.style.display = 'none';
    document.getElementById('book-numbers').textContent = '';
}
// Display Search Result
const displaySearchResult = data => {
    document.getElementById('book-numbers').textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const bookList = data.docs;
    console.log(bookList);
    if (bookList == nul
        ) {
        displayError();
    }
    else {
        errorMsg.style.display = 'none';
        spinner.style.display = 'none';
        document.getElementById('book-numbers').innerText ='Books Found ${bookList.length}';
        //showing each book in a card
        bookList.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="w-75 h-50 rounded  p-2 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text"><b>Author</b>${book.author_name}</p>
                    <p class="card-text"><b>Publish Year</b>: ${book.first_publish_year}</p>
                    <p class="card-text"><b>Publisher</b>: ${book.publisher}</p>
                </div>
                <div class="card-footer rounded text-center read">
                <small >Read</small>
              </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }

}