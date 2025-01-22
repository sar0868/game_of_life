import "./style.css";

//тут создание игры

function layout(el: Element) {
  const table = document.createElement("div");
  table.classList.add("gameField");

  // const array = Array(3).fill(Array(10).fill(0));
  const array = [
    [1, 0],
    [0, 1],
  ];
  for (let i = 0; i < array.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < array[0].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "cell--dead");
      cell.addEventListener("click", aliveButtons);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  el.appendChild(table);
}

function aliveButtons() {
  if (this.classList.contains("cell--dead")) {
    this.classList.add("cell--alive");
    this.classList.remove("cell--dead");
  } else if (this.classList.contains("cell--alive")) {
    this.classList.add("cell--dead");
    this.classList.remove("cell--alive");
  }
}

layout(document.querySelector("body"));
