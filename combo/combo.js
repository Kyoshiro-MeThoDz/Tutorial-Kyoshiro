document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('skillModal');
    const closeBtn = document.querySelector('.close-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillVideo = document.getElementById('skillVideo');
    const comboSequence = document.querySelector('.combo-sequence');

    // Données des combos
    const skillsData = {
        combo1: {
            videoSrc: '../video/serpentstrike.mp4',
            combos: ['serpent1.png', 'serpent2.png', 'serpent3.png'],
            description: 'Un combo rapide qui enchaîne plusieurs coups avec les katanas, parfait pour infliger des dégâts importants en PvE.'
        },
        combo2: {
            videoSrc: '../video/shadowdance.mp4',
            combos: ['shadow1.png', 'shadow2.png', 'shadow3.png'],
            description: 'Une danse mortelle qui combine téléportation et attaques, idéale pour déstabiliser vos adversaires en PvP.'
        },
        combo3: {
            videoSrc: '../video/bladefury.mp4',
            combos: ['blade1.png', 'blade2.png', 'blade3.png'],
            description: 'Une tempête de lames qui crée une zone de dégâts autour de vous, excellent pour les combats de groupe.'
        }
    };

    // Ouvrir le modal
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skillId = this.dataset.skill;
            const skillData = skillsData[skillId];
            
            // Mettre à jour la vidéo
            skillVideo.src = skillData.videoSrc;
            
            // Mettre à jour les combos
            comboSequence.innerHTML = '';
            skillData.combos.forEach((combo, index) => {
                const img = document.createElement('img');
                const imagePath = `../photo/${combo}`;
                
                img.src = imagePath;
                img.alt = `Combo ${index + 1}`;
                
                img.onerror = function() {
                    this.src = '../photo/default.jpg';
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
}); 