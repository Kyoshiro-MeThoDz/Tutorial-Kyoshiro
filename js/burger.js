document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo'); 
    const menu = document.getElementById('menu');  
    const closeBtn = document.getElementById('close-btn');  

    logo.addEventListener('click', () => {
        menu.classList.toggle('open'); 
        logo.classList.toggle('open');  
    });

    closeBtn.addEventListener('click', () => {
        menu.classList.remove('open');  
        logo.classList.remove('open');  
    });
});
