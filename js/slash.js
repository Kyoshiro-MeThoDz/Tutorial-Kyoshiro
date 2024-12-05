var h1 = document.querySelector(".ninja");

h1.addEventListener("input", function() {
    // Met à jour l'attribut data-heading lors de la modification du texte
    this.setAttribute("data-heading", this.innerText);
});