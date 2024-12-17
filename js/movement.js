document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('skillModal');
    const closeBtn = modal.querySelector('.close-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillVideo = document.getElementById('skillVideo');
    const comboSequence = document.querySelector('.combo-sequence');
    const comboDescription = document.getElementById('combo-description-text');

    // Données des techniques avec traductions
    const skillsData = {
        technique1: {
            videoSrc: '../video/infinitemotion.mp4',
            combos: ['pnw_skill_2096.webp', 'pnw_skill_2097.webp', 'pnw_skill_2100.webp', 'pnw_skill_0918.webp', 'Cswap.jpg', 'pnw_skill_3124.webp', 'pnw_skill_0918.webp', 'pnw_skill_1682.webp', 'pnw_skill_3113.webp', 'pnw_skill_3111.webp', 'pnw_skill_0918.webp', 'Cswap.jpg'],
            descriptions: {
                fr: 'Technique de déplacement furtif qui vous rend temporairement invisible.',
                en: 'Stealth movement technique that makes you temporarily invisible.',
                de: 'Schleichbewegungstechnik, die dich vorübergehend unsichtbar macht.',
                es: 'Técnica de movimiento sigiloso que te hace temporalmente invisible.',
                ru: 'Техника скрытного перемещения, делающая вас временно невидимым.'
            }
        },
        technique2: {
            videoSrc: '../video/positiondusamourai.mp4',
            combos: ['pnw_skill_2096.webp', 'pnw_skill_2097.webp', 'pnw_skill_0918.webp', 'pnw_skill_2092.webp', 'pnw_skill_2116.webp', 'pnw_skill_0918.webp', 'pnw_skill_2102_re.webp', 'pnw_skill_0918.webp', 'pnw_skill_2110.webp', 'pnw_skill_0918.webp', 'pnw_skill_6467.webp', 'pnw_skill_0918.webp', 'pnw_skill_4725.webp', 'pnw_skill_0918.webp', 'pnw_skill_3128.webp', 'pnw_skill_0918.webp', 'pnw_skill_2078.webp', 'pnw_skill_0980.webp', 'pnw_skill_1701.webp', 'pnw_skill_1682.webp', 'pnw_skill_3113.webp', 'pnw_skill_3111.webp', 'cswap.jpg'],
            descriptions: {
                fr: 'Charge rapide et silencieuse vers votre cible.',
                en: 'Quick and silent charge towards your target.',
                de: 'Schneller und leiser Ansturm auf dein Ziel.',
                es: 'Carga rápida y silenciosa hacia tu objetivo.',
                ru: 'Быстрый и бесшумный рывок к цели.'
            }
        },
        technique3: {
            videoSrc: '../video/deplacementninja.mp4',
            combos: ['pnw_skill_0918.webp', 'pnw_skill_2101.webp'],
            descriptions: {
                fr: 'Déplacement rapide dans toutes les directions.',
                en: 'Quick movement in all directions.',
                de: 'Schnelle Bewegung in alle Richtungen.',
                es: 'Movimiento rápido en todas las direcciones.',
                ru: 'Быстрое перемещение во всех направлениях.'
            }
        }
    };

    // Fonction pour mettre à jour le texte selon la langue
    function updateModalContent(lang) {
        const currentSkillId = modal.getAttribute('data-current-skill');
        if (currentSkillId && skillsData[currentSkillId]) {
            const skillData = skillsData[currentSkillId];
            
            // Mettre à jour la description de la technique
            if (comboDescription && skillData.descriptions[lang]) {
                comboDescription.textContent = skillData.descriptions[lang];
            }

            // Mettre à jour le titre de la modal et le titre de la séquence
            const modalTitle = modal.querySelector('.modal-title');
            const sequenceTitle = modal.querySelector('[data-lang="combo_sequence"]');
            
            if (modalTitle) {
                modalTitle.textContent = translations[lang].movement.modal_title;
            }
            
            if (sequenceTitle) {
                sequenceTitle.textContent = translations[lang].movement.combo_sequence;
            }
        }
    }

    // Fonction pour ouvrir la modal
    function openModal(skillId) {
        const skillData = skillsData[skillId];
        
        // Stocker l'ID de la technique actuelle
        modal.setAttribute('data-current-skill', skillId);
        
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

        // Mettre à jour la description avec la langue actuelle
        const currentLang = document.getElementById('langSelect').value;
        if (comboDescription && skillData.descriptions[currentLang]) {
            comboDescription.textContent = skillData.descriptions[currentLang];
        }
        
        modal.style.display = 'block';
    }

    // Fonction pour fermer la modal
    function closeModal() {
        modal.style.display = 'none';
        if (skillVideo) {
            skillVideo.pause();
            skillVideo.currentTime = 0;
        }
        modal.removeAttribute('data-current-skill');
    }

    // Gestionnaire d'événements pour les cartes
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skillId = card.getAttribute('data-skill');
            openModal(skillId);
        });
    });

    // Gestionnaire pour le bouton de fermeture
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Empêcher la fermeture en cliquant sur le contenu de la modal
    modal.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Écouter les changements de langue
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.addEventListener('change', function(e) {
            updateModalContent(e.target.value);
        });
    }
}); 