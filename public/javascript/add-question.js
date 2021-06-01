async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_summary = document.querySelector('input[name="post-summary"]').value;

  const post_category = document.querySelector(' input[name="post-category"]').value;

  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_summary,
      post_category
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
