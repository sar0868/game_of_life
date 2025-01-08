import "./style.css";

function layout(el: Element) {
  const table = document.createElement("div");
  table.classList.add("table");

  const array = Array(3).fill(Array(10).fill(0));
  for (let i = 0; i < array.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < array[0].length; j++) {
      row.innerHTML += `<div class="cell deathCell" col="${i}" row="${j}"></div>`;
    }
    table.appendChild(row);
  }
  el.appendChild(table);
}

layout(document.querySelector("body"));
