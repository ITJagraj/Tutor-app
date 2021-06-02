async function searchFormHandler(event) {
    event.preventDefault();

    const searchText= document.querySelector('#search-text').value.toUpperCase();

    const response= await fetch('/api/questions/search/:qt', {
        method: 'GET',
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