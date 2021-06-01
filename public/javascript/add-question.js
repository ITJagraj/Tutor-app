async function newFormHandler(event) {
  event.preventDefault();

  const question_title = document.querySelector('input[name="post-title"]').value;
  const post_url = document.querySelector('input[name="post-url"]').value;

  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({
      question_title,
      question_text,
      user_id: req.session.user_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
