import "./style.css";

const maketStr = `<div class="table">
    <div class="row">
        <div class="cell">A1</div>
        <div class="cell">B1</div>
    </div>
    <div class="row">
        <div class="cell">A2</div>
        <div class="cell">B2</div>
    </div>
</div>
`;

function maket(el: Element) {
  el.innerHTML = maketStr;
}

maket(document.querySelector("body"));
