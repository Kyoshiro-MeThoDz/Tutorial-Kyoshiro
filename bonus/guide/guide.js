document.addEventListener('DOMContentLoaded', function() {
    // Animation supplémentaire pour le texte de maintenance
    const maintenanceText = document.querySelector('.maintenance-content p');
    let dots = '';
    
    setInterval(() => {
        dots = dots.length >= 3 ? '' : dots + '.';
        maintenanceText.textContent = `Cette section sera disponible prochainement${dots}`;
    }, 500);
}); 