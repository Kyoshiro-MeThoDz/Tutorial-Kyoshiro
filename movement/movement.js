document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('skillModal');
    const closeBtn = document.querySelector('.close-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillVideo = document.getElementById('skillVideo');
    const comboSequence = document.querySelector('.combo-sequence');

    // Données des mouvements
    const skillsData = {
        movement1: {
            videoSrc: '../video/infinitemotion.mp4',
            combos: ['doublejump1.png', 'doublejump2.png', 'doublejump3.png'],
            description: 'Ce mouvement vous permet de vous déplacer infiniment.'
        },
        movement2: {
            videoSrc: '../video/ghoststep.mp4',
            combos: ['pnw_skill_0918.webp', 'pnw_skill_2101.webp', 'ghoststep3.png'],
            description: 'Le Ghost Step vous rend momentanément invisible, parfait pour des approches furtives ou des esquives rapides.'
        },
        movement3: {
            videoSrc: '../video/silentcharge.mp4',
            combos: ['silentcharge1.png', 'silentcharge2.png', 'silentcharge3.png'],
            description: 'Une charge silencieuse qui vous permet de vous déplacer rapidement tout en restant indétectable.'
        }
    };

    // Même logique que secretSkill.js pour le reste du code
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

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        skillVideo.pause();
        skillVideo.currentTime = 0;
    });
}); 