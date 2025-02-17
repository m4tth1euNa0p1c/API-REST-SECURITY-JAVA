document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si nous sommes sur la page login.html
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          const data = await response.json();
          const messageDiv = document.getElementById('loginMessage');
          if (response.ok) {
            // Sauvegarder le token dans localStorage
            localStorage.setItem('jwtToken', data.accessToken);
            // Rediriger vers le Dashboard
            window.location.href = 'dashboard.html';
          } else {
            messageDiv.innerHTML = `<div class="alert alert-danger">${data}</div>`;
          }
        } catch (error) {
          console.error('Erreur lors de la connexion:', error);
        }
      });
    }
    
    // Vérifier si nous sommes sur la page register.html
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, firstName, lastName })
          });
          const data = await response.json();
          const messageDiv = document.getElementById('registerMessage');
          if (response.ok) {
            messageDiv.innerHTML = `<div class="alert alert-success">Inscription réussie ! Redirection vers le Dashboard...</div>`;
            // Rediriger vers le Dashboard après 2 secondes
            setTimeout(() => {
              // On suppose que l'inscription ne connecte pas automatiquement,
              // alors on peut rediriger vers la page de login ou forcer une connexion.
              // Ici, on redirige vers login.html
              window.location.href = 'login.html';
            }, 2000);
          } else {
            messageDiv.innerHTML = `<div class="alert alert-danger">${data}</div>`;
          }
        } catch (error) {
          console.error('Erreur lors de l\'inscription:', error);
        }
      });
    }
    
    // Gestion du Dashboard
    if (window.location.pathname.endsWith('dashboard.html')) {
      // Charger les informations utilisateur en appelant /api/auth/me
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        // Si aucun token n'est trouvé, rediriger vers la page de login
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
          document.getElementById('displayName').innerText = user.username;
          const userInfo = document.getElementById('userInfo');
          userInfo.innerHTML = `
            <li class="list-group-item"><strong>Username:</strong> ${user.username}</li>
            <li class="list-group-item"><strong>Email:</strong> ${user.email}</li>
            <li class="list-group-item"><strong>Prénom:</strong> ${user.firstName}</li>
            <li class="list-group-item"><strong>Nom:</strong> ${user.lastName}</li>
            <li class="list-group-item"><strong>Roles:</strong> ${user.roles.join(', ')}</li>
          `;
        })
        .catch(error => {
          console.error(error);
          alert('Session expirée ou invalide. Veuillez vous reconnecter.');
          localStorage.removeItem('jwtToken');
          window.location.href = 'login.html';
        });
      }
  
      // Gestion du bouton de déconnexion
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('jwtToken');
          window.location.href = 'login.html';
        });
      }
    }
  });
  