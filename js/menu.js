document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const previewItems = document.querySelectorAll('.preview-item');
    let currentIndex = 0;
    const totalSlides = items.length;
    let isAnimating = false;

    // Tableau des images pour le background des carousel-items
    const backgroundImages = [
        '../photo/wallnin.webp',
        '../photo/wallnin1.jpg',
        '../photo/wallnin2.jpg',
        '../photo/wallnin4.jpg',
        '../photo/wallnin6.jpg'
    ];

    function initializeSlides() {
        items.forEach((item, i) => {
            item.style.transform = `translateX(${100 * (i - currentIndex)}%)`;
            item.style.opacity = i === currentIndex ? '1' : '0';
            item.style.transition = 'none';
            item.style.backgroundImage = `url(${backgroundImages[i]})`;
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center';
        });

        // Initialiser les 5 miniatures
        updatePreviews(currentIndex);
    }

    function showItem(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const moveLeft = direction === 'prev';
        const oldIndex = currentIndex;

        items.forEach((item, i) => {
            let position = i - index;
            
            if (moveLeft) {
                if (oldIndex === 0 && index === totalSlides - 1) {
                    position = position + totalSlides;
                }
            } else {
                if (oldIndex === totalSlides - 1 && index === 0) {
                    position = position - totalSlides;
                }
            }

            item.style.transition = 'all 0.5s ease';
            item.style.transform = `translateX(${100 * position}%)`;
            item.style.opacity = i === index ? '1' : '0';
        });

        setTimeout(() => {
            items.forEach((item, i) => {
                item.style.transition = 'none';
                let normalPosition = i - index;
                item.style.transform = `translateX(${100 * normalPosition}%)`;
            });
            isAnimating = false;
        }, 500);

        updatePreviews(index);
    }

    function updatePreviews(index) {
        // Calculer les indices des 5 prochaines images
        const previewIndices = [];
        for (let i = 0; i < 5; i++) {
            let nextIndex = (index + i + 1) % totalSlides;
            previewIndices.push(nextIndex);
        }

        // Mettre à jour toutes les miniatures
        previewItems.forEach((preview, i) => {
            const img = preview.querySelector('img');
            img.style.opacity = '0';
            
            setTimeout(() => {
                img.src = backgroundImages[previewIndices[i]];
                img.style.opacity = '1';
            }, 250);
        });
    }

    function nextSlide() {
        if (isAnimating) return;
        currentIndex = (currentIndex + 1) % totalSlides;
        showItem(currentIndex, 'next');
    }

    function prevSlide() {
        if (isAnimating) return;
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showItem(currentIndex, 'prev');
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    initializeSlides();
}); 