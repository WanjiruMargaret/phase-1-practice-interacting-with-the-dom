// challenge.js

// DOM Elements
const counterDisplay = document.getElementById("counter");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const heartBtn = document.getElementById("heart");
const pauseBtn = document.getElementById("pause");
const likesList = document.querySelector(".likes");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("list");

let count = 0;
let isPaused = false;
let intervalID = null;
const likeTracker = {};

function startCounter() {
  intervalID = setInterval(() => {
    if (!isPaused) {
      count++;
      updateCounter();
    }
  }, 1000);
}

function updateCounter() {
  counterDisplay.textContent = count;
}

function toggleButtons(disabled) {
  plusBtn.disabled = disabled;
  minusBtn.disabled = disabled;
  heartBtn.disabled = disabled;
  commentInput.disabled = disabled;
}

// Event Listeners
plusBtn.addEventListener("click", () => {
  count++;
  updateCounter();
});

minusBtn.addEventListener("click", () => {
  count--;
  updateCounter();
});

heartBtn.addEventListener("click", () => {
  if (likeTracker[count]) {
    likeTracker[count]++;
    document.getElementById(`like-${count}`).textContent = `${count} has been liked ${likeTracker[count]} times`;
  } else {
    likeTracker[count] = 1;
    const li = document.createElement("li");
    li.id = `like-${count}`;
    li.textContent = `${count} has been liked 1 time`;
    likesList.appendChild(li);
  }
});

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(intervalID);
    pauseBtn.textContent = "resume";
    toggleButtons(true);
  } else {
    startCounter();
    pauseBtn.textContent = "pause";
    toggleButtons(false);
  }
});

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const comment = commentInput.value;
  const p = document.createElement("p");
  p.textContent = comment;
  commentList.appendChild(p);
  commentInput.value = "";
});

// Start counting when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  updateCounter();
  startCounter();
});