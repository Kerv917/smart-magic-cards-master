let cards = [];
const lookSuit = [[], [], [], []];
const suits = ["hearts", "spades", "diamonds", "clubs"];
const cardsWrapper = document.querySelector(".cards-wrapper");
const buttonsWrapper = document.querySelector(".btn-wrapper");
const buttons = ["Shuffle", "Show/Hide", "Magic"];

function createCards() {
  for (let i = 0; i < suits.length; i += 1) {
    for (let x = 1; x < 14; x += 1) {
      const cardObject = { key: suits[i], value: x };
      cards.push(cardObject);
    }
  }
  return cards;
}

function renderCards() {
  cards.forEach((card, i) => {
    const positionFromLeft = i * 26;
    const cardElement = document.createElement("div");
    cardElement.setAttribute("data-value", card.value);
    cardElement.classList.add("card", `${card.key}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
    cardsWrapper.classList.add("sliding");
  });
}

function createButtons() {
  const startButton = document.getElementById("start-game");
  buttonsWrapper.removeChild(startButton);
  buttons.forEach((button, i) => {
    const btn = document.createElement("button");
    btn.innerText = buttons[i];
    btn.classList.add("btn", "btn-sm", "btn-secondary");
    btn.style.margin = "20px";
    btn.setAttribute("id", `btn${i}`);
    buttonsWrapper.append(btn);
  });
}

function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
  renderCards();
}

function showHide() {
  cardsWrapper.classList.toggle("hidden");
}

function groupBySuit() {
  cards.forEach(card => {
    if (card.key === "hearts") {
      lookSuit[0].push(card);
    } else if (card.key === "spades") {
      lookSuit[1].push(card);
    } else if (card.key === "diamonds") {
      lookSuit[2].push(card);
    } else {
      lookSuit[3].push(card);
    }
  });
}

function cardMagic() {
  groupBySuit();
  for (let i = 0; i < lookSuit.length; i += 1) {
    lookSuit[i].sort((a, b) => {
      if (a.value > b.value) {
        return 1;
      }
      return -1;
    });
  }
  cards = lookSuit.flat();
  renderCards();
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

function addEventListeners() {
  document.getElementById("btn0").addEventListener("click", shuffleCards);
  document.getElementById("btn1").addEventListener("click", showHide);
  document.getElementById("btn2").addEventListener("click", cardMagic);
}

function startGame() {
  createCards();
  renderCards();
  createButtons();
  addEventListeners();
}

document.getElementById("start-game").addEventListener("click", startGame);
