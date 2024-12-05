const summaries = {
    profil: document.querySelector(".details__summary__profil"),
    skills: document.querySelector(".details__summary__skills"),
    spells: document.querySelector(".details__summary__spells"),
  };
  
  const images = {
    profil: document.querySelector(".main__aside__profil"),
    skills: document.querySelector(".main__aside__skills"),
    spells: document.querySelector(".main__aside__spells"),
  };
  
  const handleClick = (type) => {
    Object.keys(images).forEach((key) => {
      images[key].style.display = key === type ? "block" : "none";
    });
  };
  
  Object.keys(summaries).forEach((key) => {
    summaries[key].addEventListener("click", () => handleClick(key));
  });
  