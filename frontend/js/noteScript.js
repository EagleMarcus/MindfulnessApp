document.addEventListener('DOMContentLoaded', () => {
  const notesContainer = document.getElementById('notesList');
  const token = localStorage.getItem('authToken');

  if (!token) {
    window.location.href = '/login';
    return;
  }

  fetch('http://localhost:5003/api/notes', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  })
  .then(data => {
    if (data.length === 0) {
      notesContainer.innerHTML = '<li>No notes available.</li>';
      return;
    }
    notesContainer.innerHTML = data.map(note =>
      `<li class="collection-item">
        <strong>${note.title}</strong><br>
        ${note.content || ''}
      </li>`
    ).join('');
  })
  .catch(error => {
    console.error(error);
    alert('Session expired or error fetching notes. Please login again.');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  });
});
