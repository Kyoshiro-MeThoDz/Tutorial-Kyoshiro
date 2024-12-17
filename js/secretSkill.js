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
            videoSrc: '../video/smoketrap.mp4',
            combos: ['pnw_skill_1681.webp', 'pnw_skill_2078.webp', 'pnw_skill_0980.webp', 'pnw_skill_1701.webp'],
            descriptions: {
                fr: 'Cet enchaînement vous permet d\'être protégé tout en lançant une compétence d\'étourdissement.',
                en: 'This sequence allows you to be protected while launching a stun skill.',
                de: 'Diese Sequenz ermöglicht es dir, geschützt zu sein, während du eine Betäubungsfähigkeit einsetzt.',
                es: 'Esta secuencia te permite estar protegido mientras lanzas una habilidad de aturdimiento.',
                ru: 'Эта последовательность позволяет вам быть защищенным при запуске оглушающего навыка.'
            }
        },
        technique2: {
            videoSrc: '../video/grabfast.mp4',
            combos: ['pnw_skill_4039.webp', 'pnw_skill_0918.webp', 'pnw_skill_3107.webp'],
            descriptions: {
                fr: 'Une technique rapide pour attraper votre adversaire.',
                en: 'A quick technique to grab your opponent.',
                de: 'Eine schnelle Technik, um deinen Gegner zu packen.',
                es: 'Una técnica rápida para agarrar a tu oponente.',
                ru: 'Быстрая техника для захвата противника.'
            }
        },
        technique3: {
            videoSrc: '../video/boostdegatvitesse.mp4',
            combos: ['pnw_skill_0918.webp', 'pnw_skill_2101.webp', 'pnw_skill_2104.webp', 'pnw_skill_2088.webp'],
            descriptions: {
                fr: 'Augmente vos dégâts et votre vitesse.',
                en: 'Increases your damage and speed.',
                de: 'Erhöht deinen Schaden und deine Geschwindigkeit.',
                es: 'Aumenta tu daño y velocidad.',
                ru: 'Увеличивает ваш урон и скорость.'
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
                modalTitle.textContent = translations[lang].secretSkill[lang].modal_title;
            }
            
            if (sequenceTitle) {
                sequenceTitle.textContent = translations[lang].secretSkill[lang].combo_sequence;
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