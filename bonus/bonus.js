document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const options = document.querySelectorAll('.option');

    // Animation d'entrée initiale
    choices.forEach((choice, index) => {
        choice.style.opacity = '0';
        choice.style.transform = `translateX(${index === 0 ? '-50px' : '50px'})`;
        
        setTimeout(() => {
            choice.style.transition = 'all 0.5s ease';
            choice.style.opacity = '1';
            choice.style.transform = 'translateX(0)';
        }, 300 * (index + 1));
    });

    // Gestion des options
    options.forEach(option => {
        const details = option.querySelector('.option-details');
        const title = option.querySelector('h3');

        title.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Fermer tous les autres détails
            options.forEach(otherOption => {
                if (otherOption !== option) {
                    const otherDetails = otherOption.querySelector('.option-details');
                    otherDetails.classList.remove('show');
                    otherDetails.classList.add('hidden');
                }
            });

            // Toggle les détails de l'option cliquée
            details.classList.toggle('hidden');
            details.classList.toggle('show');

            // Animation de l'option
            option.style.transform = 'scale(0.98)';
            setTimeout(() => {
                option.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Gestion des choix (perfectionnement/détente)
    choices.forEach(choice => {
        choice.addEventListener('click', function() {
            const content = this.querySelector('.choice-content');
            const otherChoice = [...choices].find(c => c !== this);

            // Réinitialiser tous les détails
            const allDetails = document.querySelectorAll('.option-details');
            allDetails.forEach(detail => {
                detail.classList.remove('show');
                detail.classList.add('hidden');
            });

            // Toggle le contenu
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                content.style.opacity = '0';
                otherChoice.style.opacity = '1';
            } else {
                choices.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                content.style.opacity = '1';
                otherChoice.style.opacity = '0.5';
            }
        });
    });

    // Fonction pour afficher la liste des utilisateurs
    function displayRegisteredUsers() {
        const usersContainer = document.getElementById('registeredUsers');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.length === 0) {
            usersContainer.innerHTML = '<p>Aucun utilisateur inscrit</p>';
            return;
        }

        const usersList = users.map(user => `
            <div class="user-item">
                <p><strong>Pseudo:</strong> ${user.username}</p>
                <p><strong>Classe:</strong> ${user.mainClass}</p>
                <p><strong>Niveau:</strong> ${user.level}</p>
                <p><strong>Guilde:</strong> ${user.guild}</p>
                <p><strong>Plateforme:</strong> ${user.platform}</p>
            </div>
        `).join('');

        usersContainer.innerHTML = usersList;
    }

    // Vérifier si l'utilisateur est connecté
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // Afficher la liste des utilisateurs
        displayRegisteredUsers();
    } else {
        // Rediriger vers la page de connexion ou afficher un message
        const usersContainer = document.getElementById('registeredUsers');
        usersContainer.innerHTML = '<p>Veuillez vous connecter pour voir la liste des membres</p>';
    }
}); 