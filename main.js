// Selectors
const searchBtn = document.getElementById("search-btn");
const menuToggle = document.getElementById("menu-toggle");
const whyUsSection = document.querySelector(".why-us");
const achievements = whyUsSection.querySelectorAll(".achievements h3 span");
const filterBtns = document.querySelectorAll(".portfolio .filter-bar button");
const allProjects = document.querySelectorAll(".portfolio .projects-grid .box");
const videoBtn = document.getElementById("video-btn");
const plansToggle = document.getElementById("plans-toggle");
const readMoreBtns = document.querySelectorAll(".blog article .read-more-btn");
const showLessBtns = document.querySelectorAll(".blog article .show-less-btn");
const consultingForm = document.getElementById("consulting-form");
const newsletterForm = document.querySelector("footer .newsletter-form");
const scrollToTopBtn = document.getElementById("scroll-to-top-btn");

// Important Variables
let started = false;

// Events
window.addEventListener("scroll", () => {
  // Activate Header
  activateHeader();
  // Show Sections Content
  showSectionsContent();
  // Increase Achievements Nums
  achievementsIncreasing();
  // Show Scroll To Top Btn
  showScrollBtn();
});

searchBtn.addEventListener("click", openSearchBar);

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-overlay")) {
    closeSearchBar();
    closeInfoPanel();
    closeMainMenu();
    closeVideoPopup();
  }
});

menuToggle.addEventListener("click", () => {
  openInfoPanal();
  openMainMenu();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update Active Class
    updateActiveClass(btn);
    // Filter Projects
    filterProjects(btn.textContent);
  });
});

videoBtn.addEventListener("click", openVideoPopup);

plansToggle.addEventListener("click", function (e) {
  // Update Active Class
  updateActiveClass(e.target);
  // Show Right Plans
  togglePlans(e.target);
});

readMoreBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    flipArticle(e, btn);
  })
);

showLessBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    removeFlipedClass(e, btn);
  })
);

consultingForm.addEventListener("submit", function (e) {
  // Inputs
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const phoneInput = document.getElementById("phone-input");

  // Validate Form Fields
  validateName(nameInput);
  validateEmail(emailInput);
  validatePhone(phoneInput);
  // Check Validation
  checkValidation(e, consultingForm);
});

newsletterForm.addEventListener("submit", function (e) {
  // Input
  const emailInput = newsletterForm.querySelector("input");
  // Validate Field
  validateEmail(emailInput);
  // Check Validation
  checkValidation(e, newsletterForm);
});

scrollToTopBtn.addEventListener("click", scrollToTop);

// Functions
function activateHeader() {
  const header = document.querySelector("header");
  if (window.scrollY > 200) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function showOverlay() {
  document.body.classList.add("show-overlay");
}

function removeOverlay() {
  document.body.classList.remove("show-overlay");
}

function openSearchBar() {
  // Open Search Bar
  const searchBar = document.querySelector(".search-bar");
  searchBar.classList.add("opened");
  searchBar.querySelector("input").focus();
  // Show Overlay
  showOverlay();
}

function closeSearchBar() {
  // Close Search Bar
  const searchBar = document.querySelector(".search-bar");
  searchBar.classList.remove("opened");
  // Remove Overlay
  removeOverlay();
}

function openInfoPanal() {
  // Open Info Panal
  const infoPanel = document.querySelector(".info-panel");
  infoPanel.classList.add("opened");
  // Show Overlay
  showOverlay();
}

function closeInfoPanel() {
  // Close Info Panal
  const infoPanel = document.querySelector(".info-panel");
  infoPanel.classList.remove("opened");
  // Remove Overlay
  removeOverlay();
}

function openMainMenu() {
  // Open Main Menu
  const mainMenu = document.querySelector(".main-menu");
  mainMenu.classList.add("opened");
  // Show Overlay
  showOverlay();
}

function closeMainMenu() {
  // Close Main Menu
  const mainMenu = document.querySelector(".main-menu");
  mainMenu.classList.remove("opened");
  // Remove Overlay
  removeOverlay();
}

function showSectionsContent() {
  const allSections = document.querySelectorAll("section");
  allSections.forEach((sect) => {
    if (window.scrollY >= sect.offsetTop - 300) {
      sect.classList.add("showed");
    } else {
      sect.classList.remove("showed");
    }
  });
}

function countDown() {
  const daysUnit = document.getElementById("days");
  const hoursUnit = document.getElementById("hours");
  const minutesUnit = document.getElementById("minutes");
  const secondsUnit = document.getElementById("seconds");
  let countDownDate = new Date(2023, 11, 31, 23, 59, 59).getTime(); // Return MS From Jen 1 1970 To The End Of This Year 2023

  let counter = setInterval(() => {
    // Get Date Now
    let dateNow = new Date().getTime();

    // Get Date Difference Between Now & Count Down Time
    let dateDiff = countDownDate - dateNow;

    // Get Time Units
    let days = Math.trunc(dateDiff / (1000 * 60 * 60 * 24));
    let hours = Math.trunc(
      (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.trunc((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.trunc((dateDiff % (1000 * 60)) / 1000);

    // Update Time Units Content
    daysUnit.textContent = days < 10 ? `0${days}` : days;
    hoursUnit.textContent = hours < 10 ? `0${hours}` : hours;
    minutesUnit.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsUnit.textContent = seconds < 10 ? `0${seconds}` : seconds;

    // End The Count Down
    if (dateDiff === 0) {
      clearInterval(counter);
    }
  }, 1000);
}
countDown();

function achievementsIncreasing() {
  if (window.scrollY >= whyUsSection.offsetTop + 150) {
    if (!started) {
      achievements.forEach((num) => startCount(num));
    }
    started = true;
  }
}

function startCount(element) {
  let goal = element.getAttribute("data-goal");
  let count = setInterval(() => {
    element.textContent++;
    if (element.textContent == goal) {
      clearInterval(count);
    }
  }, 3000 / goal);
}

function updateActiveClass(clickedElement) {
  [...clickedElement.parentElement.children].forEach((ele) =>
    ele.classList.remove("active")
  );
  clickedElement.classList.add("active");
}

function filterProjects(val) {
  switch (val.toLowerCase()) {
    case "all projects":
      allProjects.forEach((project) => project.classList.remove("hidden"));
      break;
    case "app development":
      allProjects.forEach((project) => {
        if (project.classList.contains("ad")) {
          project.classList.remove("hidden");
        } else {
          project.classList.add("hidden");
        }
      });
      break;
    case "content marketing":
      allProjects.forEach((project) => {
        if (project.classList.contains("cm")) {
          project.classList.remove("hidden");
        } else {
          project.classList.add("hidden");
        }
      });
      break;
    case "seo optimization":
      allProjects.forEach((project) => {
        if (project.classList.contains("so")) {
          project.classList.remove("hidden");
        } else {
          project.classList.add("hidden");
        }
      });
      break;
    case "social marketing":
      allProjects.forEach((project) => {
        if (project.classList.contains("sm")) {
          project.classList.remove("hidden");
        } else {
          project.classList.add("hidden");
        }
      });
      break;
    case "web development":
      allProjects.forEach((project) => {
        if (project.classList.contains("wd")) {
          project.classList.remove("hidden");
        } else {
          project.classList.add("hidden");
        }
      });
      break;
  }
}

function openVideoPopup() {
  // Open Video Popup
  const videoPopup = document.querySelector(".video-popup");
  videoPopup.classList.add("opened");
  // Show Overlay
  showOverlay();
}

function closeVideoPopup() {
  // Close Video Popup
  const videoPopup = document.querySelector(".video-popup");
  videoPopup.classList.remove("opened");
  // Remove Overlay
  removeOverlay();
}

function togglePlans(clickedBtn) {
  const plansWrappers = document.querySelectorAll(".plans .content");
  if (clickedBtn.tagName === "SPAN") {
    if (clickedBtn.textContent === "Month") {
      plansWrappers[0].classList.remove("hidden");
      plansWrappers[1].classList.add("hidden");
    } else if (clickedBtn.textContent.includes("Year")) {
      plansWrappers[0].classList.add("hidden");
      plansWrappers[1].classList.remove("hidden");
    }
  }
}

function flipArticle(event, btn) {
  // Prevent The Links From Doing Anything
  event.preventDefault();
  // Flip The Article
  btn.parentElement.parentElement.parentElement.classList.add("fliped");
}

function removeFlipedClass(event, btn) {
  // Prevent The Links From Doing Anything
  event.preventDefault();
  // Remove Flipped Class From The Article
  btn.parentElement.parentElement.classList.remove("fliped");
}

// Form Validation
function checkValidation(event, form) {
  const allFields = form.querySelectorAll(".input");
  let isValid = true;

  allFields.forEach((field) => {
    if (field.classList.contains("error")) {
      isValid = false;
    }
  });

  if (!isValid) {
    event.preventDefault();
  }
}

function validateName(input) {
  let value = input.value.trim();
  let re = /^[a-zA-Zا-ي\s]+$/;

  if (re.test(value)) {
    setSuccess(input);
  } else {
    if (value === "") {
      setError(input, "Please Don't Leave This Field Empty");
    } else {
      setError(input, "Please Type Your Real Name");
    }
  }
}

function validateEmail(input) {
  let value = input.value.trim();
  let re = /^[\w-]{1,64}@[a-zA-Z0-9]{1,253}\.[a-z]{2,}(\.[a-z]{2,})?$/;

  if (re.test(value)) {
    setSuccess(input);
  } else {
    if (value === "") {
      setError(input, "Please Don't Leave This Field Empty");
    } else if (!value.includes("@")) {
      setError(input, "Email Address Must Contain '@'");
    } else {
      setError(input, "Please Type A Valid Email Address");
    }
  }
}

function validatePhone(input) {
  let value = input.value.trim();
  let re = /^[0-9]{11}$/;

  if (re.test(value)) {
    setSuccess(input);
  } else {
    if (value === "") {
      setError(input, "Please Don't Leave This Field Empty");
    } else {
      setError(input, "Please Type A Valid Phone Number");
    }
  }
}

function setSuccess(input) {
  input.parentElement.classList.add("success");
  input.parentElement.classList.remove("error");

  input.nextElementSibling.innerHTML = `<i class="fas fa-check-circle"></i>`;
  input.nextElementSibling.nextElementSibling.textContent =
    "The Field Is Valid";
}

function setError(input, msg) {
  input.parentElement.classList.add("error");
  input.parentElement.classList.remove("success");

  input.nextElementSibling.innerHTML = `<i class="fas fa-circle-exclamation"></i>`;
  input.nextElementSibling.nextElementSibling.textContent = msg;
}

function showScrollBtn() {
  if (window.scrollY >= 400) {
    scrollToTopBtn.classList.add("showed");
  } else {
    scrollToTopBtn.classList.remove("showed");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
