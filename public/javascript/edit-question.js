async function editFormHandler(event) {
  event.preventDefault();

  const question_title = document.querySelector('input[name="question-title"]').value;
  const question_text = document.querySelector('input[name="question-summary"]').value;
  
  const question_id = document.getElementsByClassName("edit-question-form")[0].getAttribute("question_id");
  
  const response = await fetch(`/api/questions/${question_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      question_title,
      question_text,
          
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace(`/question/${question_id}`);
  } else {
    alert("please do not leave any fields blank");
  }
}

document.getElementsByClassName("edit-question-form")[0].querySelector('.save-btn').addEventListener('click', editFormHandler);
