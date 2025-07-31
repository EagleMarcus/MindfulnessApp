// Initialize Materialize sidenav
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);

  const loginForm = document.getElementById('loginForm');
  const loginButton = document.getElementById('loginSubmit');
  const errorDiv = document.getElementById('loginError');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      errorDiv.textContent = '';
      loginButton.disabled = true;
      loginButton.textContent = 'Logging in...';

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
          errorDiv.textContent = data.message || 'Login failed. Please try again.';
          loginButton.disabled = false;
          loginButton.textContent = 'Sign In';
        }
      } catch (err) {
        errorDiv.textContent = 'Error logging in. Please try again later.';
        loginButton.disabled = false;
        loginButton.textContent = 'Sign In';
      }
    });
  }
});
