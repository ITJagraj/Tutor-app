async function deleteFormHandler(event) {
  event.preventDefault();

  const id = document.querySelector(".edit-user-form").getAttribute("user_id");
  
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.getElementById('logout').click();
    } else {
      alert(response.statusText);
    }
}

document.getElementsByClassName("edit-user-form")[0].querySelector('.delete-btn').addEventListener('click', deleteFormHandler);
