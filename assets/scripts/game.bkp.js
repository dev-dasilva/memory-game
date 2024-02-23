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
let currentCards = [...CARDS, ...CARDS];
let isPaused = false;
let counter = CARDS.length + 10;
let isLose = false;

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

function win() {
  isPaused = true;
  modalTitle.innerHTML = "You win! 🙌🥳";
  modal.classList.add("modal--open");
}
function lose() {
  isLose = true;
  modalTitle.innerHTML = "You lose 😢😩";
  modal.classList.add("modal--open");
}

function handleClick(e) {
  const { target } = e;
  if (
    !isPaused &&
    !isLose &&
    !target.classList.contains("card--guessed") &&
    !target.classList.contains("card--picked")
  ) {
    isPaused = true;
    const picked = cardContainer.querySelector(".card--picked");
    if (picked) {
      if (picked.dataset.id === target.dataset.id) {
        target.classList.remove("card--picked");
        picked.classList.remove("card--picked");
        target.classList.add("card--guessed");
        picked.classList.add("card--guessed");
        isPaused = false;
      } else {
        target.classList.add("card--picked");
        setTimeout(() => {
          target.classList.remove("card--picked");
          picked.classList.remove("card--picked");
          isPaused = false;
        }, 1500);
      }
      console.log("counter", counter);
      counter -= 1;
      available.innerHTML = counter;
      if (counter === 0) {
        lose();
      }
    } else {
      target.classList.add("card--picked");
      isPaused = false;
    }
    // Validate is already win
    const isWin =
      cardContainer.querySelectorAll(".card--guessed").length ===
      currentCards.length;
    if (isWin) {
      win();
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
  isPaused = false;
  isLose = false;
  counter = CARDS.length + 10;
  drawCards();
});

drawCards();
