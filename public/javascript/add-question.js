async function newFormHandler(event) {
  event.preventDefault();

  const question_title = document.querySelector('input[name="question-title"]').value;
  const question_text = document.querySelector('input[name="question-summary"]').value;
  
  
  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({
      question_title,
      question_text
       
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert("please do not leave any fields blank");
  }
}

document.querySelector('.new-question-form').addEventListener('submit', newFormHandler);