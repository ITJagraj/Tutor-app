async function newFormHandler(event) {
  event.preventDefault();

  const question_title = document.querySelector('input[name="question-title"]').value;
  const question_text = document.querySelector('input[name="question-summary"]').value;
  const category_name = document.querySelector(' input[name="question-category"]').value;
  
  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({
      question_title,
      question_text,
      category_name    
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

document.querySelector('.new-question-form').addEventListener('submit', newFormHandler);