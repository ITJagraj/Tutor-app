
async function answerFormHandler(event) {
  event.preventDefault();

  const answer_text = document.querySelector('textarea[name="answer-body"]').value.trim();
  const question_id = document.getElementsByClassName("question")[0].getElementsByClassName("title question-info")[0].getElementsByTagName("p")[0].getAttribute("question_id");
  const destination_email = document.getElementsByClassName("question")[0].getElementsByClassName("title question-info")[0].querySelector("#hidden-destination-email").textContent;




  if (answer_text) {
    const response = await fetch('/api/answers', {
      method: 'POST',
      body: JSON.stringify({
        question_id,
        answer_text,
        destination_email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      
      
        document.location.reload();
     
    } else {
      alert("please do not leave any fields blank");
    }
  }
}

document.querySelector('.answer-form').addEventListener('submit', answerFormHandler);
