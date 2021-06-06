async function newFormHandler(event) {
  event.preventDefault();

  const question_id = document.getElementsByClassName("edit-question-form")[0].getAttribute("question_id");
  
  const response = await fetch(`/api/questions/${question_id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      question_id  
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace(`/`);
  } else {
    alert(response.statusText);
  }
}

document.getElementsByClassName("edit-question-form")[0].querySelector('.delete-btn').addEventListener('click', newFormHandler);