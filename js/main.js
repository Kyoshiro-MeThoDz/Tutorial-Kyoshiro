document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const menuItems = document.getElementById('menuItems');
    const closeBtn = document.getElementById('closeBtn');
    
    menuBtn.addEventListener('click', function() {
        menuItems.classList.add('active');
    });
    
    closeBtn.addEventListener('click', function() {
        menuItems.classList.remove('active');
    });
    
    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function(e) {
        if (!menuItems.contains(e.target) && !menuBtn.contains(e.target)) {
            menuItems.classList.remove('active');
        }
    });
    
    // Gestion de la rotation du logo
    const logoIcon = document.querySelector('.logo-icon');
    let currentRotation = 0;
    
    function handleRotation() {
        currentRotation += 360; // Ajoute 360 degrés à chaque clic
        logoIcon.style.transform = `rotate(${currentRotation}deg)`;
    }
    
    // Pour le clic sur desktop
    logoIcon.addEventListener('click', handleRotation);
    
    // Pour le touch sur mobile
    logoIcon.addEventListener('touchstart', function(e) {
        e.preventDefault();
        handleRotation();
    });
}); 