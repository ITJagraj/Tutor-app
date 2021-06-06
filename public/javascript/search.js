async function searchFormHandler(event) {
    event.preventDefault();

    const searchText= document.querySelector('#search-text').value;
    const response = await fetch(`/api/questions/search/${searchText}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.ok) {
        document.location.replace(`/foundQuestions/${searchText}`);
      } else {
        alert(response.statusText);
      }
};


document.querySelector('#search-id').addEventListener('click', searchFormHandler);