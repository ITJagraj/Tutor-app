async function newFormHandler(event) {
  event.preventDefault();

  const question_title = document.querySelector('input[name="post-title"]').value;
  const question_text = document.querySelector('input[name="post-summary"]').value;

  const category_name = document.querySelector(' input[name="post-category"]').value;

  const response = await fetch(`/api/questions/`, {
    method: 'POST',
    body: JSON.stringify({
      question_title,
      question_text,
      category_name//might have to change if no longer aplicable 
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

var el = document.querySelector('.new-post-form');
if(el){
  addEventListener('submit', newFormHandler);
}