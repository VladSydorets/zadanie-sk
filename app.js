const API_LINK = "https://mocki.io/v1/08021574-f46d-4231-bca1-ffd6a3315b7c";

const getSliderData = () => {
  axios
    .get(API_LINK)
    .then((response) => {
      const data = response.data.data;
      setSlider(data);
    })
    .catch((error) => console.error(error));
};

getSliderData();

const setSlider = (data) => {
  const titles = document.querySelectorAll(".splide-title");
  const descriptions = document.querySelectorAll(".splide-text");
  const images = document.querySelectorAll(".splide-image");

  for (let i = 0; i < data.length; i++) {
    titles[i].textContent = data[i].title;
    descriptions[i].textContent = shortenString(data[i].content);
    images[i].src = data[i].image;
  }
};

const shortenString = (string) => {
  const maxLength = 80;

  let trimmedString = string.substr(0, maxLength);
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
  );

  return trimmedString + "...";
};

document.addEventListener("DOMContentLoaded", function () {
  new Splide(".splide", {
    rewind: true,
    perPage: 4,
    autoplay: true,
    interval: 5000,
    breakpoints: {
      1200: {
        perPage: 3,
      },
      992: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      },
    },
  }).mount();
});

const form = document.querySelector(".contact-form");

const email = document.querySelector("#input-email");
const message = document.querySelector("#input-message");
const subject = document.querySelector("#select-subject");

const isRequired = (value) => (value === "" ? false : true);

const showError = (input, message) => {
  const formField = input.parentElement;

  input.classList.add("error");

  const error = document.createElement("span");
  error.classList.add("contact-form--error");

  error.textContent = message;
  formField.insertBefore(error, input);
};

const clearErrors = () => {
  if (message.classList.contains("error")) message.classList.remove("error");
  if (email.classList.contains("error")) email.classList.remove("error");
  if (subject.classList.contains("error")) subject.classList.remove("error");

  let spans = form.querySelectorAll("span");
  if (spans !== null) {
    spans.forEach((span) => span.remove());
  }
};

form.addEventListener("submit", (event) => {
  clearErrors();

  if (!isRequired(message.value)) showError(message, "Message is required");
  if (!isRequired(email.value)) showError(email, "Email is required");

  if (subject.value === "subject") showError(subject, "Choose subject");

  event.preventDefault();
});
