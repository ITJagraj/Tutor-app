
async function answerFormHandler(event) {
  event.preventDefault();

  const answer_text = document.querySelector('textarea[name="answer-body"]').value.trim();
  const question_id = document.getElementsByClassName("question")[0].getElementsByClassName("title question-info")[0].getElementsByTagName("p")[0].getAttribute("question_id");
  const destination_email = document.getElementsByClassName("question")[0].getElementsByClassName("title question-info")[0].querySelector("#hidden-destination-email").textContent;
  console.log(destination_email);



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
      
      //adding sendmail npm email response that question has been answered
      //if (destination_email){
        // sendmail({
        //   from: 'noreply.coeusshare@gmail.com',
        //   to: `${destination_email}`,
        //   replyTo: 'noreply.coeusshare@gmail.com',
        //   subject: `${response.user.username} has posted an answer to your question.` ,
        //   html: `Check it out your answer at https://coeus-share.herokuapp.com/user-page`
        // }, function (err, reply) {
        //   console.log(err && err.stack)
        //   console.dir(reply)
        // });
        document.location.reload();
      //};
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.answer-form').addEventListener('submit', answerFormHandler);
