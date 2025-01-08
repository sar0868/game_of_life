import "./style.css";

function layout(el: Element) {
  const table = document.createElement("div");
  table.classList.add("table");

  const array = Array(3).fill(Array(10).fill(0));
  for (let i = 0; i < array.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < array[0].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "deathCell");
      cell.setAttribute("col", `${i}`);
      cell.setAttribute("row", `${j}`);
      cell.addEventListener("click", aliveButtons);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  el.appendChild(table);
}

function aliveButtons() {
  if (this.classList.contains("deathCell")) {
    this.classList.add("aliveCell");
    this.classList.remove("deathCell");
  } else if (this.classList.contains("aliveCell")) {
    this.classList.add("deathCell");
    this.classList.remove("aliveCall");
  }
}

layout(document.querySelector("body"));
