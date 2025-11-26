// -------------------
// THEME SWITCHER
// -------------------

const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        const mode = this.dataset.theme; // using THIS

        if (mode === "light") document.body.style.background = "#fafafa";
        if (mode === "dark") document.body.style.background = "#222";
        if (mode === "blue") document.body.style.background = "#dce7ff";
    });
});


// -------------------
// HOVER EFFECTS
// -------------------
const hoverBox = document.getElementById("hoverBox");
const hoverStatus = document.getElementById("hoverStatus");

hoverBox.addEventListener("mouseenter", () => {
    hoverBox.style.background = "#69a0ff";
    hoverBox.style.color = "white";
    hoverStatus.textContent = "Status: Hovering!";
});

hoverBox.addEventListener("mouseleave", () => {
    hoverBox.style.background = "#ddd";
    hoverBox.style.color = "#000";
    hoverStatus.textContent = "Status: Not hovered";
});


// -------------------
// COUNTER CONTROLLER
// -------------------
let count = 0;

const counterVal = document.getElementById("counterVal");

document.getElementById("increment").onclick = () => {
    count++;
    counterVal.textContent = count;
};

document.getElementById("decrement").onclick = () => {
    count--;
    counterVal.textContent = count;
};

document.getElementById("resetCounter").onclick = () => {
    count = 0;
    counterVal.textContent = 0;
};


// -------------------
// SHAPE CREATOR (Uses this)
// -------------------
const shapeBtns = document.querySelectorAll(".shape-btn");
const shapeArea = document.getElementById("shapeArea");

shapeBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        const shape = this.dataset.shape; // USING this

        shapeArea.innerHTML = ""; // clear old shape

        const div = document.createElement("div");
        div.style.width = "80px";
        div.style.height = "80px";

        if (shape === "circle") {
            div.style.borderRadius = "50%";
            div.style.background = "#ff476f";
        }
        if (shape === "square") {
            div.style.borderRadius = "6px";
            div.style.background = "#3579ff";
        }
        if (shape === "triangle") {
            div.style.width = "0px";
            div.style.height = "0px";
            div.style.borderLeft = "40px solid transparent";
            div.style.borderRight = "40px solid transparent";
            div.style.borderBottom = "80px solid #ffaa2b";
        }

        shapeArea.appendChild(div);
    });
});


// -------------------
// TEXT TRANSFORMER
// -------------------
const inputField = document.getElementById("textInput");
const output = document.getElementById("textResult");

document.getElementById("uppercaseBtn").onclick = () => {
    output.textContent = inputField.value.toUpperCase();
};

document.getElementById("lowercaseBtn").onclick = () => {
    output.textContent = inputField.value.toLowerCase();
};

document.getElementById("reverseBtn").onclick = () => {
    output.textContent = inputField.value.split("").reverse().join("");
};
