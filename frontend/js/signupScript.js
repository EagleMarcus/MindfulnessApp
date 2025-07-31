document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);

  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirm_password').value.trim();

      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      const firstName = document.getElementById('first_name').value.trim();
      const lastName = document.getElementById('last_name').value.trim();
      const gender = document.getElementById('gender').value;
      const email = document.getElementById('email').value.trim();

      const data = { firstName, lastName, gender, email, password };

      try {
        const response = await fetch('http://localhost:5002/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Registration successful! You can now login.');
          window.location.href = '/login';
        } else {
          alert('Registration failed: ' + (result.message || 'Unknown error'));
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }
});
