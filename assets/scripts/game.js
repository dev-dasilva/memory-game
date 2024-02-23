const CARDS = [
  {
    id: 1,
    name: "luffy",
    img: "images/luffy.png",
  },
  {
    id: 2,
    name: "zoro",
    img: "images/zoro.png",
  },
  {
    id: 3,
    name: "sanji",
    img: "images/sanji.png",
  },
  {
    id: 4,
    name: "usopp",
    img: "images/usopp.png",
  },
  {
    id: 5,
    name: "nami",
    img: "images/nami.png",
  },
  {
    id: 6,
    name: "robin",
    img: "images/robin.png",
  },
  {
    id: 7,
    name: "chop",
    img: "images/chop.png",
  },
  {
    id: 8,
    name: "franky",
    img: "images/franky.png",
  },
  {
    id: 9,
    name: "brook",
    img: "images/brook.png",
  },
  {
    id: 10,
    name: "jimbe",
    img: "images/jimbe.png",
  },
];

const cardContainer = document.querySelector(".card-container");
const available = document.querySelector("#timer");
const modalTitle = document.querySelector("#modal-title");
const modal = document.querySelector("#modal");
const timer = document.getElementById("timer");
const spanPlayer = document.getElementById("player__name");
let currentCards = [...CARDS, ...CARDS];
let counter = 0;

// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  let counter = array.length,
    temp,
    index;
  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function startTimer() {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  drawCards();
};

function win() {
  modalTitle.innerHTML = "You win! 🙌🥳";
  modal.classList.add("modal--open");
}

/* function lose() {
  modalTitle.innerHTML = "You lose 😢😩";
  modal.classList.add("modal--open");
} */

function checkEndGame() {
  const cardGuessed = document.querySelectorAll(".card--guessed");

  if (cardGuessed.length === CARDS.length * 2) {
    clearInterval(this.loop);
    win();
  }
}

function handleClick(e) {
  const { target } = e;
  if (
    !target.classList.contains("card--guessed") &&
    !target.classList.contains("card--picked")
  ) {
    const picked = cardContainer.querySelector(".card--picked");
    if (picked) {
      if (picked.dataset.id === target.dataset.id) {
        target.classList.remove("card--picked");
        picked.classList.remove("card--picked");
        target.classList.add("card--guessed");
        picked.classList.add("card--guessed");
        checkEndGame();
      } else {
        target.classList.add("card--picked");
        setTimeout(() => {
          target.classList.remove("card--picked");
          picked.classList.remove("card--picked");
        }, 1500);
      }
    } else {
      target.classList.add("card--picked");
    }
  }
}

function drawCards() {
  cardContainer.innerHTML = "";
  available.innerHTML = counter;

  shuffle(currentCards).forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-id", element.id);
    card.innerHTML = `
    <div class="card__front" style="background-image: url('../${element.img}')"></div>
    <div class="card__back"></div>
    `;
    card.addEventListener("click", handleClick);
    cardContainer.appendChild(card);
  });
}

document.querySelector("#play-again").addEventListener("click", () => {
  modal.classList.remove("modal--open");
  startTimer();
  drawCards();
});
