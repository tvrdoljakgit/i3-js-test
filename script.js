"use strict";

const pitanjeDOM = document.querySelector(".question");
const stepDOM = document.querySelectorAll(".step");
const answersDOM = document.querySelector(".answers");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const score = document.querySelector(".score");

const pitanja = [
  "Koliko macka ima rogova?",
  "Koliko pas ima krila?",
  "Koliko mrav ima usiju",
  "Koliko rak ima nogu",
];

const odabraniOdgovori = [0, 0, 0, 0];

const randomNumber = function () {
  return Math.round(Math.random() * (8 - 2) + 2);
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

const brojOdgovoraPoSlajdu = [
  randomNumber(),
  randomNumber(),
  randomNumber(),
  randomNumber(),
];

for (let j = brojOdgovoraPoSlajdu[0]; j > 0; j--) {
  const html = `<label class="container" data-id=${j}>
                <span class="answer">${j}</span>
              </label>`;
  answersDOM.insertAdjacentHTML("afterbegin", html);
}
const element = document.querySelectorAll(".container");
element.forEach((el) => {
  el.addEventListener("click", function (e) {
    el.classList.add("color");

    if (e.target.dataset.id === odabraniOdgovori[i]) {
      odabraniOdgovori.splice(0, 1, 0);
      el.classList.remove("color");
    } else {
      odabraniOdgovori.splice(0, 1, e.target.dataset.id);
      element.forEach((element) => {
        element.classList.remove("color");
      });
      el.classList.add("color");
    }
  });
});

let i = 0;
pitanjeDOM.textContent = pitanja[0];
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const resultButton = document.querySelector(".result");

const showAnswers = function (i) {
  const element = document.querySelectorAll(".container");
  element.forEach((el) => {
    el.remove();
  });
  for (let j = brojOdgovoraPoSlajdu[i]; j > 0; j--) {
    const html = `<label class="container" data-id=${j}>
                  <span class="answer">${j}</span>
                </label>`;
    answersDOM.insertAdjacentHTML("afterbegin", html);
  }
  const elementNew = document.querySelectorAll(".container");
  elementNew.forEach((el) => {
    if (odabraniOdgovori[i] === el.dataset.id) {
      el.classList.toggle("color");
    }
    el.addEventListener("click", function (e) {
      el.classList.add("color");

      if (e.target.dataset.id === odabraniOdgovori[i]) {
        odabraniOdgovori.splice(i, 1, 0);
        el.classList.remove("color");
      } else {
        odabraniOdgovori.splice(i, 1, e.target.dataset.id);
        elementNew.forEach((element) => {
          element.classList.remove("color");
        });
        el.classList.add("color");
      }
    });
  });
};

const progressStep = function (i) {
  stepDOM.forEach((step, index) => {
    step.classList.remove("active");
    if (index === i) {
      step.classList.add("active");
    }
  });
};

const goToNext = function () {
  i++;
  prevButton.classList.remove("hidden");
  pitanjeDOM.textContent = pitanja[i];
  if (i === pitanja.length - 1) {
    nextButton.classList.toggle("hidden");

    resultButton.classList.toggle("hidden");
  }

  showAnswers(i);
  progressStep(i);
};

const goToPrev = function () {
  i--;
  resultButton.classList.add("hidden");
  nextButton.classList.remove("hidden");
  pitanjeDOM.textContent = pitanja[i];
  if (i === 0) {
    prevButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  }
  showAnswers(i);

  progressStep(i);
};

resultButton.addEventListener("click", function () {
  const a = (curValue) => curValue > 0;

  if (odabraniOdgovori.every(a)) {
    console.log("working");
    console.log(score);
    score.textContent = "5 / 5";
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
});

nextButton.addEventListener("click", goToNext);
prevButton.addEventListener("click", goToPrev);

stepDOM.forEach((step, indx) => {
  step.addEventListener("click", function () {
    i = indx;
    pitanjeDOM.textContent = pitanja[indx];
    if (indx === 0) {
      nextButton.classList.remove("hidden");
      prevButton.classList.add("hidden");
      resultButton.classList.add("hidden");
      showAnswers(indx);
    }
    if (indx > 0 && indx < 3) {
      prevButton.classList.remove("hidden");
      nextButton.classList.remove("hidden");
      resultButton.classList.add("hidden");
      showAnswers(indx);
    }
    if (indx === 3) {
      nextButton.classList.add("hidden");
      resultButton.classList.remove("hidden");
      prevButton.classList.remove("hidden");
      showAnswers(indx);
    }

    progressStep(indx);
  });
});
