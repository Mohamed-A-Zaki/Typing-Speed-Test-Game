const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

const words_number = words.length;

let levels = {
  Easy: 5,
  Meduim: 3,
  Hard: 2,
};

let level = "Easy";

let level_span = document.querySelector(".game .message span.level");
let seconds_span = document.querySelector(".game .message span.seconds");

setLevel();

let radios = document.querySelectorAll("form input");

radios.forEach((element) => {
  element.onclick = function () {
    level = this.nextSibling.textContent;
    setLevel();
  };
});

function setLevel() {
  level_span.innerHTML = level;
  seconds_span.innerHTML = levels[level];
}

let time_left = document.querySelector(".game .control .time span");
// time_left.innerHTML = levels[default_level];

let total_score = document.querySelector(".game .control span.total");
total_score.innerHTML = words.length;

let input_filed = document.querySelector(".game .input");
input_filed.addEventListener("paste", (e) => {
  e.preventDefault();
});

let the_word = document.querySelector(".game .the-word");
let upcomming_words = document.querySelector(".game .upcoming-words");
let score = document.querySelector(".game .control span.got");
let finish = document.querySelector(".game .finish");

let start_btn = document.querySelector(".game .start");
start_btn.addEventListener("click", function () {
  this.remove();
  input_filed.focus();
  generateWord();
});

function generateWord() {
  time_left.innerHTML = levels[level];
  // generate random word
  let random_word = words[Math.floor(Math.random() * words.length)];
  // show the word
  the_word.innerHTML = random_word;
  // remove word from the array of words
  words.splice(words.indexOf(random_word), 1);

  // empty upcomming words
  upcomming_words.innerHTML = "";

  // add words from array to upcomming words
  words.forEach((element) => {
    // create word
    let div = document.createElement("div");
    div.innerHTML = element;
    // append word to upcomming words
    upcomming_words.appendChild(div);
  });

  timing();
}

function timing() {
  let seconds = setInterval(() => {
    time_left.innerHTML--;
    if (time_left.innerHTML === "0") {
      clearInterval(seconds);
      if (the_word.innerHTML === input_filed.value) {
        // increase score
        score.innerHTML++;
        // clear input value
        input_filed.value = "";
        // call genarate word function
        if (words.length) {
          generateWord();
        } else {
          finish.innerHTML = "Congratulations";
          upcomming_words.remove();
        }
      } else {
        finish.classList.add("bad");
        finish.innerHTML = "Game Over";
      }
    }
  }, 1000);
}
