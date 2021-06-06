async function deleteFormHandler(event) {
  event.preventDefault();

  const answer_id = this.parentNode.parentNode.getElementsByClassName("answer-text-box")[0].getAttribute("answer_id");
  const question_id = document.getElementsByClassName("question")[0].getElementsByClassName("title question-info")[0].getElementsByTagName("p")[0].getAttribute("question_id");

  const response = await fetch(`/api/answers/${answer_id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace(`/question/${question_id}`);
  } else {
    alert(response.statusText);
  }
}

  for (var i = 0; i<document.getElementsByClassName("answers")[0].getElementsByClassName("answer").length; i++){
    document.getElementsByClassName("answers")[0].getElementsByClassName("answer")[i].querySelector("#delete-answer-btn").addEventListener("click", deleteFormHandler);
  }
