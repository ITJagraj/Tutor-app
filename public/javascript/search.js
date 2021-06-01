async function searchFormHandler(event) {
    event.preventDefault();

    const searchText= document.querySelector('#search-text').value.toUpperCase();
console.log("test")
    const miniSearch= new miniSearch({
        fields: ['question_title', 'question_text'],
        storedFields: ['question_title', 'question_text']
    })
console.log(miniSearch) //this is for test purposes
    miniSearch.addAll(questiondata)

    let results= miniSearch.search(searchText)

    const response= await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({results}),
        headers: {'Content-Type': 'application/json'}
    });
    
    if (response.ok) {
        // ???? targeted location api
        document.location.replace('/search.handlebars')
    }
    else {
        console.log("pathway not working")
        alert(response.statusText);
    }
};


document.querySelector('#search-id').addEventListener('click', searchFormHandler);