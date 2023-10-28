document.addEventListener("DOMContentLoaded", function () {
  const imagesArray = [
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher3.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/salon.jpg",
    "/pictures/salon_vue1.jpg",
    "/pictures/salon2.jpg",
    "/pictures/salon_vue3.jpg",
    "/pictures/salon2.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
    "/pictures/chambre_coucher1.jpg",
  ];
  const titlesArray = [
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
    "Pharmacie Bouraoui",
  ];

  const timeline = document.querySelector(".timeline");
  const leftColumn = document.querySelector(".left-column");
  const rightColumn = document.querySelector(".right-column");

  imagesArray.forEach((imagePath, index) => {
    const timelineItem = document.createElement("div");
    timelineItem.classList.add("timeline-item");
    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = `Image ${index + 1}`;

    const numberTextContainer = document.createElement("div");
    numberTextContainer.classList.add("number-text-container");

    const number = document.createElement("span");
    const text = document.createElement("h1");

    number.textContent = index + 1;
    text.textContent = titlesArray[index];
    text.classList.add("bottom-left-text");
    number.classList.add("number");

    numberTextContainer.appendChild(number);
    numberTextContainer.appendChild(text);
    timelineItem.appendChild(image);

    timelineItem.appendChild(numberTextContainer);

    if (index % 2 === 0) {
      leftColumn.appendChild(timelineItem);
    } else {
      rightColumn.appendChild(timelineItem);
    }
  });
});
