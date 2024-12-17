document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('skillModal');
    const closeBtn = document.querySelector('.close-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillVideo = document.getElementById('skillVideo');
    const comboSequence = document.querySelector('.combo-sequence');

    // Données des techniques (à compléter selon vos besoins)
    const skillsData = {
        technique1: {
            videoSrc: '../video/smoketrap.mp4',
            combos: ['../photo/pnw_skill_1681.webp', '../photo/pnw_skill_2078.webp', '../photo/pnw_skill_0980.webp', '../photo/pnw_skill_1701.webp']
        },
        technique2: {
            videoSrc: '../video/grabfast.mp4',
            combos: ['../photo/pnw_skill_4039.webp', '../photo/pnw_skill_0918.webp', '../photo/pnw_skill_3107.webp']
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
            skillData.combos.forEach(combo => {
                const img = document.createElement('img');
                img.src = `../photo/${combo}`;
                img.alt = 'Combo';
                comboSequence.appendChild(img);
            });
            
            modal.style.display = 'block';
        });
    });

    // Fermer le modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        skillVideo.pause();
        skillVideo.currentTime = 0;
    });

    // Fermer le modal en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            skillVideo.pause();
            skillVideo.currentTime = 0;
        }
    });
}); 