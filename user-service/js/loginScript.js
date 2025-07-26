// Initialize Materialize sidenav
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);

  // Add login form submit listener inside DOMContentLoaded to ensure elements exist
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
          // Redirect to dashboard or home after successful login
          window.location.href = '/dashboard';
        } else {
          const data = await res.json();
          alert(data.message || 'Login failed. Please try again.');
        }
      } catch (err) {
        alert('Error logging in. Please try again later.');
      }
    });
  }
});
