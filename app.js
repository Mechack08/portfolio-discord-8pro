const header = document.querySelector(".header");
const headerContents = document.querySelector(".header__content");
const headerInfoCuntents = document.querySelector(".header_infos-content");
const jobTitle = document.querySelector(".job__title");
const icons = document.querySelectorAll(".header__media-icon");
const bannerImg = document.querySelector(".banner__img");
const bannerImgContainer = document.querySelector(".header__img");
const headerBtn = document.querySelectorAll(".header__btn");
const navbar = document.querySelector(".navbar");
const nav = document.querySelector(".navigations__container");
/* Sections */
const resume = document.querySelector(".section__resume");
const sectionHeader = document.querySelectorAll(".section__header");
const sectionBody = document.querySelectorAll(".section__body");
const skillsContainer = document.querySelector(".skills__container");

/* Load banner */
const handleBanner = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  /* display */
  headerInfoCuntents.style.transform = "scale(1)";
  headerInfoCuntents.style.opacity = "1";

  icons.forEach((icon, i) => {
    icon.style.transform = "translateY(0)";
    icon.style.opacity = 1;
  });

  bannerImg.setAttribute("src", bannerImg.dataset.owner);

  bannerImg.addEventListener("load", function () {
    bannerImgContainer.classList.remove("img__blur");
  });

  headerBtn.forEach((btn) => {
    btn.style.transform = "translateX(0)";
    btn.style.opacity = 1;
  });

  observer.unobserve(headerContents);
};
const bannerObserver = new IntersectionObserver(handleBanner, {
  root: null,
  threshold: 0.1,
});

bannerObserver.observe(headerContents);

/* navbar */
nav.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav__item");

  if (!clicked) return;

  console.log("YES");
});

/* Navbar animation fade */
const handleNavbarAnim = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sublings = e.target
      .closest(".navigations__container")
      .querySelectorAll(".nav__link");
    const logo = document.querySelector(".logo");

    sublings.forEach((l) => {
      if (l !== link) l.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleNavbarAnim.bind(0.3));
nav.addEventListener("mouseout", handleNavbarAnim.bind(1));

/* Sticky Navigation */
const navbarHeight = navbar.getBoundingClientRect().height;

const handleHeader = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navbar.classList.add("sticky");
  else navbar.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(handleHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${navbarHeight}px`,
});
headerObserver.observe(header);

/* SECTIONS */

/* Scrolling */
document
  .querySelector(".navigations__container")
  .addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");

      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

/* Observe Resume */
const handleSectionHeader = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("hide");

  observer.unobserve(resume);
};

const sectionHeaderObserver = new IntersectionObserver(handleSectionHeader, {
  root: null,
  threshold: 0.2,
});

sectionHeader.forEach((sh) => sectionHeaderObserver.observe(sh));

/* Section body */
const handleSectionBody = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("hide");
};

const sectionBodyObserver = new IntersectionObserver(handleSectionBody, {
  root: null,
  threshold: 0.1,
});
sectionBody.forEach((sb) => sectionBodyObserver.observe(sb));

/* Skills */
const skillsData = [
  {
    id: 1,
    title: "HTML",
    level: 95,
    type: "coding",
  },
  {
    id: 2,
    title: "CSS",
    level: 93,
    type: "coding",
  },
  {
    id: 3,
    title: "JavaScript",
    level: 90,
    type: "coding",
  },
  {
    id: 4,
    title: "ReactJs",
    level: 87,
    type: "coding",
  },
  {
    id: 5,
    title: "Redux",
    level: 89,
    type: "coding",
  },
  {
    id: 6,
    title: "Saas",
    level: 83,
    type: "coding",
  },
  {
    id: 7,
    title: "NodeJs",
    level: 77,
    type: "coding",
  },
  {
    id: 8,
    title: "PHP",
    level: 65,
    type: "coding",
  },
  {
    id: 9,
    title: "MySql",
    level: 91,
    type: "coding",
  },
  {
    id: 10,
    title: "MongoDb",
    level: 83,
    type: "coding",
  },
  {
    id: 11,
    title: "AdobeXD",
    level: 78,
    type: "designing",
  },
  {
    id: 12,
    title: "Figma",
    level: 60,
    type: "designing",
  },
  {
    id: 13,
    title: "Photoshop",
    level: 54,
    type: "designing",
  },
];

/* Generate skills */

const coding = document.querySelector(".coding");
const designing = document.querySelector(".design");

skillsData
  .filter((cod) => cod.type === "coding")
  .forEach((c) => {
    coding.insertAdjacentHTML(
      "beforeend",
      `
        <div class="level">
            <span>${c.title}</span>
            <div class="level__line level__line-${c.id}" data-level="${c.id}">
                <div class="line__pourcentage line__${c.id}" data-level="${c.level}"></div>
            </div>
            <p class="pourcentage pourcentage__${c.level}">${c.level}%</p>
        </div>
        `
    );
  });
skillsData
  .filter((dis) => dis.type === "designing")
  .forEach((d) => {
    designing.insertAdjacentHTML(
      "beforeend",
      `
        <div class="level">
            <span>${d.title}</span>
            <div class="level__line" data-level="${d.id}">
                <div class="line__pourcentage level__${d.id}" data-level="${d.level}"></div>
            </div>
            <p class="pourcentage pourcentage__${d.level}">${d.level}%</p>
        </div>
        `
    );
  });

const levels = document.querySelectorAll(".line__pourcentage");
const skills = document.querySelector(".skills__container");
const lbPourcentage = document.querySelectorAll(".pourcentage");

const handleSkillsObserver = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  console.log(entry);

  levels.forEach((level, i) => {
    level.style.width = `${level.dataset.level}%`;

    lbPourcentage[i].style.left = `${level.dataset.level}%`;
  });
};

const skillsObserver = new IntersectionObserver(handleSkillsObserver, {
  root: null,
  threshold: 0.25,
});

skillsObserver.observe(skills);

/* Slider Portfolio */
const portfolioSlide = document.querySelectorAll(".slide__item");
const btnNext = document.querySelector(".arrow__right");
const btnPrev = document.querySelector(".arrow__left");
const dots = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = portfolioSlide.length;

/* Create slide dots  */
const createSlideDots = function () {
  portfolioSlide.forEach((_, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `
    <div class="dot" data-slide="${i}"></div>
    `
    );
  });
};
createSlideDots();

/* Activate current dot */
const activeCurrentDot = function (slideNumber) {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("dot__active"));

  document
    .querySelector(`.dot[data-slide="${slideNumber}"]`)
    .classList.add("dot__active");
};
activeCurrentDot(0);

/* Create slider */
const goToSlide = function (slideNumber) {
  portfolioSlide.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - slideNumber)}%)`)
  );
};
goToSlide(0);

const next = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activeCurrentDot(currentSlide);
};
const prev = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activeCurrentDot(currentSlide);
};

/* Slide with btns */
btnNext.addEventListener("click", next);
btnPrev.addEventListener("click", prev);

/* slide with keybord arrows */
document.addEventListener("keydown", function (e) {
  e.key === "ArrowRight" && next();
  e.key === "ArrowLeft" && prev();
});

/* slide with dots */
dots.addEventListener("click", function (e) {
  if (!e.target.classList.contains("dot")) return;

  const slide = e.target.dataset.slide;
  goToSlide(slide);
  activeCurrentDot(slide);
});

/* Contact form */
const lblInput = document.querySelectorAll(".placeholder");
const inputs = document.querySelectorAll(".input__container");

lblInput.forEach((lbl) =>
  lbl.addEventListener("click", function (e) {
    lbl.classList.add("activated");
  })
);

/* ===== RESPONSIVE ===== */
const humbergBtn = document.querySelector(".humberger__btn");

humbergBtn.addEventListener("mouseover", function () {
  humbergBtn.classList.add("hover");
});
humbergBtn.addEventListener("mouseout", function () {
  humbergBtn.classList.remove("hover");
});
humbergBtn.addEventListener("click", function () {
  header.classList.toggle("small__screen");
  humbergBtn.classList.toggle("clicked");
});
