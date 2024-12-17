document.addEventListener('DOMContentLoaded', function() {
    const identificationBtn = document.getElementById('identificationBtn');
    const identificationModal = document.getElementById('identificationModal');
    const closeIdentificationBtn = document.getElementById('closeIdentificationBtn');
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const switchFormBtn = document.getElementById('switchForm');
    const menuBtn = document.getElementById('menuBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Vérifier si l'utilisateur est déjà connecté
    const checkLoggedInUser = () => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            const userData = JSON.parse(user);
            identificationBtn.textContent = userData.username;
            logoutBtn.parentElement.style.display = 'block';
        } else {
            logoutBtn.parentElement.style.display = 'none';
            identificationBtn.textContent = 'Connexion';
        }
    };

    // Ouvrir/Fermer le modal
    identificationBtn.addEventListener('click', () => {
        // Réinitialiser les champs de connexion
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        // Réinitialiser les champs d'inscription
        document.getElementById('lastName').value = '';
        document.getElementById('firstName').value = '';
        document.getElementById('level').value = '';
        document.getElementById('mainClass').value = '';
        document.getElementById('guild').value = '';
        document.getElementById('platform').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        // Afficher le modal
        identificationModal.style.display = 'block';
    });

    closeIdentificationBtn.addEventListener('click', () => {
        identificationModal.style.display = 'none';
    });

    // Switcher entre inscription et connexion
    switchFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (registrationForm.style.display !== 'none') {
            registrationForm.style.display = 'none';
            loginForm.style.display = 'block';
            switchFormBtn.textContent = 'Pas encore inscrit ? S\'inscrire';
            // Réinitialiser les champs de connexion
            document.getElementById('loginUsername').value = '';
            document.getElementById('loginPassword').value = '';
        } else {
            registrationForm.style.display = 'block';
            loginForm.style.display = 'none';
            switchFormBtn.textContent = 'Déjà inscrit ? Se connecter';
            // Réinitialiser les champs d'inscription
            document.getElementById('lastName').value = '';
            document.getElementById('firstName').value = '';
            document.getElementById('level').value = '';
            document.getElementById('mainClass').value = '';
            document.getElementById('guild').value = '';
            document.getElementById('platform').value = '';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
    });

    // Gérer l'inscription
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            lastName: document.getElementById('lastName').value,
            firstName: document.getElementById('firstName').value,
            level: document.getElementById('level').value,
            mainClass: document.getElementById('mainClass').value,
            guild: document.getElementById('guild').value,
            platform: document.getElementById('platform').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        // Sauvegarder dans localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.username === formData.username)) {
            alert('Ce pseudo est déjà utilisé');
            return;
        }

        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(formData));

        // Mettre à jour l'interface
        identificationBtn.textContent = formData.username;
        identificationModal.style.display = 'none';
        alert('Inscription réussie !');
    });

    // Gérer la connexion
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            identificationBtn.textContent = user.username;
            identificationModal.style.display = 'none';
            alert('Connexion réussie !');
        } else {
            alert('Pseudo ou mot de passe incorrect');
        }
    });

    // Gérer la déconnexion
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        identificationBtn.textContent = 'Connexion';
        logoutBtn.parentElement.style.display = 'none';
        window.location.href = 'index.html';
    });

    // Vérifier la connexion au chargement
    checkLoggedInUser();
}); 

// Remplacer les appels localStorage par des appels API
async function registerUser(formData) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
            return data.user;
        }
        throw new Error(data.error);
    } catch (error) {
        throw error;
    }
}

async function loginUser(credentials) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
            return data.user;
        }
        throw new Error(data.error);
    } catch (error) {
        throw error;
    }
} 