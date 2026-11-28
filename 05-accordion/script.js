"use strict";

const questions = document.querySelectorAll(".question");
questions.forEach((question) => {
  question.addEventListener("click", () => {
    const isOpen = question.getAttribute("aria-expanded") == "true";

    questions.forEach((item) => {
      item.setAttribute("aria-expanded", "false");
    });
    question.setAttribute("aria-expanded", !isOpen);
  });
});
