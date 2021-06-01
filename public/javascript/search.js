

async function searchFormHandler(event) {
    event.preventDefault();

    // const miniSearch= require('minisearch');
    const searchText= document.querySelector('#search-text').value.toUpperCase();

    let miniSearch= new MiniSearch({
        fields: ['question_title', 'question_text'],
        storedFields: ['question_title', 'question_text']
    });

    miniSearch.addAll(questiondata)

    let results= miniSearch.search(searchText)

    const response= await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({results}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        // ???? targeted location api
        document.location.replace('/search')
    }
    else {
        // ???????????????????????/
    }
};





document.querySelector('#search-form').addEventListener('click', searchFormHandler);