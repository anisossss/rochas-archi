document.addEventListener("DOMContentLoaded", function () {
  const imagesArray = [
    "/pictures/villa/a_b1.webp",
    "/pictures/immeuble/a_c.webp",
    "/pictures/immeuble/a_k1.webp",
    "/pictures/villa/a_m1.webp",
    "/pictures/interieur/a_n1.webp",
    "/pictures/villa/balzac1.webp",
    "/pictures/villa/c_w1.webp",
    "/pictures/immeuble/carreblanc1.webp",
    "/pictures/immeuble/embc2.webp",
    "/pictures/villa/f_m1.webp",
    "/pictures/immeuble/grissa1.webp",
    "/pictures/villa/h_b.webp",
    "/pictures/villa/h_m.webp",
    "/pictures/immeuble/hannouna.webp",
    "/pictures/villa/i_s1.webp",
    "/pictures/immeuble/k_a1.jpg",
    "/pictures/immeuble/k_d1.webp",
    "/pictures/immeuble/kaiser1.webp",
    "/pictures/villa/m_b1.jpg",
    "/pictures/immeuble/m_g1.webp",
    "/pictures/immeuble/n_g1.webp",
    "/pictures/interieur/oceana1.webp",
    "/pictures/commerce/pharmacie1.webp",
    "/pictures/immeuble/r_g1.webp",
    "/pictures/villa/s_z.webp",
    "/pictures/industrie/showroom1.webp",
    "/pictures/immeuble/verde1.webp",
    "/pictures/immeuble/west1.webp",
    "/pictures/immeuble/wight.webp",
    "/pictures/villa/z_b_exterieur1.webp",
    "/pictures/immeuble/z_g1.webp",
    "/pictures/villa/z_s1.webp",
    "/pictures/villa/z_z_exterieur1.webp",
  ];
  const titlesArray = [
    "Immeuble A_B",
    "Immeuble A_C",
    "Immeuble A_K",
    "Immeuble A_M",
    "Immeuble A_N",
    "Immeuble Balzac",
    "Immeuble C_W",
    "CARRE BLANC",
    "EMBC",
    "Immeuble F_M",
    "Immeuble GRISSA",
    "Immeuble H_B",
    "Immeuble H_M",
    "Immeuble HANNOUNA",
    "Immeuble I_S",
    "Immeuble K_A",
    "Immeuble K_D",
    "Immeuble KAISER",
    "Immeuble M_B",
    "Immeuble M_G",
    "Immeuble N_G",
    "Immeuble OCEANA",
    "Pharmacie Bouraoui",
    "Immeuble R_G",
    "Immeuble S_Z",
    "SHOWROOM CHERRY",
    "VERDE",
    "WEST",
    "WIGHT",
    "Villa Z_B",
    "Immeuble Z_G",
    "Villa Z_S",
    "Villa Z_Z",
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
    "/works/z_g",
    "/works/z_s",
    "/works/z_z",
  ];

  const worksTimeline = document.querySelector(".works-timeline");

  for (let i = 0; i < imagesArray.length; i++) {
    const imageSrc = imagesArray[i];
    const title = titlesArray[i];
    const number = numbersArray[i];
    const link = linksArray[i];

    const anchorElement = document.createElement("a");
    anchorElement.href = link;

    const imgElement = document.createElement("img");
    imgElement.src = imageSrc;
    imgElement.setAttribute("data-cursor", "pointer");

    anchorElement.appendChild(imgElement);

    const titleElement = document.createElement("p");
    titleElement.textContent = title;
    titleElement.classList.add("tag");

    const numberElement = document.createElement("p");
    numberElement.textContent = number;
    numberElement.classList.add("numbr");

    const container = document.createElement("div");
    container.classList.add("work-item");

    container.appendChild(anchorElement);
    container.appendChild(numberElement);
    container.appendChild(titleElement);
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("tag-number");

    parentDiv.appendChild(numberElement);
    parentDiv.appendChild(titleElement);

    container.appendChild(parentDiv);

    worksTimeline.appendChild(container);
  }
  const tagNumbers = document.querySelectorAll(".tag-number");

  // Animate parent divs with ScrollTrigger
  tagNumbers.forEach((tagNumber) => {
    gsap.from(tagNumber, {
      scrollTrigger: {
        trigger: tagNumber,
        start: "center 90%",
        end: "center 40%",
        scrub: 1.5,
        markers: true,
      },
      y: 120,
    });
  });
});
