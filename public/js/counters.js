let projectCount = 0;
let experienceCount = 0;
let teamCount = 0;
let isProjectCounting = false;
let isExperienceCounting = false;
let isTeamCounting = false;
let projectCounterElement = document.getElementById("projectCounter");
let experienceCounterElement = document.getElementById("experienceCounter");
let teamCounterElement = document.getElementById("countercollab");

function startCounting(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target === document.querySelector(".experience-wrapper")) {
        if (!isProjectCounting) {
          isProjectCounting = true;
          countProjects();
        }
        if (!isExperienceCounting) {
          isExperienceCounting = true;
          countExperience();
        }
      } else if (
        entry.target === document.querySelector(".right-column-team")
      ) {
        if (!isTeamCounting) {
          isTeamCounting = true;
          countTeam();
        }
      }
    } else {
      if (entry.target === document.querySelector(".experience-wrapper")) {
        isProjectCounting = false;
        projectCount = 0;
        projectCounterElement.textContent = projectCount;

        isExperienceCounting = false;
        experienceCount = 0;
        experienceCounterElement.textContent = experienceCount;
      } else if (
        entry.target === document.querySelector(".right-column-team")
      ) {
        isTeamCounting = false;
        teamCount = 0;
        teamCounterElement.textContent = teamCount;
      }
    }
  });
}
function countProjects() {
  if (projectCount + 100 <= 1800 && isProjectCounting) {
    projectCount += 100;
  } else {
    projectCount = 1800;
    isProjectCounting = false;
  }
  projectCounterElement.textContent = projectCount;
  if (isProjectCounting) {
    setTimeout(countProjects, 100);
  }
}

function countExperience() {
  if (experienceCount <= 20 && isExperienceCounting) {
    experienceCounterElement.textContent = experienceCount;
    experienceCount++;
    setTimeout(countExperience, 100);
  }
}

function countTeam() {
  if (teamCount <= 20 && isTeamCounting) {
    teamCounterElement.textContent = teamCount;
    teamCount++;
    setTimeout(countTeam, 100);
  }
}

const observer = new IntersectionObserver(startCounting);
const targetElements = document.querySelectorAll(
  ".experience-wrapper, .right-column-team"
);

targetElements.forEach((element) => {
  observer.observe(element);
});
