document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('skillModal');
    const closeBtn = document.querySelector('.close-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillVideo = document.getElementById('skillVideo');
    const comboSequence = document.querySelector('.combo-sequence');

    // Données des techniques
    const skillsData = {
        technique1: {
            videoSrc: '../video/smoketrap.mp4',
            combos: ['smoketrap1.png', 'smoketrap2.png', 'smoketrap3.png'],
            description: 'Cet enchaînement vous permet d\'être protégé tout en lançant une compétence d\'étourdissement.'
        },
        technique2: {
            videoSrc: '../video/technique2.mp4',
            combos: ['combo4.jpg', 'combo5.jpg', 'combo6.jpg'],
            description: 'Cette séquence vous permet une projection vers l\'avant rapide en invincibilité parfait pour grab'
        }
    };

    // Ouvrir le modal
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skillId = this.dataset.skill;
            const skillData = skillsData[skillId];
            
            console.log("Skill ID:", skillId);
            
            // Mettre à jour la vidéo
            skillVideo.src = skillData.videoSrc;
            
            // Mettre à jour les combos
            comboSequence.innerHTML = '';
            skillData.combos.forEach((combo, index) => {
                const img = document.createElement('img');
                const imagePath = `../photo/${combo}`;
                console.log(`Tentative de chargement de l'image ${index + 1}:`, imagePath);
                
                img.src = imagePath;
                img.alt = `Combo ${index + 1}`;
                
                img.onerror = function() {
                    console.error(`Erreur de chargement pour l'image:`, imagePath);
                    this.src = '../photo/default.jpg';
                };
                
                img.onload = function() {
                    console.log(`Image chargée avec succès:`, imagePath);
                };
                
                comboSequence.appendChild(img);
            });
            
            // Mettre à jour la description
            const descriptionText = document.getElementById('combo-description-text');
            descriptionText.textContent = skillData.description;
            
            modal.style.display = 'block';
        });
    });

    // Fermer le modal uniquement avec le bouton
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        skillVideo.pause();
        skillVideo.currentTime = 0;
    });

    // Supprimer la fermeture en cliquant à côté
    // window.addEventListener('click', function(event) {
    //     if (event.target === modal) {
    //         modal.style.display = 'none';
    //         skillVideo.pause();
    //         skillVideo.currentTime = 0;
    //     }
    // });
}); 