async function editFormHandler(event) {
  event.preventDefault();

  const first_name = document.getElementsByClassName("edit-user-form")[0].querySelector('input[name="first-name"]').value.trim();
  const last_name = document.getElementsByClassName("edit-user-form")[0].querySelector('input[name="last-name"]').value.trim();
  const password = document.getElementsByClassName("edit-user-form")[0].querySelector('input[name="password"]').value.trim();
  const email = document.getElementByClassName(".email-user-form")[0].querySelector('input[name="email"]').value.trim();
  const id = document.querySelector(".edit-user-form").getAttribute("user_id");
  
  if (first_name && last_name && password && email){
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        first_name,
        last_name,
        password,
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.getElementById('logout').click();
    } else {
      alert("Please enter valid credentials and do not leave any fields blank.");
    }
  }
}

document.getElementsByClassName("edit-user-form")[0].querySelector('.save-btn').addEventListener('click', editFormHandler);
