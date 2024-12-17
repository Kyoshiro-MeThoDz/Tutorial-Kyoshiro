document.addEventListener('DOMContentLoaded', function() {
    const platformFilter = document.getElementById('platformFilter');

    async function getUsers() {
        try {
            const response = await fetch('/api/users', {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Non autorisé');
            }
            return await response.json();
        } catch (error) {
            console.error('Erreur:', error);
            return [];
        }
    }

    async function displayRegisteredUsers(platform = 'all') {
        const users = await getUsers();
        const usersContainer = document.getElementById('registeredUsers');
        const filteredUsers = platform === 'all' 
            ? users 
            : users.filter(user => user.platform === platform);
        
        if (filteredUsers.length === 0) {
            usersContainer.innerHTML = '<p class="no-users">Aucun utilisateur trouvé</p>';
            return;
        }

        const usersList = filteredUsers.map(user => `
            <div class="user-item" data-username="${user.username}">
                <div class="user-name">${user.username}</div>
                <div class="user-details">
                    <p><strong>Classe:</strong> ${user.mainClass}</p>
                    <p><strong>Niveau:</strong> ${user.level}</p>
                    <p><strong>Guilde:</strong> ${user.guild}</p>
                    <p><strong>Plateforme:</strong> ${user.platform}</p>
                </div>
            </div>
        `).join('');

        usersContainer.innerHTML = usersList;

        // Ajouter les événements de clic
        document.querySelectorAll('.user-item').forEach(item => {
            item.addEventListener('click', function() {
                this.classList.toggle('show-details');
            });
        });
    }

    // Filtrer par plateforme
    platformFilter.addEventListener('change', function() {
        displayRegisteredUsers(this.value);
    });

    // Vérifier si l'utilisateur est connecté
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        displayRegisteredUsers();
    } else {
        window.location.href = '../index.html';
    }
}); 