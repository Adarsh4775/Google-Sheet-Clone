let header = document.getElementById("header");
let columns = 27;
let state = {};

for (let i = 0; i < columns; i++) {
    let headCell = document.createElement("div");
    headCell.className = "head-cell";
    if (i !== 0) {
        headCell.innerText = String.fromCharCode(64 + i);
    }
    header.appendChild(headCell);
}

let body = document.getElementById("body");
let SNO = document.getElementById("SNO");
let rows = 100;

for (let i = 1; i <= rows; i++) {
    let bodyCell = document.createElement("div");
    bodyCell.className = "sno-cell";

    if (i !== 0) {
        bodyCell.innerText = i - 1 + 1;
    }
    SNO.appendChild(bodyCell);
}

let cellscontainer = document.getElementById("cells-container");

for (let i = 1; i <= 100; i++) {
    let newRow = document.createElement("div");
    newRow.className = "row";

    for (let j = 1; j <= 26; j++) {
        let newCell = document.createElement("div");
        newCell.className = "column";
        newCell.contentEditable = "true";
        newCell.id = `${String.fromCharCode(64 + j)}${i}`;
        newCell.addEventListener("focus", onFocusCell);
        newCell.addEventListener("input", onchangeCellText);
        newRow.appendChild(newCell);
    }

    cellscontainer.appendChild(newRow);
}

let activeCellId = null;
let activecell = document.getElementById("active-cell");

const defaultStyles = {
    align: "center",
    bgcolor: "#ffffff",
    fontSize: "16px",
    fontfamily: "Monkoi",
    isBold: false,
    isitalic: false,
    isunderline: false,
    textcolor: "#000000"
};

let form = document.querySelector(".form");

form.addEventListener("change", onChangeFormData);

function onChangeFormData() {
    let options = {
        fontfamily: form["fontfamily"].value,
        fontSize: form["fontSize"].value + "px",
        isBold: form["isBold"].checked,
        isitalic: form["isitalic"].checked,
        isunderline: form["isunderline"].checked,
        align: form.align.value,
        textcolor: form["textcolor"].value,
        bgcolor: form["bgcolor"].value
    };
    applyStyles(options);
}

function applyStyles(styles) {
    if (!activeCellId) {
        form.reset();
        alert("Please select a cell to apply styles.");
        return;
    }

    const ActiveCell = document.getElementById(activeCellId);
    ActiveCell.style.color = styles.textcolor;
    ActiveCell.style.backgroundColor = styles.bgcolor;
    ActiveCell.style.fontWeight = styles.isBold ? "600" : "400";
    ActiveCell.style.fontFamily = styles.fontfamily;
    ActiveCell.style.fontSize = styles.fontSize;
    ActiveCell.style.textDecoration = styles.isunderline ? "underline" : "none";
    ActiveCell.style.fontStyle = styles.isitalic ? "italic" : "normal";

    // Set text alignment based on the selected option
    ActiveCell.style.textAlign = styles.align || "left";

    state[activeCellId] = { ...styles, text: ActiveCell.innerText };
}

function onFocusCell(event) {
    activeCellId = event.target.id;
    activecell.innerText = activeCellId;

    if (state[activeCellId]) {
        resetform(state[activeCellId]);
    } else {
        resetform(defaultStyles);
    }
}

function resetform(styles) {
    form.fontSize.value = styles.fontSize;
    form.fontFamily.value = styles.fontfamily;
    form.textcolor.value = styles.textcolor;
    form.bgcolor.value = styles.bgcolor;
    form.isBold.checked = styles.isBold;
    form.isitalic.checked = styles.isitalic;
    form.isunderline.checked = styles.isunderline;
    form.align.value = styles.align;
}

function onchangeCellText(event) {
    let changedText = event.target.innerText;
    if (state[activeCellId]) {
        state[activeCellId].text = changedText;
    } else {
        state[activeCellId] = { ...defaultStyles, text: changedText };
    }
}
