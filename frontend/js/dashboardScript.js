document.addEventListener('DOMContentLoaded', () => {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);

  const userNameElem = document.getElementById('userName');
  const logoutBtn = document.getElementById('logoutBtn');
  const notesContainer = document.getElementById('recentNotes');

  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  fetch('http://localhost:5002/api/user/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      return response.json();
    })
    .then(data => {
      userNameElem.textContent = data.firstName || 'User';

      if (data.notes && data.notes.length > 0) {
        notesContainer.innerHTML = data.notes
          .map(note => `<li class="collection-item">${note.text}</li>`)
          .join('');
      } else {
        notesContainer.innerHTML = '<li class="collection-item">No notes yet.</li>';
      }
    })
    .catch(error => {
      console.error(error);
      alert('Session expired, please login again.');
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    });
  }
});
