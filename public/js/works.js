document.addEventListener("DOMContentLoaded", function () {
  const imagesArray = [
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc2.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc2.webp",
    "/pictures/immeuble/embc2.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc2.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc2.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc2.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc2.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
    "/pictures/immeuble/embc1.webp",
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

  const numbersArray = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
  ];
  const linksArray = [
    "/works/a_b",
    "/works/a_c",
    "/works/a_k",
    "/works/a_m",
    "/works/a_n",
    "/works/balzac",
    "/works/c_w",
    "/works/carreblanc",
    "/works/embc",
    "/works/f_m",
    "/works/grissa",
    "/works/h_b",
    "/works/h_m",
    "/works/hannouna",
    "/works/i_s",
    "/works/k_a",
    "/works/k_d",
    "/works/kacem_immeuble",
    "/works/kaiser",
    "/works/m_b",
    "/works/m_g",
    "/works/n_g",
    "/works/oceana",
    "/works/pharmacie",
    "/works/r_g",
    "/works/s_z",
    "/works/showroom",
    "/works/verde",
    "/works/west",
    "/works/wight",
    "/works/wight",
    "/works/z_b",
    "/works/z_s",
    "/works/z_z",
  ];

  const worksTimeline = document.querySelector(".works-timeline");

  for (let i = 0; i < imagesArray.length; i++) {
    const imageSrc = imagesArray[i];
    const title = titlesArray[i];
    const number = numbersArray[i];
    const link = linksArray[i];

    // Create an anchor element
    const anchorElement = document.createElement("a");
    anchorElement.href = link;

    // Create an image element
    const imgElement = document.createElement("img");
    imgElement.src = imageSrc;
    imgElement.setAttribute("data-cursor", "pointer");

    // Append the image to the anchor element
    anchorElement.appendChild(imgElement);

    const titleElement = document.createElement("p");
    titleElement.textContent = title;
    titleElement.classList.add("tag");

    const numberElement = document.createElement("p");
    numberElement.textContent = number;
    numberElement.classList.add("numbr");

    const container = document.createElement("div");
    container.classList.add("work-item");

    // Append the anchor element to the container
    container.appendChild(anchorElement);
    container.appendChild(numberElement);
    container.appendChild(titleElement);

    // Append the container to the worksTimeline
    worksTimeline.appendChild(container);
  }
});
