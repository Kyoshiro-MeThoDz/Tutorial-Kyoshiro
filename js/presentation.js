document.addEventListener('DOMContentLoaded', function() {
    const gameBtn = document.getElementById('gameBtn');
    const realBtn = document.getElementById('realBtn');
    const gameContent = document.querySelector('.game-content');
    const realContent = document.querySelector('.real-content');
    const profileInfo = document.querySelector('.profile-info');

    // Les deux contenus sont cachés par défaut
    gameContent.style.display = 'none';
    realContent.style.display = 'none';
    profileInfo.classList.remove('content-visible');

    // Fonction pour activer un bouton et désactiver l'autre
    function setActiveButton(activeBtn, inactiveBtn) {
        activeBtn.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        activeBtn.style.borderColor = '#ff0000';
        inactiveBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        inactiveBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }

    // Réinitialiser le style des boutons au chargement
    gameBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    gameBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    realBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    realBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';

    gameBtn.addEventListener('click', function() {
        gameContent.style.display = 'block';
        realContent.style.display = 'none';
        profileInfo.classList.add('content-visible');
        setActiveButton(gameBtn, realBtn);
    });

    realBtn.addEventListener('click', function() {
        gameContent.style.display = 'none';
        realContent.style.display = 'block';
        profileInfo.classList.add('content-visible');
        setActiveButton(realBtn, gameBtn);
    });
}); 