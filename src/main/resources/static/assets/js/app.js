document.addEventListener('DOMContentLoaded', () => {
  function loadHeader() {
    fetch('partials/header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du header');
        }
        return response.text();
      })
      .then(html => {
        const headerDiv = document.getElementById('header');
        if (headerDiv) {
          headerDiv.innerHTML = html;
          const logoutLink = document.getElementById('logoutLink');
          if (logoutLink) {
            logoutLink.addEventListener('click', () => {
              localStorage.removeItem('jwtToken');
              window.location.href = 'login.html';
            });
          }
        }
      })
      .catch(error => {
        console.error('Erreur lors du chargement du header:', error);
      });
  }
  
  if (document.getElementById('header')) {
    loadHeader();
  }
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const messageDiv = document.getElementById('loginMessage');
      messageDiv.innerHTML = '';
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          throw new Error('Erreur lors de la lecture de la réponse du serveur.');
        }
        if (response.ok) {
          localStorage.setItem('jwtToken', data.accessToken);
          window.location.href = 'dashboard.html';
        } else {
          messageDiv.innerHTML = `<div class="alert alert-danger">${data}</div>`;
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        messageDiv.innerHTML = `<div class="alert alert-danger">Erreur lors de la connexion: ${error.message}</div>`;
      }
    });
  }
  
  // --- Gestion de l'Inscription ---
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const messageDiv = document.getElementById('registerMessage');
      messageDiv.innerHTML = '';
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, firstName, lastName })
        });
        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          throw new Error('Erreur lors de la lecture de la réponse du serveur.');
        }
        if (response.ok) {
          messageDiv.innerHTML = `<div class="alert alert-success">Inscription réussie ! Redirection vers la page de connexion...</div>`;
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          messageDiv.innerHTML = `<div class="alert alert-danger">${data}</div>`;
        }
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        messageDiv.innerHTML = `<div class="alert alert-danger">Erreur lors de l'inscription: ${error.message}</div>`;
      }
    });
  }
  
  // --- Gestion du Dashboard ---
  if (window.location.pathname.endsWith('dashboard.html')) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      window.location.href = 'login.html';
    } else {
      fetch('/api/auth/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => {
        if (response.ok) return response.json();
        else throw new Error('Erreur lors du chargement des informations utilisateur.');
      })
      .then(user => {
        const displayNameEl = document.getElementById('displayName');
        const userInfo = document.getElementById('userInfo');
        if (displayNameEl) {
          displayNameEl.innerText = user.username;
        }
        if (userInfo) {
          userInfo.innerHTML = `
            <ul class="list-group">
              <li class="list-group-item"><strong>Username:</strong> ${user.username}</li>
              <li class="list-group-item"><strong>Email:</strong> ${user.email}</li>
              <li class="list-group-item"><strong>Prénom:</strong> ${user.firstName}</li>
              <li class="list-group-item"><strong>Nom:</strong> ${user.lastName}</li>
              <li class="list-group-item"><strong>Roles:</strong> ${user.roles.join(', ')}</li>
            </ul>
          `;
        }
      })
      .catch(error => {
        console.error('Erreur lors du chargement des informations utilisateur:', error);
        alert('Session expirée ou invalide. Veuillez vous reconnecter.');
        localStorage.removeItem('jwtToken');
        window.location.href = 'login.html';
      });
    }
  }
});
