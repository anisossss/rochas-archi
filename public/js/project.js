document.addEventListener("scroll", function () {
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
    setTimeout(function () {
      window.location.href = "/works";
    }, 1000);
  }
});

function openModal(imgElem) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  modal.style.display = "block";
  modalImg.src = imgElem.src;

  var span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  };
}
gsap.registerPlugin(ScrollTrigger);
gsap.from(".top-wrapper", {
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top 10%",
    end: "bottom bottom",
    scrub: 1,
  },
  y: 30,
});
gsap.from(".row-images", {
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top 10%",
    end: "bottom bottom",
    scrub: 1,
  },
  y: 100,
});
gsap.from(".wrapper-images", {
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top 10%",
    end: "bottom bottom",
    scrub: 1,
  },
  y: 100,
});
