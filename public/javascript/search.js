async function searchFormHandler(event) {
    event.preventDefault();

    const searchText= document.querySelector('#some-id-will-go-here').value.toUpperCase();

    const miniSearch= new miniSearch({
        fields: ['question_title', 'question_text'],
        storedFields: ['question_title', 'question_text']
    })

    miniSearch.addAll(questiondata)

    let results= miniSearch.search(searchText)

    const response= await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({results}),
        headers: {'Content-Type': 'application/json'}
    });
    
    if (response.ok) {
        // ???? targeted location api
        document.location.replace('/?????')
    }
    else {
        // ???????????????????????/
    }
};



document.querySelector('.search-form').addEventListener('submit', searchFormHandler);